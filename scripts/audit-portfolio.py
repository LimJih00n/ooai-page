#!/usr/bin/env python3
"""Audit HTML pages against portfolio.json + services.json (SSoT).

Usage:
    python3 scripts/audit-portfolio.py           # report mismatches, exit 1 on fail
    python3 scripts/audit-portfolio.py --strict  # same but fail on warnings too

Run from repo root. Designed to be wired into pre-commit hooks.
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Iterable

ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / "data"
HTML_DIR = ROOT / "public" / "ocean5i"

PORTFOLIO_FILE = DATA_DIR / "portfolio.json"
SERVICES_FILE = DATA_DIR / "services.json"

HTML_FILES = [
    HTML_DIR / "index_v2.html",
    HTML_DIR / "services_v2.html",
    HTML_DIR / "about_v2.html",
]

GREEN = "\033[92m"
YELLOW = "\033[93m"
RED = "\033[91m"
RESET = "\033[0m"


def load_json(path: Path) -> dict:
    with path.open(encoding="utf-8") as f:
        return json.load(f)


def iter_html_text() -> Iterable[tuple[Path, str]]:
    for p in HTML_FILES:
        if p.exists():
            yield p, p.read_text(encoding="utf-8")


def check_patent_counts(portfolio: dict, errors: list[str]) -> None:
    p = portfolio["patents"]["summary"]
    registered, applied, total = p["registered"], p["applied"], p["total"]
    if registered + applied != total:
        errors.append(
            f"patents.summary inconsistent: {registered}+{applied} != {total}"
        )

    items = portfolio["patents"]["items"]
    actual_reg = sum(1 for x in items if x["status"] == "registered")
    actual_app = sum(1 for x in items if x["status"] == "applied")
    if actual_reg != registered:
        errors.append(
            f"patents.items registered={actual_reg} != summary.registered={registered}"
        )
    if actual_app != applied:
        errors.append(
            f"patents.items applied={actual_app} != summary.applied={applied}"
        )


def check_copyright_counts(portfolio: dict, errors: list[str]) -> None:
    c = portfolio["copyrights"]["summary"]
    items = portfolio["copyrights"]["items"]
    actual_reg = sum(1 for x in items if x["status"] == "registered")
    if actual_reg != c["registered"]:
        errors.append(
            f"copyrights.items registered={actual_reg} != summary.registered={c['registered']}"
        )


def check_services_count(services: dict, errors: list[str], warnings: list[str]) -> None:
    all_ids = {s["id"] for s in services["services"]}
    cat_ids = []
    for cat in services["categories"]:
        cat_ids.extend(cat["serviceIds"])
    if sorted(cat_ids) != sorted(all_ids):
        missing_from_cats = all_ids - set(cat_ids)
        extra_in_cats = set(cat_ids) - all_ids
        if missing_from_cats:
            errors.append(f"services not in any category: {sorted(missing_from_cats)}")
        if extra_in_cats:
            errors.append(f"category references unknown service: {sorted(extra_in_cats)}")

    # Each service's categoryId must match its category's serviceIds
    id_to_cat = {s["id"]: s["categoryId"] for s in services["services"]}
    for cat in services["categories"]:
        for sid in cat["serviceIds"]:
            if id_to_cat.get(sid) != cat["id"]:
                errors.append(
                    f"service[{sid}].categoryId={id_to_cat.get(sid)} but listed under category[{cat['id']}]"
                )


def check_html_numbers(portfolio: dict, services: dict, errors: list[str], warnings: list[str]) -> None:
    sw_registered = portfolio["copyrights"]["summary"]["registered"]
    pat_registered = portfolio["patents"]["summary"]["registered"]
    pat_applied = portfolio["patents"]["summary"]["applied"]
    pat_total = portfolio["patents"]["summary"]["total"]
    svc_total = len(services["services"])

    # Patterns that must match SSoT
    for path, text in iter_html_text():
        # Reject stale patent counts (e.g., "특허 3건")
        for m in re.finditer(r"특허\s*(\d+)\s*건", text):
            n = int(m.group(1))
            if n != pat_total:
                errors.append(
                    f"{path.name}: '특허 {n}건' conflicts with portfolio.patents.total={pat_total}"
                )

        # Reject stale SW copyright counts
        for m in re.finditer(r"SW\s*저작권\s*(?:등록\s*)?(\d+)\s*건", text):
            n = int(m.group(1))
            if n != sw_registered:
                errors.append(
                    f"{path.name}: 'SW 저작권 {n}건' conflicts with portfolio.copyrights.registered={sw_registered}"
                )

        # Patent breakdown: "등록 N + 출원 M"
        for m in re.finditer(r"등록\s*(\d+)\s*\+\s*출원\s*(\d+)", text):
            reg, app = int(m.group(1)), int(m.group(2))
            if (reg, app) != (pat_registered, pat_applied):
                errors.append(
                    f"{path.name}: '등록 {reg} + 출원 {app}' conflicts with SSoT "
                    f"(등록 {pat_registered} + 출원 {pat_applied})"
                )

        # Service count: look for "전문 서비스" card (previous line has the number)
        for m in re.finditer(
            r'font-black[^"]*"[^>]*>(\d+)</div>\s*<div[^>]*>전문\s*서비스',
            text,
        ):
            n = int(m.group(1))
            if n != svc_total:
                warnings.append(
                    f"{path.name}: '전문 서비스 {n}' != services.json count {svc_total}"
                )


def check_copyright_detail_section(portfolio: dict, errors: list[str]) -> None:
    """about_v2.html has a detailed '소프트웨어 저작권 등록' section with one card per item.
    The badge count and card count must both match portfolio.copyrights.summary.registered."""
    about = HTML_DIR / "about_v2.html"
    if not about.exists():
        return
    text = about.read_text(encoding="utf-8")
    expected = portfolio["copyrights"]["summary"]["registered"]

    # Badge like: "<span ...>7건 등록 완료</span>"
    for m in re.finditer(r">(\d+)건\s*등록\s*완료<", text):
        n = int(m.group(1))
        if n != expected:
            errors.append(
                f"about_v2.html: '{n}건 등록 완료' badge conflicts with SSoT ({expected}건)"
            )

    # Card count — only inside the SW Copyright section.
    section_match = re.search(
        r"소프트웨어\s*저작권\s*등록.*?</section>",
        text,
        flags=re.DOTALL,
    )
    if section_match:
        section_html = section_match.group(0)
        card_count = len(
            re.findall(
                r'border-indigo-500/20">\s*<div class="flex items-start justify-between mb-3">',
                section_html,
            )
        )
        if card_count != expected:
            errors.append(
                f"about_v2.html: SW Copyright section has {card_count} card(s), "
                f"expected {expected} per SSoT"
            )


def check_html_service_anchors(services: dict, warnings: list[str]) -> None:
    services_html = HTML_DIR / "services_v2.html"
    if not services_html.exists():
        return
    text = services_html.read_text(encoding="utf-8")

    # Each service must have a <section id="..." data-category="...">
    for svc in services["services"]:
        pat = rf'<section\s+id="{re.escape(svc["id"])}"\s+data-category="{re.escape(svc["categoryId"])}"'
        if not re.search(pat, text):
            warnings.append(
                f'services_v2.html: missing <section id="{svc["id"]}" data-category="{svc["categoryId"]}">'
            )


def main(argv: list[str]) -> int:
    strict = "--strict" in argv

    portfolio = load_json(PORTFOLIO_FILE)
    services = load_json(SERVICES_FILE)

    errors: list[str] = []
    warnings: list[str] = []

    check_patent_counts(portfolio, errors)
    check_copyright_counts(portfolio, errors)
    check_services_count(services, errors, warnings)
    check_html_numbers(portfolio, services, errors, warnings)
    check_copyright_detail_section(portfolio, errors)
    check_html_service_anchors(services, warnings)

    if errors:
        print(f"{RED}✗ {len(errors)} error(s):{RESET}")
        for e in errors:
            print(f"  {RED}•{RESET} {e}")
    if warnings:
        print(f"{YELLOW}⚠ {len(warnings)} warning(s):{RESET}")
        for w in warnings:
            print(f"  {YELLOW}•{RESET} {w}")

    if not errors and not warnings:
        print(f"{GREEN}✓ SSoT audit passed — HTML and JSON are consistent.{RESET}")

    if errors:
        return 1
    if strict and warnings:
        return 2
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))

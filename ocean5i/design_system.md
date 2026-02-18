# O5I Design System

> **버전:** 1.0
> **기준 파일:** `ocean5i/index.html`
> **작성일:** 2026-02-17
> **적용 범위:** O5I 웹사이트의 모든 하위 페이지 및 컴포넌트

앞으로 제작되는 모든 페이지는 이 문서의 규격을 준수한다.

---

## 1. 컬러 팔레트

### 1-1. 배경 (Background)

| 토큰 | Tailwind 클래스 | HEX | 용도 |
|------|----------------|-----|------|
| `bg-page` | `from-slate-900 via-sky-950 to-slate-900` | — | 페이지 전체 배경 (대각 그라디언트) |
| `bg-surface-0` | `bg-slate-900` | `#0f172a` | 기본 표면 (Navbar, Footer) |
| `bg-surface-1` | `bg-slate-900/80` | `#0f172a cc` | 반투명 표면 (카드, 오버레이) |
| `bg-surface-2` | `bg-slate-900/60` | `#0f172a 99` | 더 투명한 표면 (Status strip) |
| `bg-surface-3` | `bg-slate-800` | `#1e293b` | 인라인 요소 배경 (FAB 라벨, 소셜 버튼) |
| `bg-surface-4` | `bg-slate-800/50` | `#1e293b 80` | 구분선 배경 |

### 1-2. 브랜드 Primary — Sky (Ocean Blue)

| 토큰 | Tailwind | HEX | 용도 |
|------|----------|-----|------|
| `primary-light` | `sky-400` | `#38bdf8` | 강조 텍스트, 링크 호버, 그라디언트 시작 |
| `primary` | `sky-500` | `#0ea5e9` | 주요 버튼, 아이콘, 닷 |
| `primary-dark` | `sky-600` | `#0284c7` | 버튼 그라디언트 끝, 활성 상태 |

```css
/* 사용 예 */
.btn-primary { background: #0ea5e9; }
.btn-primary:hover { background: #38bdf8; }
```

### 1-3. 브랜드 Secondary — Indigo (AI/Tech)

| 토큰 | Tailwind | HEX | 용도 |
|------|----------|-----|------|
| `secondary-light` | `indigo-400` | `#818cf8` | 그라디언트 텍스트 끝, 강조 |
| `secondary` | `indigo-500` | `#6366f1` | FAB 서브 버튼, 특수 링크 닷 |
| `secondary-dark` | `indigo-600` | `#4f46e5` | FAB 메인 그라디언트 끝 |

### 1-4. Tertiary — Teal (Action/CTA)

| 토큰 | Tailwind | HEX | 용도 |
|------|----------|-----|------|
| `tertiary` | `teal-500` | `#14b8a6` | 세 번째 액션 (상담 예약) |
| `tertiary-dark` | `teal-600` | `#0d9488` | teal 그라디언트 끝 |

### 1-5. 시맨틱 — Status

| 상태 | Tailwind | HEX | 용도 |
|------|----------|-----|------|
| 정상 (Active) | `green-400` | `#4ade80` | 상태 닷, 활성 배지 텍스트 |
| 정상 배지 bg | `green-500/20` | — | 상태 배지 배경 |
| 정상 배지 border | `green-500/30` | — | 상태 배지 테두리 |
| 경고 | `yellow-400` | `#facc15` | (예약) |
| 오류 | `red-400` | `#f87171` | (예약) |

### 1-6. 텍스트 계층

| 토큰 | Tailwind | HEX | 용도 |
|------|----------|-----|------|
| `text-primary` | `text-white` | `#ffffff` | H1, 강조 텍스트, 버튼 레이블 |
| `text-secondary` | `text-slate-300` | `#cbd5e1` | 네비게이션 링크, 부제목 |
| `text-body` | `text-slate-400` | `#94a3b8` | 본문, 설명 텍스트, 푸터 링크 |
| `text-muted` | `text-slate-500` | `#64748b` | 보조 설명, Footer 태그라인 |
| `text-dim` | `text-slate-600` | `#475569` | 매우 흐린 텍스트 (저작권, 마퀴) |

### 1-7. 테두리

| 토큰 | Tailwind | 용도 |
|------|----------|------|
| `border-default` | `border-slate-800` | 섹션 구분선, 카드 테두리 |
| `border-subtle` | `border-slate-700` | 인라인 요소 테두리 |
| `border-accent` | `border-sky-500` | 호버 강조 테두리 |

### 1-8. 브랜드 그라디언트 (필수 규격)

```css
/* 페이지 배경 */
background: linear-gradient(to bottom right, #0f172a, #082f49, #0f172a);

/* 브랜드 텍스트 그라디언트 (.grad-text) */
background: linear-gradient(90deg, #38bdf8, #818cf8);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;

/* 주요 버튼 그라디언트 */
background: linear-gradient(to bottom right, #0ea5e9, #6366f1);   /* sky→indigo */

/* 푸터 상단 구분선 */
background: linear-gradient(to right, transparent, #0ea5e9, transparent);
opacity: 0.5;
```

---

## 2. 타이포그래피

### 2-1. 폰트 패밀리

```css
/* 기본 스택 (Tailwind font-sans) */
font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
             "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;

/* 전역 설정 */
body { font-family: var(--font-sans); -webkit-font-smoothing: antialiased; }
```

> 향후 웹폰트 추가 시 `Pretendard` (한글) + `Inter` (영문) 조합 권장

### 2-2. 타입 스케일

| 역할 | 클래스 | 크기 (mobile → desktop) | Weight | 용도 |
|------|--------|--------------------------|--------|------|
| `display` | `text-5xl md:text-7xl font-black` | 48px → 72px | 900 | Hero H1 |
| `h1` | `text-4xl font-black` | 36px | 900 | 페이지 타이틀 |
| `h2` | `text-2xl font-bold` | 24px | 700 | 섹션 헤딩 |
| `h3` | `text-lg font-semibold` | 18px | 600 | 카드 제목, 서브섹션 |
| `label` | `text-sm font-semibold tracking-wider uppercase` | 14px | 600 | 섹션 라벨 |
| `tagline` | `text-xs font-bold tracking-widest uppercase` | 12px | 700 | Hero 배지, 섹션 태그 |
| `body-lg` | `text-lg leading-relaxed` | 18px | 400 | Hero 설명문 |
| `body` | `text-sm leading-relaxed` | 14px | 400 | 일반 본문 |
| `caption` | `text-xs` | 12px | 400 | 배지, 라벨, 저작권 |

### 2-3. 줄간격 (Line Height)

| 클래스 | 용도 |
|--------|------|
| `leading-tight` | H1, 대형 헤딩 |
| `leading-relaxed` | 본문 단락 |
| `leading-none` | 버튼, 배지 |

### 2-4. 자간 (Letter Spacing)

| 클래스 | 용도 |
|--------|------|
| `tracking-widest` | Hero 태그라인 (`text-xs uppercase`) |
| `tracking-wider` | 섹션 라벨, Footer 헤딩 |
| `tracking-wide` | 로고 워드마크 |

---

## 3. 레이아웃 & 그리드

### 3-1. 컨테이너

```html
<!-- 표준 콘텐츠 컨테이너 (전 페이지 공통) -->
<div class="max-w-7xl mx-auto px-5">
```

| 속성 | 값 | 비고 |
|------|----|------|
| 최대 너비 | `max-w-7xl` (1280px) | 모든 섹션 공통 |
| 수평 패딩 | `px-5` (20px) | 모바일·데스크탑 동일 |

### 3-2. 반응형 브레이크포인트 (Tailwind 기본)

| 접두사 | 너비 | 용도 |
|--------|------|------|
| (없음) | 0px~ | 모바일 우선 |
| `sm:` | 640px~ | 소형 태블릿 |
| `md:` | 768px~ | 태블릿 / 네비게이션 전환 |
| `lg:` | 1024px~ | 데스크탑 |
| `xl:` | 1280px~ | 넓은 화면 |

### 3-3. 주요 레이아웃 패턴

```html
<!-- 2-컬럼 카드 그리드 -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">

<!-- 3-컬럼 섹션 (Footer 등) -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-10">

<!-- 중앙 정렬 섹션 (Hero) -->
<section class="flex flex-col items-center justify-center min-h-screen text-center px-6">
```

### 3-4. 섹션 수직 여백

| 섹션 유형 | 클래스 |
|-----------|--------|
| Hero | `min-h-screen pt-20` |
| 일반 섹션 | `py-20` |
| 구분 섹션 (Status strip) | `py-3` |
| Footer 메인 | `py-14` |
| Footer 하단 바 | `py-4` |

---

## 4. 컴포넌트 규격

### 4-1. 버튼

#### Primary Button (Solid)
```html
<a class="px-8 py-3 bg-sky-500 hover:bg-sky-400 text-white font-semibold rounded-full transition shadow-lg shadow-sky-500/30">
    버튼 텍스트
</a>
```
- 패딩: `px-8 py-3`
- 모양: `rounded-full`
- 그림자: `shadow-lg shadow-sky-500/30`

#### Secondary Button (Ghost)
```html
<a class="px-8 py-3 border border-slate-600 hover:border-sky-400 text-slate-300 hover:text-sky-400 font-semibold rounded-full transition">
    버튼 텍스트
</a>
```

#### CTA Button (Navbar/Small)
```html
<a class="px-5 py-2 bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold rounded-full transition">
    문의하기
</a>
```

### 4-2. 배지 (Badge)

#### 상태 배지 (Status)
```html
<span class="px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full font-semibold border border-green-500/30 text-xs">
    정상
</span>
```

#### 태그라인 배지 (Section tag)
```html
<p class="text-sky-400 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
    <span class="w-2 h-2 bg-sky-400 rounded-full pulse-dot"></span>
    Section Label
</p>
```

### 4-3. 카드 (Surface Card)
```html
<div class="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-sky-500/50 transition">
    <!-- 카드 내용 -->
</div>
```

### 4-4. 아이콘

- 라이브러리: **Heroicons** (SVG 인라인)
- 크기: `w-4 h-4` (small) · `w-5 h-5` (default) · `w-6 h-6` (large)
- stroke-width: `2` (일반) · `2.5` (강조)
- 색상: 부모 `text-` 클래스 상속 (`stroke="currentColor"`)

### 4-5. 소셜/액션 아이콘 버튼
```html
<a class="w-8 h-8 rounded-full bg-slate-800 hover:bg-sky-500/20 border border-slate-700 hover:border-sky-500 flex items-center justify-center text-slate-400 hover:text-sky-400 transition">
    <!-- SVG 아이콘 -->
</a>
```

---

## 5. 애니메이션 & 트랜지션

### 5-1. 전환 기본값

| 패턴 | CSS | 용도 |
|------|-----|------|
| 기본 hover | `transition` (150ms) | 색상, 테두리 변화 |
| 언더라인 슬라이드 | `transition-all duration-300` | 네비게이션 링크 |
| 페이드업 | `opacity 0.6s ease, transform 0.6s ease` | 섹션 등장 |
| Navbar 숨김 | `transition: top 0.3s ease` | 스크롤 연동 |
| 모바일 메뉴 | `transition: max-height 0.3s ease` | 슬라이드 다운 |

### 5-2. 등장 애니메이션 (Scroll-triggered)

```css
/* 초기 상태 */
.fade-up {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}
/* 뷰포트 진입 시 */
.fade-up.visible {
    opacity: 1;
    transform: translateY(0);
}
```

```js
// IntersectionObserver 패턴 (모든 페이지 공통 사용)
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting));
}, { threshold: 0.15 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
```

### 5-3. Pulse Dot (상태 표시)

```css
@keyframes pulse-dot {
    0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.6); }
    50%       { box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
}
.pulse-dot { animation: pulse-dot 2s infinite; }
```

### 5-4. 스케일 인터랙션

| 동작 | 클래스 | 용도 |
|------|--------|------|
| 호버 확대 (강) | `hover:scale-110` | FAB 서브 버튼 |
| 호버 확대 (약) | `hover:scale-105` | FAB 메인 버튼 |
| 클릭 축소 | `active:scale-95` | FAB 메인 버튼 |
| 바운스 | `animate-bounce` | 스크롤 힌트 |

---

## 6. 글로벌 CSS 클래스 (필수 포함)

하위 페이지의 `<style>` 태그에 반드시 포함할 공통 CSS:

```css
/* ── Gradient text ─────────── */
.grad-text {
    background: linear-gradient(90deg, #38bdf8, #818cf8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

/* ── Fade-up (scroll entrance) ─ */
.fade-up {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-up.visible { opacity: 1; transform: translateY(0); }

/* ── Pulse dot (status) ──────── */
@keyframes pulse-dot {
    0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.6); }
    50%       { box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
}
.pulse-dot { animation: pulse-dot 2s infinite; }
```

---

## 7. 페이지 구조 템플릿

모든 하위 페이지의 기본 HTML 뼈대:

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[페이지명] — O5I</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* 공통 CSS (섹션 6 전체 복사) */
    </style>
</head>
<body class="bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 min-h-screen font-sans antialiased">

    <!-- 1. NAVBAR (index.html에서 그대로 복사) -->

    <!-- 2. PAGE CONTENT -->
    <main class="pt-20">
        <!-- 섹션들 -->
    </main>

    <!-- 3. STATUS MONITOR + FOOTER (index.html에서 그대로 복사) -->

    <!-- 4. FAB (index.html에서 그대로 복사) -->

    <!-- 5. SCRIPTS -->
    <script>
        /* 공통 JS: Navbar scroll, toggleMenu, toggleFAB, IntersectionObserver */
    </script>
</body>
</html>
```

---

## 8. z-index 스택

| 레이어 | z-index | 요소 |
|--------|---------|------|
| 최상위 | `z-50` | Navbar, FAB |
| 오버레이 | `z-40` | 모달 (예약) |
| 드롭다운 | `z-30` | 메뉴, 툴팁 |
| 콘텐츠 | 기본 | 섹션, 카드 |

---

## 9. 금지 규칙 (Do NOT)

1. **흰색 배경 사용 금지** — 모든 배경은 dark 팔레트 내에서 선택
2. **밝은 색상 텍스트 단독 사용 금지** — 최소 `slate-300` 이상 사용
3. **border-radius 임의 변경 금지** — 버튼은 `rounded-full`, 카드는 `rounded-xl`
4. **그라디언트 방향 임의 변경 금지** — `.grad-text`는 항상 90deg (좌→우)
5. **Tailwind CDN 버전 고정 금지** — 항상 `https://cdn.tailwindcss.com` (최신 버전)
6. **`<marquee>` 태그 사용 금지** — CSS `@keyframes marquee` 사용
7. **인라인 스타일(`style=""`) 과다 사용 금지** — Tailwind 클래스 우선

---

## 10. 변경 이력

| 버전 | 날짜 | 내용 |
|------|------|------|
| 1.0 | 2026-02-17 | 최초 작성 — index.html 분석 기반 |

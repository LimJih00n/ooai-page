import type { Scene } from '../shared/types'

export const scenes: Scene[] = [
  {
    id: 'rnd-1',
    windowType: 'terminal',
    windowProps: {
      title: 'rnd-notice — 공고 수집',
      lines: [
        { text: 'R&D 과제공고 수집 시작 (월/목 08:00 자동 실행)', type: 'comment' },
        { text: '', type: 'output' },
        { text: '$ python collect_notices.py --sources ntis,iris,nipa,kaia', type: 'command' },
        { text: '', type: 'output' },
        { text: '[NTIS] 국가과학기술정보서비스... 18건 수집', type: 'success' },
        { text: '[IRIS] 산업기술R&D정보포털... 8건 수집', type: 'success' },
        { text: '[NIPA] 정보통신산업진흥원... 4건 수집', type: 'success' },
        { text: '[KAIA] 국토교통과학기술진흥원... 2건 수집', type: 'success' },
        { text: '', type: 'output' },
        { text: '총 32건 수집 완료. AI 분석 시작...', type: 'success' },
      ],
    },
    bubble: {
      speaker: 'system',
      text: '4개 정부 R&D 포털에서 최신 과제공고 32건을 자동으로 수집합니다.',
    },
    duration: 4500,
  },
  {
    id: 'rnd-2',
    windowType: 'code',
    windowProps: {
      fileName: 'o5i_profile_matching.py',
      language: 'python',
      code: `from shared.o5i_profile import calculate_opportunity_score

# O5I 역량 프로필 기반 적합도 분석
for notice in collected_notices:
    score = calculate_opportunity_score(
        title=notice["title"],
        org=notice["org"],
        keywords=["해양", "AI", "데이터", "자동화"]
    )
    notice["fit_score"] = score["score"]
    notice["fit_label"] = score["label"]

# 결과: 32건 중 적합 12건, 관심 8건, 참고 12건
# ★★★ (적합): 해양쓰레기 모니터링 AI (87점)
# ★★★ (적합): 수산자원 디지털전환 (82점)
# ★★☆ (관심): 기후변화 대응 연구 (65점)`,
      highlightLines: [5, 6, 7, 8, 13, 14],
    },
    bubble: {
      speaker: 'ai',
      text: 'O5I 역량 프로필과 매칭하여 32건의 적합도를 자동 분석합니다.',
    },
    duration: 5000,
  },
  {
    id: 'rnd-3',
    windowType: 'browser',
    windowProps: {
      url: 'https://tools.ocean5i.com/rnd-notices',
      title: 'R&D 과제공고 대시보드',
      content: `## R&D 과제공고 브리핑 — 2026년 2월 16일

### 📊 분석 요약
- **수집**: 32건 (NTIS 18, IRIS 8, NIPA 4, KAIA 2)
- **적합(★★★)**: 12건 | **관심(★★☆)**: 8건 | **참고(★☆☆)**: 12건

### 🏆 TOP 5 추천 공고

| 순위 | 공고명 | 기관 | 적합도 | 마감 |
|:---:|--------|------|:------:|------|
| 1 | 해양쓰레기 AI 모니터링 시스템 | 해수부 | ★★★ 87 | 3/15 |
| 2 | 수산자원 디지털전환 플랫폼 | 해수부 | ★★★ 82 | 3/20 |
| 3 | 연안 환경 자동 관측 체계 | KIOST | ★★★ 79 | 3/10 |
| 4 | 기후변화 해양생태계 영향 | 환경부 | ★★★ 76 | 4/01 |
| 5 | AI 기반 항만 안전관리 | 해수부 | ★★★ 74 | 3/25 |

### 📁 분야별 분포
해양/수산: 14건 | 환경: 8건 | AI/디지털: 6건 | 기타: 4건`,
    },
    bubble: {
      speaker: 'ai',
      text: '대시보드에서 분야별 필터, 적합도 순 정렬로 한눈에 확인할 수 있습니다.',
    },
    duration: 5000,
  },
  {
    id: 'rnd-4',
    windowType: 'document',
    windowProps: {
      title: 'R&D 과제공고 브리핑 보고서',
      content: `# R&D 과제공고 브리핑 (2026.02.16)

## 1. 금주 핵심 공고
해양수산부에서 "해양쓰레기 AI 모니터링 시스템" 과제를 공고했습니다.
O5I의 해양 데이터 분석 및 AI 자동화 역량과 높은 적합도(87점)를 보입니다.

## 2. 추천 공고 상세
**[1위] 해양쓰레기 AI 모니터링 시스템**
- 총 예산: 30억원 (3년)
- 매칭 역량: 해양 데이터 파이프라인, AI 에이전트, 시각화
- 참여 전략: 데이터 수집·분석 자동화 모듈 담당

**[2위] 수산자원 디지털전환 플랫폼**
- 총 예산: 20억원 (2년)
- 매칭 역량: LangGraph 워크플로우, 보고서 자동화

## 3. 마감 임박 (7일 이내)
- 연안 환경 자동 관측 체계 (3/10 마감) — 적합도 79점

---
> O5I R&D 과제공고 자동 브리핑 시스템`,
    },
    bubble: {
      speaker: 'ai',
      text: 'AI가 핵심 공고 요약, 매칭 역량, 참여 전략까지 포함한 브리핑 보고서를 생성합니다.',
    },
    duration: 5000,
  },
  {
    id: 'rnd-5',
    windowType: 'terminal',
    windowProps: {
      title: 'email-sender — 자동 발송',
      lines: [
        { text: '브리핑 보고서 이메일 발송', type: 'comment' },
        { text: '', type: 'output' },
        { text: '$ python send_briefing.py --template rnd --recipients team', type: 'command' },
        { text: '', type: 'output' },
        { text: 'HTML 보고서 생성... OK', type: 'output' },
        { text: '수신자 목록 로드... 3명', type: 'output' },
        { text: '', type: 'output' },
        { text: '[발송] ocean5i@ocean5i.com → team@client.kr', type: 'success' },
        { text: '[발송] ocean5i@ocean5i.com → ceo@client.kr', type: 'success' },
        { text: '[발송] ocean5i@ocean5i.com → rnd@client.kr', type: 'success' },
        { text: '', type: 'output' },
        { text: '발송 완료! 다음 브리핑: 목요일 08:00', type: 'success' },
      ],
    },
    bubble: {
      speaker: 'system',
      text: '브리핑 보고서가 구독자에게 자동 발송됩니다. 월/목 정기 발송.',
    },
    duration: 4000,
  },
]

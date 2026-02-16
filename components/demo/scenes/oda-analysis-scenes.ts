import type { Scene } from '../shared/types'

export const scenes: Scene[] = [
  {
    id: 'oda-1',
    windowType: 'terminal',
    windowProps: {
      title: 'oda-tracker — 동향 수집',
      lines: [
        { text: 'ODA/국제동향 수집 시작 (주간 자동 실행)', type: 'comment' },
        { text: '', type: 'output' },
        { text: '$ python collect_oda.py --sources koica,edcf,undp,wb', type: 'command' },
        { text: '', type: 'output' },
        { text: '[KOICA] 한국국제협력단... 6건 수집', type: 'success' },
        { text: '[EDCF] 대외경제협력기금... 3건 수집', type: 'success' },
        { text: '[UNDP] 유엔개발계획... 4건 수집', type: 'success' },
        { text: '[World Bank] 세계은행... 5건 수집', type: 'success' },
        { text: '', type: 'output' },
        { text: '총 18건 수집. 해양/환경 분야 필터링...', type: 'output' },
        { text: '관련 사업 8건 식별 완료', type: 'success' },
      ],
    },
    bubble: {
      speaker: 'system',
      text: '국제기구 4곳에서 ODA 사업 동향을 자동 수집하고 해양/환경 분야를 필터링합니다.',
    },
    duration: 4500,
  },
  {
    id: 'oda-2',
    windowType: 'code',
    windowProps: {
      fileName: 'oda_analyzer.py',
      language: 'python',
      code: `# AI 기반 ODA 사업 분석
from anthropic import Anthropic

def analyze_oda_opportunity(project):
    """ODA 사업의 참여 가능성과 전략을 분석"""
    prompt = f"""
    사업명: {project['title']}
    기관: {project['org']}
    규모: {project['budget']}
    대상국: {project['country']}

    O5I 역량(해양AI, 데이터분석)과의 적합성,
    참여 전략, 예상 기여 분야를 분석하세요.
    """
    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        messages=[{"role": "user", "content": prompt}]
    )
    return parse_analysis(response)

# 결과: 인도네시아 해양환경 모니터링 — 적합도 91%`,
      highlightLines: [3, 18, 19],
    },
    bubble: {
      speaker: 'ai',
      text: 'Claude AI가 각 ODA 사업의 참여 가능성과 O5I 역량 매칭을 분석합니다.',
    },
    duration: 4500,
  },
  {
    id: 'oda-3',
    windowType: 'browser',
    windowProps: {
      url: 'https://tools.ocean5i.com/oda-dashboard',
      title: 'ODA 사업 동향 대시보드',
      content: `## ODA/국제 동향 주간 리포트 — 2026년 2월 3주차

### 🌏 이번 주 주요 사업

| 사업명 | 기관 | 대상국 | 규모 | 적합도 |
|--------|------|--------|------|:------:|
| 해양환경 모니터링 시스템 | KOICA | 인도네시아 | $2.5M | ★★★ |
| 연안 재해 조기경보 | EDCF | 필리핀 | $1.8M | ★★★ |
| 수산양식 데이터 플랫폼 | World Bank | 베트남 | $3.2M | ★★☆ |
| 해양쓰레기 관리 시스템 | UNDP | 태국 | $1.2M | ★★☆ |

### 📈 월간 트렌드
- 해양/환경 ODA 사업 전월 대비 **15% 증가**
- 동남아 지역 집중 (전체의 62%)
- AI/디지털 전환 키워드 포함 사업 **급증** (+40%)`,
    },
    bubble: {
      speaker: 'ai',
      text: '지역별, 분야별 ODA 사업 트렌드를 시각화하고 참여 적합도를 분석합니다.',
    },
    duration: 5000,
  },
  {
    id: 'oda-4',
    windowType: 'document',
    windowProps: {
      title: 'ODA 사업 동향 브리핑',
      content: `# ODA/국제 동향 주간 브리핑 (2026.02.16)

## 핵심 요약
이번 주 해양/환경 분야 ODA 사업 8건이 신규 식별되었습니다.
KOICA 인도네시아 해양환경 모니터링 사업이 O5I 역량과 가장 높은 적합도를 보입니다.

## 추천 사업: 인도네시아 해양환경 모니터링
- **규모**: $2.5M (3년)
- **적합도**: 91% — 해양 데이터 수집/분석 AI 시스템 구축
- **참여 전략**: 데이터 파이프라인 + AI 분석 모듈 컨소시엄 참여
- **경쟁사**: 국내 2~3개사 예상

## 시장 동향
- 동남아 해양 AI 수요 지속 증가
- KOICA, 디지털 전환 사업 비중 확대
- 한-아세안 해양 협력 MOU 후속 사업 활발

---
> O5I ODA 사업동향 자동 분석 시스템`,
    },
    bubble: {
      speaker: 'ai',
      text: '참여 전략과 시장 동향까지 포함한 ODA 브리핑 보고서를 자동 생성합니다.',
    },
    duration: 4500,
  },
  {
    id: 'oda-5',
    windowType: 'terminal',
    windowProps: {
      title: 'notification — 발송 완료',
      lines: [
        { text: '주간 ODA 브리핑 발송', type: 'comment' },
        { text: '', type: 'output' },
        { text: '$ python send_briefing.py --template oda --format html', type: 'command' },
        { text: '', type: 'output' },
        { text: 'HTML 보고서 렌더링... OK (8개 사업, 4개 차트)', type: 'output' },
        { text: '[발송] 구독자 3명에게 이메일 발송 완료', type: 'success' },
        { text: '[Slack] #oda-updates 채널 알림 전송 완료', type: 'success' },
        { text: '', type: 'output' },
        { text: '다음 발송: 2026-02-23 (월) 08:00', type: 'success' },
      ],
    },
    bubble: {
      speaker: 'system',
      text: '주간 ODA 브리핑이 이메일과 Slack으로 자동 발송됩니다.',
    },
    duration: 4000,
  },
]

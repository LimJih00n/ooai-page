import type { Scene } from '../shared/types'

export const scenes: Scene[] = [
  {
    id: 'market-1',
    windowType: 'terminal',
    windowProps: {
      title: 'marketreport — 데이터 수집',
      lines: [
        { text: '금융경제 시황 데이터 수집 (화~토 07:00 자동 실행)', type: 'comment' },
        { text: '', type: 'output' },
        { text: '$ python collect_market_data.py --date 2026-02-16', type: 'command' },
        { text: '', type: 'output' },
        { text: '[CoinGecko] BTC $97,832 (+2.3%), ETH $2,741 (+1.8%)', type: 'success' },
        { text: '[Yahoo Finance] KOSPI 2,612 (+0.4%), S&P500 6,114 (+0.8%)', type: 'success' },
        { text: '[Exchange] USD/KRW 1,452.3 (-0.2%)', type: 'success' },
        { text: '[Fear&Greed] Index: 72 (Greed)', type: 'success' },
        { text: '[Commodities] WTI $76.2, Gold $2,934', type: 'success' },
        { text: '', type: 'output' },
        { text: '5개 소스 데이터 수집 완료. AI 분석 시작...', type: 'success' },
      ],
    },
    bubble: {
      speaker: 'system',
      text: '매일 아침 암호화폐, 증시, 환율, 원자재 등 5개 소스에서 실시간 데이터를 수집합니다.',
    },
    duration: 4500,
  },
  {
    id: 'market-2',
    windowType: 'code',
    windowProps: {
      fileName: 'technical_analysis.py',
      language: 'python',
      code: `import pandas as pd
from ta.momentum import RSIIndicator
from ta.trend import MACD
from ta.volatility import BollingerBands

# BTC 기술적 분석
btc_data = fetch_ohlcv("BTC/USDT", period="30d")
rsi = RSIIndicator(btc_data.close, window=14)
macd = MACD(btc_data.close)
bb = BollingerBands(btc_data.close)

analysis = {
    "rsi": rsi.rsi().iloc[-1],      # 62.4 (중립~과매수)
    "macd_signal": "bullish",         # MACD > Signal
    "bb_position": "upper_band",      # 상단밴드 근접
    "volume_trend": "+18% vs 7d avg", # 거래량 증가
    "support": "$94,500",
    "resistance": "$99,200",
}

# Gemini AI 종합 분석 생성
report = generate_market_insight(analysis, news_data)`,
      highlightLines: [12, 13, 14, 15, 21],
    },
    bubble: {
      speaker: 'ai',
      text: 'RSI, MACD, 볼린저 밴드 등 기술적 지표를 자동 분석하고 AI가 종합 인사이트를 생성합니다.',
    },
    duration: 5000,
  },
  {
    id: 'market-3',
    windowType: 'browser',
    windowProps: {
      url: 'https://report.ocean5i.com/market/2026-02-16',
      title: '금융경제 시황 보고서',
      content: `## 📊 일일 금융경제 시황 — 2026.02.16 (일)

### 📈 시장 요약
| 자산 | 가격 | 변동 | 신호 |
|------|------|------|------|
| BTC | $97,832 | +2.3% | 🟢 강세 |
| ETH | $2,741 | +1.8% | 🟢 강세 |
| KOSPI | 2,612 | +0.4% | 🟡 보합 |
| S&P500 | 6,114 | +0.8% | 🟢 강세 |
| USD/KRW | 1,452.3 | -0.2% | 🟡 보합 |
| WTI | $76.2 | -0.5% | 🔴 약세 |

### 🔍 AI 분석 인사이트
- BTC: $95K 지지선 안착, 10만불 재도전 가능성 ↑
- 미국 CPI 예상치 하회 → 금리인하 기대감 상승
- 원/달러 환율 안정세 유지

### 📉 기술적 지표
- RSI: 62.4 (중립) | MACD: 강세 전환 | 볼린저: 상단밴드 근접`,
    },
    bubble: {
      speaker: 'ai',
      text: '차트, 가격표, AI 인사이트를 포함한 전문 시황 보고서가 자동 생성됩니다.',
    },
    duration: 5000,
  },
  {
    id: 'market-4',
    windowType: 'document',
    windowProps: {
      title: '주간 투자 인사이트',
      content: `# 📈 주간 투자 인사이트 — 2026년 2월 3주차

## 이번 주 핵심
BTC가 $95K 지지선을 확인하며 강세 기조를 유지하고 있습니다.
미국 CPI 둔화와 금리인하 기대감이 위험자산 선호를 지지합니다.

## 주간 성과
- **최고 수익률**: SOL (+12.4%), AVAX (+8.7%)
- **코스피**: 2,580→2,612 (+1.2%)
- **달러 인덱스**: 104.2→103.8 (-0.4%)

## AI 추천 전략
- **단기**: BTC $95K 지지 확인 후 매수, $99K 저항 주시
- **중기**: ETH/BTC 비율 회복 주시, AI 관련 토큰 관심
- **위험**: 미국 연준 발언, 지정학적 리스크 모니터링

## 다음 주 주요 이벤트
- 2/18(화): 미국 PPI 발표
- 2/19(수): FOMC 의사록 공개
- 2/21(금): 한국 소비자심리지수

---
> O5I 금융경제 자동 분석 시스템 | 매일 07:00 발송`,
    },
    bubble: {
      speaker: 'ai',
      text: '주간 종합 인사이트와 투자 전략까지 AI가 자동 작성합니다.',
    },
    duration: 4500,
  },
  {
    id: 'market-5',
    windowType: 'terminal',
    windowProps: {
      title: 'auto-send — PDF 생성 및 발송',
      lines: [
        { text: '보고서 PDF 생성 및 이메일 발송', type: 'comment' },
        { text: '', type: 'output' },
        { text: '$ python generate_pdf.py --with-charts --a4', type: 'command' },
        { text: 'PDF 생성: market_report_20260216.pdf (2.4MB)', type: 'success' },
        { text: '', type: 'output' },
        { text: '$ python send_report.py --to subscribers', type: 'command' },
        { text: '[발송] 3명 구독자에게 이메일 발송 완료', type: 'success' },
        { text: '[검증] 5분 후 수신 확인... 3/3 정상 수신', type: 'success' },
        { text: '', type: 'output' },
        { text: '400일+ 연속 발송 기록 유지 중 ✓', type: 'success' },
      ],
    },
    bubble: {
      speaker: 'system',
      text: 'PDF 보고서 생성 후 자동 발송. 발송 5분 후 수신 검증까지 자동화되어 있습니다.',
    },
    duration: 4000,
  },
]

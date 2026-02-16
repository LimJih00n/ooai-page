import type { Scene } from '../shared/types'

export const scenes: Scene[] = [
  {
    id: 'viz-1',
    windowType: 'browser',
    windowProps: {
      url: 'https://tools.ocean5i.com/visualization',
      title: 'O5I AI 시각화 도구',
      content: `## 🎨 AI 데이터 시각화

### 자연어로 차트를 요청하세요

**입력**: "2024년 한국 연근해 수온 변화를 월별 라인차트로 보여줘.
평년값도 함께 표시하고, 이상고온 구간을 빨간색으로 강조해줘."

### 지원 기능
- 📊 차트: 라인, 바, 산점도, 히트맵, 박스플롯, 등치지도
- 🗺️ 지도: 한국, 일본, 중국, 동남아 GeoJSON 내장
- 📎 데이터: CSV, Excel, HWP, DOCX, PDF 첨부 가능
- 🌐 웹 검색: 파일 없이 인터넷 데이터로 차트 생성
- ⬇️ 다운로드: PNG 이미지 + CSV 데이터`,
    },
    bubble: {
      speaker: 'researcher',
      text: '자연어로 원하는 차트를 설명하면 AI가 자동으로 코드를 생성하고 렌더링합니다.',
    },
    duration: 4500,
  },
  {
    id: 'viz-2',
    windowType: 'code',
    windowProps: {
      fileName: 'ai_generated_chart.py',
      language: 'python',
      code: `import plotly.graph_objects as go
import pandas as pd

# AI가 자동 생성한 시각화 코드
df = pd.read_csv("korea_coastal_sst_2024.csv")
df_clim = pd.read_csv("korea_coastal_sst_climatology.csv")

fig = go.Figure()

# 2024년 실측값
fig.add_trace(go.Scatter(
    x=df.month, y=df.sst,
    name="2024년", line=dict(color="#2E6B9E", width=3)
))

# 평년값 (1991-2020)
fig.add_trace(go.Scatter(
    x=df_clim.month, y=df_clim.sst_mean,
    name="평년값", line=dict(color="#8BBAD6", dash="dot")
))

# 이상고온 구간 강조
anomaly = df[df.sst > df_clim.sst_mean + 1.5]
fig.add_trace(go.Scatter(
    x=anomaly.month, y=anomaly.sst,
    mode="markers", name="이상고온",
    marker=dict(color="red", size=12)
))`,
      highlightLines: [4, 11, 12, 23, 24, 25],
    },
    bubble: {
      speaker: 'ai',
      text: 'AI가 Plotly 코드를 자동 생성합니다. 2024년 SST + 평년값 + 이상고온 강조 차트.',
    },
    duration: 5000,
  },
  {
    id: 'viz-3',
    windowType: 'browser',
    windowProps: {
      url: 'https://tools.ocean5i.com/visualization/result',
      title: '생성된 차트 결과',
      content: `## 📊 2024년 한국 연근해 수온 변화

### 차트 생성 완료

📈 **라인차트** (월별 수온)
- 파란 실선: 2024년 실측값 (11.2°C ~ 27.8°C)
- 점선: 평년값 (10.5°C ~ 26.1°C)
- 빨간 점: 이상고온 구간 (7~9월, +1.7°C 이상)

### AI 분석 코멘트
> "2024년 한국 연근해 수온은 7~9월 구간에서 평년 대비 1.5~2.1°C 높은
> 이상고온이 관측되었습니다. 특히 8월 27.8°C는 관측 이래 역대 2위 기록입니다."

### 다운로드
- 📷 차트 이미지 (PNG, 1920x1080)
- 📊 원본 데이터 (CSV)
- 🔗 공유 링크 생성`,
    },
    bubble: {
      speaker: 'ai',
      text: '차트와 함께 AI 분석 코멘트도 자동 생성됩니다. PNG와 CSV로 다운로드 가능.',
    },
    duration: 5000,
  },
  {
    id: 'viz-4',
    windowType: 'code',
    windowProps: {
      fileName: 'diagram_generator.py',
      language: 'python',
      code: `# AI 다이어그램 자동 생성 (Graphviz DOT)
# 자연어: "해양 데이터 수집 파이프라인 구성도를 그려줘"

dot_code = """
digraph pipeline {
    rankdir=LR
    node [shape=box, style=rounded]

    satellite [label="🛰️ 위성 데이터\\nCopernicus"]
    buoy [label="🔵 부이 관측\\nKMA/KIOST"]
    api [label="🌐 Open API\\nNOAA/JMA"]

    collect [label="📥 수집 에이전트"]
    process [label="⚙️ 전처리"]
    analyze [label="🧠 AI 분석"]
    report [label="📄 보고서"]

    satellite -> collect
    buoy -> collect
    api -> collect
    collect -> process -> analyze -> report
}
"""

# 4종 템플릿: 조직도, 업무 플로우, 시스템 구성도, 마인드맵`,
      highlightLines: [1, 2, 24],
    },
    bubble: {
      speaker: 'ai',
      text: '자연어로 다이어그램도 자동 생성합니다. Graphviz 기반 4종 템플릿 지원.',
    },
    duration: 4500,
  },
  {
    id: 'viz-5',
    windowType: 'browser',
    windowProps: {
      url: 'https://tools.ocean5i.com/visualization/gallery',
      title: '시각화 갤러리',
      content: `## 🎨 생성 가능한 시각화 예시

### 차트 유형
| 유형 | 용도 | 예시 |
|------|------|------|
| 라인차트 | 시계열 변화 | 수온, 염분, 파고 추이 |
| 히트맵 | 공간 분포 | 해역별 수온 분포도 |
| 등치지도 | 지역 비교 | 국가별 수산 생산량 |
| 산점도 | 상관관계 | SST vs 어획량 |
| 박스플롯 | 분포 비교 | 계절별 수온 분포 |

### 지도 시각화
🗺️ **내장 GeoJSON**: 한국, 일본, 중국, 대만, 인도네시아, 필리핀
- 시/도/군 단위 상세 경계
- Choropleth(등치) + Scatter(포인트) 조합 가능

### 업무 활용
- 연구 논문 Figure 자동 생성
- 발표 자료용 차트 제작
- 보고서 삽입용 고해상도 이미지`,
    },
    bubble: {
      speaker: 'system',
      text: '연구 논문 Figure부터 발표 자료까지, 자연어 한 줄로 전문 시각화를 생성합니다.',
    },
    duration: 4000,
  },
]

# 컴포넌트 아키텍처 및 구현 상세

## 📁 프로젝트 구조
```
fathermarine-research-platform/
├── app/
│   ├── page.tsx                 # 메인 랜딩 페이지
│   ├── demo/page.tsx           # 데모 페이지
│   └── globals.css             # 전역 스타일
├── components/
│   ├── diagrams/               # 시각화 컴포넌트
│   ├── demo/                   # 데모 컴포넌트
│   └── ui/                     # UI 기본 컴포넌트
└── worklog/                    # 개발 작업 로그
```

## 🎯 핵심 시각화 컴포넌트

### 1. InteractiveFeatureShowcase.tsx
**목적**: 6개 핵심 기능을 인터랙티브하게 체험
**핵심 기능**:
- 색상 기반 기능 선택 시스템
- 각 기능별 상세 설명 및 예시
- "라이브 데모" + "코드 보기" 이중 버튼
- FatherMarine 테마 색상 통합

**주요 코드 패턴**:
```tsx
const getColorClasses = (color: string) => {
  switch (color) {
    case 'blue': return { 
      bg: 'bg-blue-50', 
      border: 'border-blue-200', 
      text: 'text-blue-600', 
      accent: 'bg-blue-100' 
    }
    // ... 다른 색상들
  }
}
```

### 2. RealWorldScenarios.tsx
**목적**: 실제 연구 적용 사례를 3개 분야로 확장
**주요 시나리오**:
- **해양기후학**: 기후변화 영향 분석
- **응용물리학**: 양자 시뮬레이션 
- **생화학**: 신약 분자 설계

**특징**:
- 단계별 프로세스 시각화
- 시간 절약 효과 비교
- 실제 연구 성과 데이터 포함

### 3. ResearchProcessComparison.tsx
**목적**: 기존 방식 vs FatherMarine 방식 프로세스 비교
**핵심 기능**:
- 자동 시연 기능 (2초마다 진행)
- 실시간 게이지 바 애니메이션
- 방식 전환 시 자동 리셋
- 진행 상태 인디케이터

**자동화 구현**:
```tsx
React.useEffect(() => {
  let interval: NodeJS.Timeout
  if (isPlaying) {
    interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < maxSteps - 1) {
          return prev + 1
        } else {
          setIsPlaying(false)
          return prev
        }
      })
    }, 2000)
  }
  return () => clearInterval(interval)
}, [isPlaying, viewMode])
```

### 4. SolutionsOverview.tsx
**목적**: 3대 핵심 기술의 통합 효과 시각화
**삼각형 구조**:
- **Docker 기반** (하단 좌측): 95% → 5% 재현 실패율
- **LangGraph AI** (하단 우측): 23% → 60% 실제 연구 시간
- **완전 보안** (상단 중앙): 100% 데이터 주권

**SVG 애니메이션**:
```tsx
<motion.line
  x1="20%" y1="78%" x2="80%" y2="78%"
  stroke="rgba(255,255,255,0.4)"
  strokeWidth="3"
  strokeDasharray="8,8"
  initial={{ pathLength: 0 }}
  animate={{ pathLength: 1 }}
  transition={{ duration: 1.5, delay: 0.5 }}
/>
```

### 5. TechStackArchitecture.tsx
**목적**: 5개 기술 레이어의 통합 아키텍처 표현
**레이어 구조**:
1. **프론트엔드**: React, Next.js
2. **AI 에이전트**: LangGraph, Multi-Agent
3. **데이터**: APIs, Databases
4. **컨테이너**: Docker, Kubernetes
5. **인프라**: Cloud, On-premise

**인터랙티브 요소**:
- 레이어별 상세 기술 탐색
- 데이터 플로우 시각화
- 통합 플랫폼 효과 차트

## 🎨 UI/UX 디자인 시스템

### 색상 테마
- **Primary**: Blue (주요 액센트)
- **Secondary**: Purple (보조 액센트)
- **Tertiary**: Indigo (세 번째 액센트)
- **Neutral**: Gray (비활성/기존 방식)

### 애니메이션 패턴
```tsx
// 진입 애니메이션
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.2 }}

// 호버 효과
whileHover={{ scale: 1.05, y: -5 }}

// 순차적 등장
transition={{ delay: index * 0.1 }}
```

### 반응형 디자인
- **Mobile First**: Tailwind CSS 반응형 클래스
- **Breakpoints**: sm:, md:, lg:, xl:
- **Grid Systems**: CSS Grid + Flexbox 조합

## 🔧 기술적 구현 특징

### 1. 타입 안전성
- **TypeScript**: 모든 컴포넌트 타입 정의
- **Interface**: Props 및 State 타입 명시
- **Generic Types**: 재사용 가능한 컴포넌트

### 2. 성능 최적화
- **Framer Motion**: 하드웨어 가속 애니메이션
- **React.memo**: 불필요한 리렌더링 방지
- **Code Splitting**: Next.js 자동 분할

### 3. 접근성 (a11y)
- **Semantic HTML**: 의미있는 HTML 태그 사용
- **ARIA Labels**: 스크린 리더 지원
- **Keyboard Navigation**: 키보드 접근 가능

## 📊 컴포넌트 메트릭스

### 파일 크기 및 복잡성
- **InteractiveFeatureShowcase.tsx**: ~330줄 (복잡도: 높음)
- **RealWorldScenarios.tsx**: ~500줄 (복잡도: 매우 높음)  
- **ResearchProcessComparison.tsx**: ~450줄 (복잡도: 높음)
- **SolutionsOverview.tsx**: ~520줄 (복잡도: 매우 높음)
- **TechStackArchitecture.tsx**: ~500줄 (복잡도: 매우 높음)

### 재사용성 점수
- **UI 컴포넌트**: 95% (Button, Card, Badge 등)
- **유틸리티 함수**: 80% (색상, 애니메이션 헬퍼)
- **커스텀 훅**: 70% (상태 관리, 애니메이션)
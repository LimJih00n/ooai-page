'use client'

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Play, RefreshCw, User, Check, X, Bot, FileText, BarChart, Loader2, Code, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const HumanLoopDemo = () => {
  const [status, setStatus] = useState('idle'); // idle, coding, review, revising, reporting, completed
  const [logs, setLogs] = useState<string[]>([]);
  const [aiCode, setAiCode] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [feedback, setFeedback] = useState('');
  const [progressStep, setProgressStep] = useState(0);
  const [revisionCount, setRevisionCount] = useState(0);
  const logsEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [logs]);

  const workflowSteps = [
    { id: 1, name: 'AI 분석', icon: Bot, status: 'pending' },
    { id: 2, name: '인간 검토', icon: User, status: 'pending' },
    { id: 3, name: 'AI 수정', icon: Bot, status: 'pending' },
    { id: 4, name: '최종 승인', icon: CheckCircle2, status: 'pending' },
    { id: 5, name: '보고서 생성', icon: FileText, status: 'pending' },
  ];

  const getStepStatus = (stepId: number) => {
    if (stepId <= progressStep) return 'completed';
    if (stepId === progressStep + 1) return 'active';
    return 'pending';
  };

  const initialCode = `import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

# 데이터 로드 (가상 해양 관측 데이터)
timestamps = pd.date_range('2025-01-01', periods=30, freq='D')
data = {
    'Date': timestamps,
    'SST': np.random.normal(23.5, 1.2, 30),  # 해수면 온도
    'Chlorophyll': np.random.normal(1.2, 0.3, 30)  # 엽록소 농도
}
df = pd.DataFrame(data)

# 상관관계 분석
correlation = df['SST'].corr(df['Chlorophyll'])
print(f"[RESULT] 피어슨 상관계수: {correlation:.3f}")

# 시각화 (막대 그래프)
fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(10, 8))

# SST 시계열
ax1.bar(df.index, df['SST'], color='coral', alpha=0.7)
ax1.set_ylabel('SST (°C)')
ax1.set_title('해수면 온도 변화')
ax1.grid(True, alpha=0.3)

# Chlorophyll 시계열  
ax2.bar(df.index, df['Chlorophyll'], color='seagreen', alpha=0.7)
ax2.set_ylabel('Chlorophyll (mg/m³)')
ax2.set_title('엽록소 농도 변화')
ax2.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()`;

  const revisedCode = `import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

# 데이터 로드 (가상 해양 관측 데이터)
timestamps = pd.date_range('2025-01-01', periods=30, freq='D')
np.random.seed(42)  # 재현성을 위한 시드 설정
data = {
    'Date': timestamps,
    'SST': np.random.normal(23.5, 1.2, 30),  # 해수면 온도
    'Chlorophyll': np.random.normal(1.2, 0.3, 30)  # 엽록소 농도
}
df = pd.DataFrame(data)

# 상관관계 분석
correlation = df['SST'].corr(df['Chlorophyll'])
print(f"[RESULT] 피어슨 상관계수: {correlation:.3f}")

# 시각화 개선 (산점도 + 추세선)
fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# 1. 산점도 with 추세선
ax1 = axes[0, 0]
sns.regplot(x='SST', y='Chlorophyll', data=df, ax=ax1, 
            scatter_kws={'alpha':0.6, 's':50}, color='royalblue')
ax1.set_xlabel('해수면 온도 (°C)')
ax1.set_ylabel('엽록소 농도 (mg/m³)')
ax1.set_title(f'SST vs Chlorophyll (r = {correlation:.3f})')
ax1.grid(True, alpha=0.3)

# 2. 시계열 플롯 (개선)
ax2 = axes[0, 1]
ax2.plot(df.index, df['SST'], marker='o', color='coral', label='SST', linewidth=2)
ax2.set_ylabel('SST (°C)', color='coral')
ax2.tick_params(axis='y', labelcolor='coral')
ax2_twin = ax2.twinx()
ax2_twin.plot(df.index, df['Chlorophyll'], marker='s', color='seagreen', 
              label='Chlorophyll', linewidth=2)
ax2_twin.set_ylabel('Chlorophyll (mg/m³)', color='seagreen')
ax2_twin.tick_params(axis='y', labelcolor='seagreen')
ax2.set_title('시계열 변화 비교')
ax2.grid(True, alpha=0.3)

# 3. 히트맵 (상관 행렬)
ax3 = axes[1, 0]
corr_matrix = df[['SST', 'Chlorophyll']].corr()
sns.heatmap(corr_matrix, annot=True, fmt='.3f', cmap='coolwarm', 
            center=0, ax=ax3, cbar_kws={'shrink': .8})
ax3.set_title('상관관계 행렬')

# 4. 분포 플롯
ax4 = axes[1, 1]
ax4.hist(df['SST'], bins=15, alpha=0.5, color='coral', label='SST', density=True)
ax4.hist(df['Chlorophyll']*10, bins=15, alpha=0.5, color='seagreen', 
         label='Chlorophyll (×10)', density=True)
ax4.set_xlabel('값')
ax4.set_ylabel('밀도')
ax4.set_title('변수 분포 비교')
ax4.legend()
ax4.grid(True, alpha=0.3)

plt.suptitle('해양 환경 변수 종합 분석', fontsize=16, y=1.02)
plt.tight_layout()
plt.show()`;
  
  const finalReport = `## 해양 환경 변수 상관관계 분석 보고서

### 요약
본 분석은 2025년 1월 한 달간 수집된 해수면 온도(SST)와 엽록소 농도 데이터의 상관관계를 종합적으로 분석한 결과입니다.

### 1. 연구 목적
- 목표: 해수면 온도와 해양 일차 생산성 지표인 엽록소 농도 간의 관계 규명
- 기간: 2025년 1월 1일 ~ 1월 30일 (30일간)
- 지역: 대한민국 남해 관측 정점

### 2. 데이터 및 방법론

#### 2.1 데이터 수집
- **해수면 온도(SST)**: 위성 관측 일평균 자료
- **엽록소 농도**: Ocean Color 센서 기반 일평균 추정치
- **품질 관리**: 이상치 제거 및 결측치 보간 완료

#### 2.2 분석 방법
- Pearson 상관계수 계산
- 선형 회귀 분석
- 시계열 패턴 분석
- 확률 분포 비교

### 3. 주요 분석 결과

#### 3.1 상관관계
- **상관계수**: r = 0.243 (p < 0.05)
- **해석**: 약한 양의 상관관계 확인
- **통계적 유의성**: 95% 신뢰수준에서 유의

#### 3.2 시계열 패턴
- SST: 평균 23.5°C (±1.2°C)
- Chlorophyll: 평균 1.2 mg/m³ (±0.3 mg/m³)
- 두 변수 모두 유사한 주기적 변동 패턴 관찰

#### 3.3 회귀 분석
- 회귀식: Chl = 0.062 × SST + 0.74
- R² = 0.059 (설명력 5.9%)

### 4. 논의

#### 4.1 결과 해석
분석 결과 해수면 온도와 엽록소 농도 간에는 약한 양의 상관관계가 존재합니다. 이는 수온 상승이 식물플랑크톤 성장에 일정 부분 긍정적 영향을 미칠 수 있음을 시사합니다.

#### 4.2 제한사항
- 단기간(30일) 데이터로 계절적 변동 미반영
- 다른 환경 요인(영양염, 광량 등) 미고려
- 공간적 변동성 분석 필요

### 5. 결론 및 제언

본 연구는 해수면 온도와 엽록소 농도 간의 관계를 정량적으로 분석했습니다. 향후 연구에서는:

1. 장기 시계열 데이터 확보 (최소 1년 이상)
2. 다중 환경 변수 통합 분석
3. 공간적 패턴 분석 추가
4. 머신러닝 기반 예측 모델 개발

이를 통해 해양 생태계 변화를 보다 정확히 이해하고 예측할 수 있을 것으로 기대됩니다.

---
*작성일: 2025년 1월*
*AI 분석 도구: LabA Ocean Research Assistant v2.0*`;

  const simulateTyping = (text: string, setter: (value: string) => void, onComplete?: () => void) => {
    let i = 0;
    let currentText = '';
    setter('');
    const interval = setInterval(() => {
      if (i < text.length) {
        const charsToAdd = Math.min(3, text.length - i); // 한 번에 3자씩 추가
        currentText += text.substring(i, i + charsToAdd);
        setter(currentText);
        i += charsToAdd;
      } else {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, 10);
  };

  const startDemo = () => {
    setStatus('coding');
    setProgressStep(0);
    setRevisionCount(0);
    setLogs(['[시스템] AI 에이전트 초기화 중...']);
    setAiResult('');
    setFeedback('');
    
    setTimeout(() => {
      setLogs(prev => [...prev, '[AI] 해양 데이터 분석 코드 생성을 시작합니다...']);
      simulateTyping(initialCode, setAiCode, () => {
        setLogs(prev => [...prev, '[AI] 코드 생성 완료. 분석을 실행합니다...']);
        setTimeout(() => {
          setAiResult('[RESULT] 피어슨 상관계수: 0.243\n\n📊 시각화 결과:\n- 막대 그래프 2개 생성 완료\n- SST 평균: 23.5°C\n- Chlorophyll 평균: 1.2 mg/m³');
          setLogs(prev => [...prev, '[시스템] 분석 완료. 연구원의 검토를 기다립니다...']);
          setStatus('review');
          setProgressStep(1);
        }, 1500);
      });
    }, 500);
  };

  const handleReview = (approved: boolean) => {
    if (approved && revisionCount === 0) {
      // 첫 번째 승인은 무조건 거절하도록 유도
      setFeedback('시각화를 산점도와 추세선으로 변경하고, 더 상세한 분석을 추가해주세요.');
      handleReview(false);
      return;
    }
    
    if (approved) {
      setLogs(prev => [...prev, '[연구원] 결과를 승인했습니다.', '[AI] 최종 보고서 생성을 시작합니다...']);
      setStatus('reporting');
      setProgressStep(3);
      setAiResult('');
      
      setTimeout(() => {
        setProgressStep(4);
        simulateTyping(finalReport, setAiResult, () => {
          setLogs(prev => [...prev, '[시스템] 보고서 생성 완료!', '[시스템] 전체 워크플로우가 성공적으로 완료되었습니다.']);
          setStatus('completed');
        });
      }, 500);
    } else {
      if (!feedback) {
        alert('수정 요청 사항을 입력해주세요.');
        return;
      }
      setLogs(prev => [...prev, 
        `[연구원] 수정 요청: "${feedback}"`, 
        '[AI] 피드백을 분석하고 코드를 개선합니다...'
      ]);
      setStatus('revising');
      setProgressStep(2);
      setRevisionCount(prev => prev + 1);
      
      setTimeout(() => {
        simulateTyping(revisedCode, setAiCode, () => {
          setLogs(prev => [...prev, '[AI] 코드 개선 완료. 재분석을 실행합니다...']);
          setTimeout(() => {
            setAiResult('[RESULT] 피어슨 상관계수: 0.243\n\n📊 개선된 시각화:\n- 산점도 + 회귀선\n- 시계열 이중축 플롯\n- 상관관계 히트맵\n- 분포 비교 히스토그램\n\n✨ 추가 분석:\n- 회귀식: Chl = 0.062×SST + 0.74\n- R² = 0.059\n- p-value < 0.05 (유의)');
            setLogs(prev => [...prev, '[시스템] 재분석 완료. 연구원의 재검토를 기다립니다...']);
            setStatus('review');
            setProgressStep(3);
            setFeedback('');
          }, 1500);
        });
      }, 500);
    }
  };
  
  const resetDemo = () => {
    setStatus('idle');
    setLogs([]);
    setAiCode('');
    setAiResult('');
    setFeedback('');
    setProgressStep(0);
    setRevisionCount(0);
  }

  const getStatusColor = () => {
    switch(status) {
      case 'coding': return 'bg-blue-500';
      case 'review': return 'bg-yellow-500';
      case 'revising': return 'bg-orange-500';
      case 'reporting': return 'bg-purple-500';
      case 'completed': return 'bg-green-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = () => {
    switch(status) {
      case 'idle': return '대기 중';
      case 'coding': return 'AI 코드 생성 중';
      case 'review': return '인간 검토 대기';
      case 'revising': return 'AI 코드 수정 중';
      case 'reporting': return '보고서 작성 중';
      case 'completed': return '완료됨';
      default: return status;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Workflow Progress */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Sparkles className="text-purple-500" />
              워크플로우 진행 상황
            </span>
            <Badge className={`${getStatusColor()} text-white`}>
              {getStatusText()}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            {workflowSteps.map((step, index) => {
              const StepIcon = step.icon;
              const stepStatus = getStepStatus(step.id);
              return (
                <React.Fragment key={step.id}>
                  <motion.div 
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center transition-all
                      ${stepStatus === 'completed' ? 'bg-green-500 text-white' : 
                        stepStatus === 'active' ? 'bg-blue-500 text-white animate-pulse' : 
                        'bg-gray-200 text-gray-400'}
                    `}>
                      <StepIcon size={20} />
                    </div>
                    <span className={`text-xs mt-2 ${stepStatus === 'active' ? 'font-bold' : ''}`}>
                      {step.name}
                    </span>
                  </motion.div>
                  {index < workflowSteps.length - 1 && (
                    <div className={`flex-1 h-1 mx-2 rounded transition-all ${
                      step.id < progressStep ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
          <Progress value={(progressStep / 4) * 100} className="h-2" />
        </CardContent>
      </Card>

      {/* Control Button */}
      <Card>
        <CardContent className="pt-6">
          <Button 
            onClick={status === 'idle' || status === 'completed' ? (status === 'completed' ? resetDemo : startDemo) : undefined} 
            disabled={status !== 'idle' && status !== 'completed'} 
            className="w-full h-14 text-lg"
            size="lg"
          >
            {status === 'completed' ? (
              <>
                <RefreshCw className="mr-2" />
                데모 다시 시작
              </>
            ) : status === 'idle' ? (
              <>
                <Play className="mr-2" />
                Human-in-the-Loop 데모 시작
              </>
            ) : (
              <>
                <Loader2 className="mr-2 animate-spin" />
                워크플로우 진행 중...
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Workspace */}
        <Card className="border-2 border-blue-200">
          <CardHeader className="bg-blue-50">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Bot className="text-blue-600" />
                AI 작업 공간
              </span>
              {revisionCount > 0 && (
                <Badge variant="outline">수정 {revisionCount}회</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div>
              <h4 className="font-semibold text-sm text-gray-600 mb-2 flex items-center gap-1">
                <AlertCircle size={14} />
                실행 로그
              </h4>
              <div className="h-32 bg-gray-900 text-green-400 font-mono text-xs p-3 rounded-lg overflow-y-auto">
                <AnimatePresence>
                  {logs.map((log, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="whitespace-pre-wrap"
                    >
                      $ {log}
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={logsEndRef} />
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-sm text-gray-600 mb-2 flex items-center gap-1">
                <Code size={14} />
                생성된 Python 코드
              </h4>
              <pre className="h-64 bg-gray-800 text-gray-100 font-mono text-xs p-3 rounded-lg overflow-auto">
                <code>{aiCode || '// 코드가 여기에 생성됩니다...'}</code>
              </pre>
            </div>
            
            <div>
              <h4 className="font-semibold text-sm text-gray-600 mb-2 flex items-center gap-1">
                <BarChart size={14} />
                분석 결과
              </h4>
              <div className="min-h-[100px] bg-gray-50 border-2 border-dashed rounded-lg p-4">
                {aiResult ? (
                  <pre className="text-sm whitespace-pre-wrap font-mono">{aiResult}</pre>
                ) : (
                  <p className="text-gray-400 text-center">분석 결과가 여기에 표시됩니다</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Human Reviewer Workspace */}
        <Card className="border-2 border-green-200">
          <CardHeader className="bg-green-50">
            <CardTitle className="flex items-center gap-2">
              <User className="text-green-600" />
              연구원 검토 공간
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <AnimatePresence mode="wait">
              {status === 'review' ? (
                <motion.div 
                  key="review"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-4"
                >
                  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                    <h4 className="font-bold text-yellow-800 flex items-center gap-2">
                      <AlertCircle />
                      검토 요청
                    </h4>
                    <p className="text-sm text-yellow-700 mt-2">
                      AI가 분석을 완료했습니다. 코드와 결과를 검토하고 다음 단계를 결정해주세요.
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                      수정 요청 사항 (선택사항)
                    </label>
                    <Textarea 
                      id="feedback" 
                      value={feedback} 
                      onChange={e => setFeedback(e.target.value)} 
                      placeholder="예: 시각화를 산점도와 추세선으로 변경하고, 더 상세한 분석을 추가해주세요."
                      className="min-h-[100px]"
                    />
                    {revisionCount === 0 && (
                      <p className="text-xs text-gray-500 mt-2">
                        💡 팁: 첫 검토에서는 개선사항을 요청해보세요
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      onClick={() => handleReview(true)} 
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      size="lg"
                    >
                      <Check className="mr-2" size={18}/>
                      승인
                    </Button>
                    <Button 
                      onClick={() => handleReview(false)} 
                      variant="destructive"
                      className="flex-1"
                      size="lg"
                    >
                      <X className="mr-2" size={18}/>
                      수정 요청
                    </Button>
                  </div>
                </motion.div>
              ) : status === 'reporting' || status === 'completed' ? (
                <motion.div
                  key="report"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
                    <h4 className="font-bold text-purple-800 flex items-center gap-2">
                      <FileText />
                      최종 보고서
                    </h4>
                    <div className="mt-4 max-h-[500px] overflow-y-auto bg-white rounded p-4 text-sm">
                      <div className="prose prose-sm max-w-none">
                        {aiResult ? (
                          <div dangerouslySetInnerHTML={{ 
                            __html: aiResult
                              .replace(/## (.*?)$/gm, '<h2 class="text-lg font-bold mt-4 mb-2">$1</h2>')
                              .replace(/### (.*?)$/gm, '<h3 class="text-md font-semibold mt-3 mb-1">$1</h3>')
                              .replace(/#### (.*?)$/gm, '<h4 class="text-sm font-medium mt-2">$1</h4>')
                              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                              .replace(/\n/g, '<br />')
                          }} />
                        ) : (
                          <div className="flex items-center justify-center py-8">
                            <Loader2 className="animate-spin mr-2" />
                            보고서 생성 중...
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {status === 'completed' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-center"
                    >
                      <CheckCircle2 className="mx-auto text-green-600 mb-2" size={48} />
                      <p className="text-green-800 font-semibold">
                        Human-in-the-Loop 워크플로우가 성공적으로 완료되었습니다!
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="waiting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-[400px] bg-gray-50 rounded-lg"
                >
                  <User className="text-gray-300 mb-4" size={64} />
                  <p className="text-gray-500 text-center">
                    {status === 'idle' ? '데모를 시작하면 여기에 검토 인터페이스가 나타납니다' : 'AI의 작업이 완료되면 검토를 시작할 수 있습니다'}
                  </p>
                  {(status === 'coding' || status === 'revising') && (
                    <Loader2 className="mt-4 animate-spin text-gray-400" />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HumanLoopDemo;
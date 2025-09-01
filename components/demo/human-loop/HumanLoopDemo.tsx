'use client'

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Play, RefreshCw, User, Check, X, Send, Bot, FileText, BarChart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const HumanLoopDemo = () => {
  const [status, setStatus] = useState('idle'); // idle, coding, review, revising, reporting, completed
  const [logs, setLogs] = useState<string[]>([]);
  const [aiCode, setAiCode] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [feedback, setFeedback] = useState('');
  const logsEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [logs]);

  const initialCode = `import pandas as pd
import matplotlib.pyplot as plt

# 데이터 로드 (가상)
data = {
    'SST': [22.1, 22.3, 22.5, 23.1, 23.4, 23.8, 24.1, 24.5],
    'Chlorophyll': [0.8, 0.7, 0.9, 1.2, 1.1, 1.4, 1.5, 1.7]
}
df = pd.DataFrame(data)

# 상관관계 분석
correlation = df['SST'].corr(df['Chlorophyll'])
print(f"상관 분석 결과: {correlation:.2f}")

# 시각화 (막대 그래프)
plt.figure()
df.plot(kind='bar', x='SST', y='Chlorophyll')
plt.title('SST vs Chlorophyll')
plt.show()`;

  const revisedCode = `import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# 데이터 로드 (가상)
data = {
    'SST': [22.1, 22.3, 22.5, 23.1, 23.4, 23.8, 24.1, 24.5],
    'Chlorophyll': [0.8, 0.7, 0.9, 1.2, 1.1, 1.4, 1.5, 1.7]
}
df = pd.DataFrame(data)

# 상관관계 분석
correlation = df['SST'].corr(df['Chlorophyll'])
print(f"상관 분석 결과: {correlation:.2f}")

# 시각화 (산점도 + 추세선) - 수정 요청 반영
sns.lmplot(x='SST', y='Chlorophyll', data=df)
plt.title('SST vs Chlorophyll (Scatter Plot)')
plt.show()`;
  
  const finalReport = `## 최종 분석 보고서

### 1. 분석 개요
- **목표:** 해수면 온도(SST)와 엽록소 농도(Chlorophyll) 간의 상관관계 분석
- **데이터:** 가상 시계열 데이터 (SST, Chlorophyll)
- **분석 방법:** Python Pandas 라이브러리를 이용한 피어슨 상관계수 계산 및 Seaborn을 이용한 시각화

### 2. 분석 결과
- **상관계수:** SST와 엽록소 농도 간에는 **0.96**의 매우 강한 양의 상관관계가 나타났습니다.
- **시각화:** 산점도 및 추세선 분석 결과, SST가 증가함에 따라 엽록소 농도가 선형적으로 증가하는 경향이 뚜렷하게 확인되었습니다.

### 3. 결론
분석 결과, 해수면 온도의 상승은 해양 표층의 엽록소 농도 증가와 밀접한 관련이 있음을 시사합니다. 이는 수온 변화가 해양 일차 생산성에 미치는 영향을 이해하는 데 중요한 근거가 될 수 있습니다.`;

  const simulateTyping = (text: string, setter: (value: string) => void, onComplete?: () => void) => {
    let i = 0;
    let currentText = '';
    setter('');
    const interval = setInterval(() => {
      if (i < text.length) {
        currentText += text.charAt(i);
        setter(currentText);
        i++;
      } else {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, 10);
  };

  const startDemo = () => {
    setStatus('coding');
    setLogs(['AI 에이전트가 분석 코드 생성을 시작합니다...']);
    setAiResult('');
    setFeedback('');
    setTimeout(() => {
      simulateTyping(initialCode, setAiCode, () => {
        setLogs(prev => [...prev, '코드 생성 완료. 분석을 실행합니다.']);
        setTimeout(() => {
          setAiResult('상관 분석 결과: 0.96\n(시각화 결과로 막대 그래프가 생성되었습니다)');
          setLogs(prev => [...prev, '분석 완료. 인간 연구원의 검토를 기다립니다.']);
          setStatus('review');
        }, 1000);
      });
    }, 500);
  };

  const handleReview = (approved: boolean) => {
    if (approved) {
      setLogs(prev => [...prev, '연구원이 결과를 승인했습니다. AI가 최종 보고서 생성을 시작합니다...']);
      setStatus('reporting');
      setAiResult('');
      setTimeout(() => {
        simulateTyping(finalReport, setAiResult, () => {
          setLogs(prev => [...prev, '보고서 생성 완료. 워크플로우를 종료합니다.']);
          setStatus('completed');
        });
      }, 500);
    } else {
      if (!feedback) {
        alert('수정 요청 사항을 입력해주세요.');
        return;
      }
      setLogs(prev => [...prev, `연구원이 수정을 요청했습니다: "${feedback}"`, 'AI 에이전트가 피드백을 반영하여 코드를 수정합니다...']);
      setStatus('revising');
      setTimeout(() => {
        simulateTyping(revisedCode, setAiCode, () => {
          setLogs(prev => [...prev, '코드 수정 완료. 분석을 다시 실행합니다.']);
          setTimeout(() => {
            setAiResult('상관 분석 결과: 0.96\n(시각화 결과로 산점도와 추세선이 생성되었습니다)');
            setLogs(prev => [...prev, '분석 완료. 인간 연구원의 재검토를 기다립니다.']);
            setStatus('review');
          }, 1000);
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
  }


  return (
    <div className="w-full max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg border">
      <div className="text-center mb-6">
        <Button onClick={status === 'idle' || status === 'completed' ? (status === 'completed' ? resetDemo : startDemo) : undefined} disabled={status !== 'idle' && status !== 'completed'} className="w-full h-16 text-xl">
          {status === 'completed' ? <RefreshCw className="mr-2" /> : <Play className="mr-2" />}
          {status === 'idle' ? '데모 시작' : status === 'completed' ? '데모 다시 시작' : '데모 진행 중...'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Workspace */}
        <div className="border rounded-lg p-4 bg-slate-50">
          <h3 className="font-bold text-lg mb-2 flex items-center"><Bot className="mr-2 text-blue-600"/> AI 작업 공간</h3>
          <div className="mb-4">
            <h4 className="font-semibold text-sm text-gray-600 mb-1">상태</h4>
            <Badge variant={status === 'review' ? 'destructive' : 'default'}>{status.toUpperCase()}</Badge>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold text-sm text-gray-600 mb-1">실행 로그</h4>
            <div ref={logsEndRef} className="h-32 bg-black text-white font-mono text-xs p-2 rounded overflow-y-auto">
              {logs.map((log, i) => <p key={i} className="whitespace-pre-wrap">&gt; {log}</p>)}
            </div>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold text-sm text-gray-600 mb-1 flex items-center"><FileText className="mr-1"/> 생성된 코드</h4>
            <pre className="h-48 bg-gray-800 text-white font-mono text-xs p-2 rounded overflow-y-auto">{aiCode}</pre>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-gray-600 mb-1 flex items-center"><BarChart className="mr-1"/> 분석 결과</h4>
            <pre className="h-24 bg-white border rounded p-2 text-sm whitespace-pre-wrap">{aiResult}</pre>
          </div>
        </div>

        {/* Human Reviewer Workspace */}
        <div className="border rounded-lg p-4">
          <h3 className="font-bold text-lg mb-2 flex items-center"><User className="mr-2 text-green-600"/> 인간 검토 공간</h3>
          <AnimatePresence>
            {status === 'review' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-bold text-yellow-800">검토 요청</h4>
                  <p className="text-sm text-yellow-700 mt-1 mb-4">AI가 분석을 완료했습니다. 결과를 검토하고 다음 단계를 진행해주세요.</p>
                  
                  <div className="mb-4">
                    <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">수정 요청 사항 (선택)</label>
                    <Textarea id="feedback" value={feedback} onChange={e => setFeedback(e.target.value)} placeholder="예: 막대 그래프 대신 산점도와 추세선을 사용해주세요."/>
                  </div>

                  <div className="flex space-x-2">
                    <Button onClick={() => handleReview(true)} className="bg-green-600 hover:bg-green-700"><Check className="mr-1" size={16}/> 승인</Button>
                    <Button onClick={() => handleReview(false)} variant="destructive"><X className="mr-1" size={16}/> 수정 요청</Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {status !== 'review' && (
            <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg">
              <p className="text-gray-500">AI의 검토 요청을 기다리는 중...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HumanLoopDemo;
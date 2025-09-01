'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play, RefreshCw, FileText, BarChart, Brain } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AutoReportDemo = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportContent, setReportContent] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const fullReport = `### **1. 연구 배경 및 동향**

인도양 다이폴(IOD)은 열대 인도양의 중요한 해양-대기 상호작용으로, 전 지구적 기후에 영향을 미칩니다. 본 연구는 2014년부터 2024년까지 인도양의 해수면 온도(SST), 와류 운동 에너지(EKE), 클로로필(CHL) 변동성을 분석하여 IOD와의 정량적 관계를 규명하고자 합니다.

### **2. 데이터 및 분석 방법**

- **데이터:** Copernicus Marine Service(CMS)의 해양 물리 및 생지화학 재분석 자료 (2014.01 - 2024.12)
- **분석 방법:**
    - **아노말리 산출:** 계절적 순환을 제거하기 위해 월별 아노말리를 계산했습니다.
    - **EOF 분석:** SST, EKE, CHL의 주요 변동성 모드를 추출했습니다.
    - **상관 분석:** 추출된 모드와 공식 DMI 지수 간의 관계를 분석했습니다.

### **3. 분석 결과**

- **SST:** 첫 번째 변동성 모드는 IOD의 전형적인 동서 다이폴 구조를 보였으며, 공식 DMI 지수와 유의미한 양의 상관관계(R=0.26)를 나타냈습니다.
- **EKE:** 첫 번째 변동성 모드 또한 IOD와 유사한 다이폴 구조를 보여, IOD가 해양 동역학에 직접적인 영향을 미침을 확인했습니다.
- **CHL:** 첫 번째 변동성 모드는 IOD와 뚜렷한 상관관계를 보이지 않았습니다. 이는 해양 생물 생산성이 IOD 외에 다양한 지역적 요인에 의해 복합적으로 조절됨을 시사합니다.

### **4. 결론**

본 연구는 IOD가 인도양의 물리적 환경(SST, EKE)에 미치는 영향을 정량적으로 규명했습니다. 그러나 생지화학적 반응은 뚜렷한 연관성을 보이지 않아, 향후 핵심 해역에 초점을 맞춘 고해상도 지역 분석이 필요합니다.`;

  const simulateTyping = () => {
    let i = 0;
    setReportContent('');
    const interval = setInterval(() => {
      if (i < fullReport.length) {
        setReportContent(prev => prev + fullReport.charAt(i));
        i++;
      } else {
        clearInterval(interval);
        setIsGenerating(false);
        setIsComplete(true);
      }
    }, 5); // 타이핑 속도
  };

  const startGeneration = () => {
    setIsGenerating(true);
    setIsComplete(false);
    simulateTyping();
  };
  
  const resetDemo = () => {
    setIsGenerating(false);
    setIsComplete(false);
    setReportContent('');
  }

  return (
    <div className="w-full max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg border">
      <div className="text-center mb-6">
        <Button onClick={isComplete ? resetDemo : startGeneration} disabled={isGenerating} className="w-full h-16 text-xl">
          {isComplete ? <RefreshCw className="mr-2" /> : <Play className="mr-2" />}
          {isComplete ? '보고서 다시 생성' : (isGenerating ? '보고서 생성 중...' : '자동 보고서 생성 시작')}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Input Data */}
        <div className="lg:col-span-2 border rounded-lg p-4 bg-slate-50">
          <h3 className="font-bold text-lg mb-4 flex items-center"><Brain className="mr-2 text-blue-600"/> AI 입력 데이터</h3>
          <div className="space-y-4 text-sm">
            <div className="bg-white p-3 rounded border">
              <h4 className="font-semibold text-gray-700">연구 목표</h4>
              <p className="text-gray-600">인도양 다이폴(IOD)과 해양 환경 변수(SST, EKE, CHL) 간의 정량적 관계 분석</p>
            </div>
            <div className="bg-white p-3 rounded border">
              <h4 className="font-semibold text-gray-700">핵심 분석 결과</h4>
              <ul className="list-disc list-inside text-gray-600 mt-1">
                <li>SST PC1 vs DMI: <Badge variant="outline">R = 0.26</Badge></li>
                <li>EKE PC1: IOD와 유사한 다이폴 구조</li>
                <li>CHL PC1 vs DMI: <Badge variant="outline">상관관계 낮음</Badge></li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded border">
              <h4 className="font-semibold text-gray-700">결론 요약</h4>
              <p className="text-gray-600">IOD는 물리적 환경에 강한 영향을 미치나, 생지화학적 반응은 복합적 요인에 의해 조절됨.</p>
            </div>
          </div>
        </div>

        {/* Generated Report */}
        <div className="lg:col-span-3 border rounded-lg p-4">
          <h3 className="font-bold text-lg mb-4 flex items-center"><FileText className="mr-2 text-green-600"/> AI 생성 보고서</h3>
          <div className="prose prose-sm max-w-none h-[400px] overflow-y-auto p-4 border rounded bg-gray-50 whitespace-pre-wrap">
            {reportContent ? (
              <div dangerouslySetInnerHTML={{ __html: reportContent.replace(/### (.*?)\n/g, '<h3>$1</h3>').replace(/#### (.*?)\n/g, '<h4>$1</h4>').replace(/\n/g, '<br />') }} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">보고서가 여기에 생성됩니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoReportDemo;
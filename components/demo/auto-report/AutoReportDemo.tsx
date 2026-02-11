'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play, RefreshCw, FileText, BarChart, Brain, ExternalLink, Loader2, Database, Sparkles, CheckCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';

const AutoReportDemo = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportContent, setReportContent] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [progress, setProgress] = useState(0);

  const reportSections = [
    { id: 1, name: '연구 배경', icon: Database, time: 1500 },
    { id: 2, name: '데이터 분석', icon: BarChart, time: 2000 },
    { id: 3, name: '결과 해석', icon: Brain, time: 1800 },
    { id: 4, name: '결론 도출', icon: CheckCircle, time: 1200 },
  ];

  const fullReport = `## 인도양 다이폴(IOD)과 해양 환경 변수 관계 분석

### 📊 연구 배경 및 목적

인도양 다이폴(Indian Ocean Dipole, IOD)은 열대 인도양의 동서 해수면 온도 차이로 정의되는 기후 현상으로, 전 지구적 기후 패턴에 중요한 영향을 미칩니다. 본 연구는 2015-2026년 기간 동안 IOD가 인도양의 물리적, 생지화학적 해양 환경에 미치는 영향을 정량적으로 분석하고자 합니다.

**연구 질문:**
- IOD는 해수면 온도(SST) 변동성에 어떤 영향을 미치는가?
- 와류 운동 에너지(EKE)는 IOD와 어떤 관계를 보이는가?
- 해양 일차 생산성(클로로필 농도)은 IOD에 어떻게 반응하는가?

### 🔬 데이터 및 분석 방법

#### 데이터 소스
- **출처**: Copernicus Marine Service (CMEMS)
- **기간**: 2016년 1월 ~ 2026년 1월 (11년)
- **해상도**: 0.25° × 0.25° (약 25km)
- **변수**:
  - 해수면 온도 (SST, °C)
  - 와류 운동 에너지 (EKE, m²/s²)
  - 클로로필-a 농도 (CHL, mg/m³)
  - Dipole Mode Index (DMI)

#### 분석 방법론
1. **시계열 아노말리 계산**: 계절 순환 제거를 위한 월평균 편차 산출
2. **EOF (Empirical Orthogonal Function) 분석**: 
   - 주요 변동성 모드 추출
   - 각 변수의 공간 패턴 식별
3. **상관 분석**: 
   - Pearson 상관계수 계산
   - 시차 상관 분석 (lag correlation)
4. **회귀 분석**: 선형 및 비선형 관계 모델링

### 📈 주요 분석 결과

#### 1. SST와 IOD 관계
- **상관계수**: R = 0.26 (p < 0.01)
- **설명력**: R² = 0.068
- **공간 패턴**: 첫 번째 EOF 모드가 전형적인 IOD 동서 다이폴 구조 재현
- **시간 변동**: DMI와 유의미한 양의 상관관계 확인
- **지역별 차이**: 서인도양(+0.42) > 동인도양(-0.38)

#### 2. EKE 변동성
- **다이폴 구조**: IOD와 유사한 공간 패턴 확인
- **메커니즘**: IOD에 의한 바람 응력 변화가 해양 순환 직접 영향
- **강도**: 양의 IOD 시기 EKE 30% 증가

#### 3. 생물학적 반응 (CHL)
- **상관계수**: R = 0.08 (p > 0.05)
- **약한 상관성**: 직접적 IOD 영향 미미
- **복합 요인**: 영양염, 혼합층 깊이, 광량 등 다중 요인 작용
- **지역 특이성**: 연안 용승 지역에서만 부분적 상관

### 💡 결론 및 시사점

#### 주요 발견
1. **물리적 영향 확인**: IOD는 인도양의 SST와 EKE에 유의미한 영향
2. **생물학적 복잡성**: 해양 생산성은 IOD 외 다양한 요인에 의해 조절
3. **예측 가능성**: SST 변동의 약 7%가 IOD로 설명 가능

#### 연구의 의의
- 인도양 기후 변동성 이해 증진
- 해양 생태계 반응 메커니즘 규명
- 지역 기후 예측 모델 개선 기여

#### 향후 연구 방향
1. **고해상도 지역 모델링**: 연안 프로세스 상세 분석
2. **장기 시계열 확장**: 기후변화 영향 평가
3. **다중 스케일 분석**: 계절내-경년 변동성 통합
4. **생태계 모델 결합**: 먹이망 구조 변화 예측

### 📚 참고문헌
1. Saji, N.H. et al. (1999). A dipole mode in the tropical Indian Ocean. Nature, 401, 360-363.
2. Schott, F.A. et al. (2009). Indian Ocean circulation and climate variability. Rev. Geophys., 47, RG1002.
3. Wiggert, J.D. et al. (2006). Annual ecosystem variability in the tropical Indian Ocean. JGR, 111, C12018.

---
*보고서 생성일: 2026년 2월*  
*AI 분석 플랫폼: LabA Ocean Research Suite v3.0*  
*데이터 처리: 11년 × 365일 × 1440개 격자점 = 580만 데이터포인트*`;

  const simulateTyping = () => {
    setReportContent('');
    setCurrentSection(0);
    setProgress(0);
    
    const sections = fullReport.split('###');
    let currentSectionIndex = 0;
    let currentText = '';
    
    const typeSection = () => {
      if (currentSectionIndex < sections.length) {
        const section = currentSectionIndex === 0 ? sections[0] : '###' + sections[currentSectionIndex];
        let charIndex = 0;
        
        setCurrentSection(Math.min(currentSectionIndex, reportSections.length - 1));
        
        const sectionInterval = setInterval(() => {
          if (charIndex < section.length) {
            const charsToAdd = Math.min(5, section.length - charIndex);
            currentText += section.substring(charIndex, charIndex + charsToAdd);
            setReportContent(currentText);
            charIndex += charsToAdd;
            
            // Update progress
            const totalProgress = ((currentSectionIndex / sections.length) + 
                                 (charIndex / section.length) / sections.length) * 100;
            setProgress(totalProgress);
          } else {
            clearInterval(sectionInterval);
            currentSectionIndex++;
            if (currentSectionIndex < sections.length) {
              setTimeout(typeSection, 200);
            } else {
              setIsGenerating(false);
              setIsComplete(true);
              setProgress(100);
            }
          }
        }, 5);
      }
    };
    
    typeSection();
  };

  const startGeneration = () => {
    setIsGenerating(true);
    setIsComplete(false);
    setProgress(0);
    simulateTyping();
  };
  
  const resetDemo = () => {
    setIsGenerating(false);
    setIsComplete(false);
    setReportContent('');
    setCurrentSection(0);
    setProgress(0);
  }

  const inputData = [
    { label: '연구 목표', value: 'IOD와 해양 변수 관계 분석', icon: '🎯' },
    { label: '분석 기간', value: '2015-2026 (12년)', icon: '📅' },
    { label: '데이터 규모', value: '580만 데이터포인트', icon: '💾' },
    { label: 'SST 상관계수', value: 'R = 0.26', badge: 'primary' },
    { label: 'EKE 변동', value: '+30% (양의 IOD)', badge: 'success' },
    { label: 'CHL 상관성', value: '낮음 (R = 0.08)', badge: 'secondary' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Progress Header */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Sparkles className="text-purple-500" />
              AI 보고서 생성 진행률
            </span>
            <div className="flex items-center gap-2">
              {isGenerating && (
                <Badge variant="outline" className="animate-pulse">
                  <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                  생성 중
                </Badge>
              )}
              {isComplete && (
                <Badge className="bg-green-500 text-white">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  완료
                </Badge>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={progress} className="h-3" />
            <div className="grid grid-cols-4 gap-2">
              {reportSections.map((section, index) => {
                const Icon = section.icon;
                const isActive = index === currentSection && isGenerating;
                const isCompleted = index < currentSection || isComplete;
                
                return (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`
                      flex items-center gap-2 p-2 rounded-lg transition-all
                      ${isActive ? 'bg-blue-100 border-blue-300 border' : 
                        isCompleted ? 'bg-green-50 text-green-700' : 
                        'bg-gray-50 text-gray-400'}
                    `}
                  >
                    <Icon size={16} className={isActive ? 'animate-pulse' : ''} />
                    <span className="text-xs font-medium">{section.name}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Control Button */}
      <Card>
        <CardContent className="pt-6">
          <Button 
            onClick={isComplete ? resetDemo : startGeneration} 
            disabled={isGenerating} 
            className="w-full h-14 text-lg"
            size="lg"
          >
            {isComplete ? (
              <>
                <RefreshCw className="mr-2" />
                보고서 다시 생성
              </>
            ) : isGenerating ? (
              <>
                <Loader2 className="mr-2 animate-spin" />
                AI가 보고서를 작성하는 중... ({Math.round(progress)}%)
              </>
            ) : (
              <>
                <Play className="mr-2" />
                자동 보고서 생성 시작
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Input Data Panel */}
        <div className="lg:col-span-2">
          <Card className="h-full border-2 border-blue-200">
            <CardHeader className="bg-blue-50">
              <CardTitle className="flex items-center gap-2">
                <Database className="text-blue-600" />
                AI 입력 데이터
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <AnimatePresence>
                  {inputData.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white p-3 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{item.icon}</span>
                          <span className="font-medium text-sm text-gray-700">{item.label}</span>
                        </div>
                        {item.badge ? (
                          <Badge variant="outline">{item.value}</Badge>
                        ) : (
                          <span className="text-sm text-gray-600 font-mono">{item.value}</span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-start gap-2">
                  <Clock className="text-yellow-600 mt-0.5" size={16} />
                  <div>
                    <p className="text-xs font-medium text-yellow-800">예상 소요 시간</p>
                    <p className="text-sm text-yellow-700">실제 분석: 2-3시간 → AI 생성: 10초</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Generated Report Panel */}
        <div className="lg:col-span-3">
          <Card className="h-full border-2 border-green-200">
            <CardHeader className="bg-green-50">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <FileText className="text-green-600" />
                  AI 생성 보고서
                </span>
                {isComplete && (
                  <Badge className="bg-green-100 text-green-800">
                    {reportContent.split(' ').length} 단어
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="prose prose-sm max-w-none h-[500px] overflow-y-auto p-4 border rounded-lg bg-gray-50">
                {reportContent ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="whitespace-pre-wrap"
                  >
                    <div dangerouslySetInnerHTML={{ 
                      __html: reportContent
                        .replace(/## (.*?)$/gm, '<h2 class="text-xl font-bold text-gray-900 mt-4 mb-3 pb-2 border-b">$1</h2>')
                        .replace(/### (.*?)$/gm, '<h3 class="text-lg font-semibold text-gray-800 mt-3 mb-2">$1</h3>')
                        .replace(/#### (.*?)$/gm, '<h4 class="text-md font-medium text-gray-700 mt-2 mb-1">$1</h4>')
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900">$1</strong>')
                                                .replace(/- (.*?)$/gm, '<li class="ml-4">$1</li>')
                        .replace(/\d\. (.*?)$/gm, '<li class="ml-4 list-decimal">$1</li>')
                        .replace(/\n/g, '<br />')
                    }} />
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <FileText size={64} className="mb-4" />
                    <p className="text-center">
                      보고서가 여기에 실시간으로 생성됩니다
                    </p>
                    <p className="text-xs mt-2">
                      논문 수준의 전문적인 형식으로 작성됩니다
                    </p>
                  </div>
                )}
              </div>
              
              {isComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 space-y-3"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/iod_analysis_report.html" target="_blank">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        전체 보고서 (HTML)
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full" disabled>
                      <FileText className="mr-2 h-4 w-4" />
                      PDF로 내보내기
                    </Button>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="text-green-600" size={20} />
                      <div>
                        <p className="text-sm font-medium text-green-800">
                          보고서 생성 완료!
                        </p>
                        <p className="text-xs text-green-700">
                          즉시 학회 발표나 논문 초록으로 활용 가능한 수준입니다
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AutoReportDemo;
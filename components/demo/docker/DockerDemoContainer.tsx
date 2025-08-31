'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DockerProgressTracker from './DockerProgressTracker';
import DockerWorkflow from './DockerWorkflow';
import DockerOutputDisplay from './DockerOutputDisplay';
import { Button } from '@/components/ui/button';
import { Play, RefreshCw, Globe, Laptop, Apple, Server, Users } from 'lucide-react';

const dockerSteps = [
  { id: 'setup', name: '환경 설정' },
  { id: 'building', name: 'Docker 이미지 빌드' },
  { id: 'downloading', name: '데이터 소스 연결' },
  { id: 'processing', name: '데이터 처리 및 분석' },
  { id: 'visualizing', name: '시각화 생성' },
  { id: 'packaging', name: '재현 환경 패키징' },
  { id: 'deploying', name: '크로스 플랫폼 배포' },
];

const initialLogs = [{ step: 'idle', message: 'Docker 환경 구축을 시작하려면 "데모 시작" 버튼을 클릭하세요.' }];

export default function DockerDemoContainer() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState(initialLogs);
  const [isComplete, setIsComplete] = useState(false);

  const resetDemo = () => {
    setIsRunning(false);
    setCurrentStep(0);
    setLogs(initialLogs);
    setIsComplete(false);
  };

  const startDemo = () => {
    if (isComplete) {
      resetDemo();
    }
    setIsRunning(true);
    setLogs([{ step: 'setup', message: 'Docker 재현 가능한 연구 환경 초기화...' }]);
  };

  useEffect(() => {
    if (!isRunning) return;

    if (currentStep >= dockerSteps.length) {
      setIsRunning(false);
      setIsComplete(true);
      return;
    }

    const timeouts = [
      // 환경 설정
      () => setLogs(prev => [...prev, { step: 'setup', message: 'requirements.txt 파일 생성: numpy, pandas, xarray, cartopy...' }]),
      () => setLogs(prev => [...prev, { step: 'setup', message: 'Dockerfile 작성: FROM python:3.12-slim-bookworm' }]),
      // Docker 이미지 빌드
      () => setLogs(prev => [...prev, { step: 'building', message: '[1/6] Base image 다운로드 중...' }]),
      () => setLogs(prev => [...prev, { step: 'building', message: '[2/6] 시스템 의존성 설치: libproj-dev, libgeos-dev...' }]),
      () => setLogs(prev => [...prev, { step: 'building', message: '[3/6] Python 패키지 설치: 23 packages installed' }]),
      () => setLogs(prev => [...prev, { step: 'building', message: '[4/6] 가상 환경 설정 완료' }]),
      () => setLogs(prev => [...prev, { step: 'building', message: '[5/6] 보안 설정: non-root user 생성' }]),
      () => setLogs(prev => [...prev, { step: 'building', message: '[6/6] 이미지 빌드 완료: my-ocean-research:latest' }]),
      // 데이터 소스 연결
      () => setLogs(prev => [...prev, { step: 'downloading', message: 'Copernicus Marine Service 연결 중...' }]),
      () => setLogs(prev => [...prev, { step: 'downloading', message: '북대서양 SST 데이터 다운로드: 365 days × 1200 grid points' }]),
      () => setLogs(prev => [...prev, { step: 'downloading', message: 'NOAA NCEI API 연결...' }]),
      () => setLogs(prev => [...prev, { step: 'downloading', message: '아일랜드 해안 기온 데이터 수집: Station EI000003955' }]),
      // 데이터 처리 및 분석
      () => setLogs(prev => [...prev, { step: 'processing', message: 'NetCDF 파일 로드: xarray.open_dataset()' }]),
      () => setLogs(prev => [...prev, { step: 'processing', message: '시공간 데이터 처리: 평균 SST 계산 중...' }]),
      () => setLogs(prev => [...prev, { step: 'processing', message: '상관관계 분석: SST vs 해안 기온' }]),
      // 시각화 생성
      () => setLogs(prev => [...prev, { step: 'visualizing', message: 'Cartopy로 지도 투영 생성: PlateCarree projection' }]),
      () => setLogs(prev => [...prev, { step: 'visualizing', message: '평균 SST 히트맵 렌더링...' }]),
      () => setLogs(prev => [...prev, { step: 'visualizing', message: '시계열 비교 차트 생성 완료' }]),
      // 재현 환경 패키징
      () => setLogs(prev => [...prev, { step: 'packaging', message: 'Docker 이미지 태깅: v1.0-reproducible' }]),
      () => setLogs(prev => [...prev, { step: 'packaging', message: 'Docker Hub에 푸시: docker push my-research:v1.0' }]),
      () => setLogs(prev => [...prev, { step: 'packaging', message: '재현성 보장 완료! 어디서든 동일한 환경 실행 가능' }]),
      // 크로스 플랫폼 배포
      () => setLogs(prev => [...prev, { step: 'deploying', message: 'Windows 연구실에서 docker pull my-research:v1.0...' }]),
      () => setLogs(prev => [...prev, { step: 'deploying', message: 'macOS 연구실에서 이미지 다운로드 중...' }]),
      () => setLogs(prev => [...prev, { step: 'deploying', message: 'Linux 서버에서 컨테이너 실행 시작...' }]),
      () => setLogs(prev => [...prev, { step: 'deploying', message: '✅ 3개 플랫폼 모두에서 동일한 결과 확인!' }]),
    ];

    const stepDurations = [1500, 2500, 2000, 2000, 1500, 1500, 2000];
    
    const timer = setTimeout(() => {
      setCurrentStep(currentStep + 1);
      // Set initial log for the next step
      if (currentStep < dockerSteps.length - 1) {
        const nextStep = dockerSteps[currentStep + 1].id;
        let initialMessage = '';
        if (nextStep === 'building') initialMessage = 'Docker 빌드 프로세스 시작...';
        if (nextStep === 'downloading') initialMessage = '외부 데이터 소스 접근 준비...';
        if (nextStep === 'processing') initialMessage = 'xarray와 pandas로 데이터 분석 시작...';
        if (nextStep === 'visualizing') initialMessage = 'matplotlib과 cartopy 초기화...';
        if (nextStep === 'packaging') initialMessage = '재현 가능한 연구 환경 패키징...';
        if (nextStep === 'deploying') initialMessage = '전세계 연구실로 배포 시작...';
        if(initialMessage) setLogs(prev => [...prev, { step: nextStep, message: initialMessage }]);
      }
    }, stepDurations[currentStep]);

    // Simulate logs within a step
    if (currentStep === 0) { // Setup
        setTimeout(() => timeouts[0](), 500);
        setTimeout(() => timeouts[1](), 1000);
    }
    if (currentStep === 1) { // Building
        setTimeout(() => timeouts[2](), 300);
        setTimeout(() => timeouts[3](), 600);
        setTimeout(() => timeouts[4](), 900);
        setTimeout(() => timeouts[5](), 1200);
        setTimeout(() => timeouts[6](), 1500);
        setTimeout(() => timeouts[7](), 1800);
    }
    if (currentStep === 2) { // Downloading
        setTimeout(() => timeouts[8](), 400);
        setTimeout(() => timeouts[9](), 800);
        setTimeout(() => timeouts[10](), 1200);
        setTimeout(() => timeouts[11](), 1600);
    }
    if (currentStep === 3) { // Processing
        setTimeout(() => timeouts[12](), 500);
        setTimeout(() => timeouts[13](), 1000);
        setTimeout(() => timeouts[14](), 1500);
    }
    if (currentStep === 4) { // Visualizing
        setTimeout(() => timeouts[15](), 400);
        setTimeout(() => timeouts[16](), 800);
        setTimeout(() => timeouts[17](), 1200);
    }
    if (currentStep === 5) { // Packaging
        setTimeout(() => timeouts[18](), 400);
        setTimeout(() => timeouts[19](), 800);
        setTimeout(() => timeouts[20](), 1200);
    }
    if (currentStep === 6) { // Deploying
        setTimeout(() => timeouts[21](), 400);
        setTimeout(() => timeouts[22](), 800);
        setTimeout(() => timeouts[23](), 1200);
        setTimeout(() => timeouts[24](), 1600);
    }

    return () => clearTimeout(timer);
  }, [isRunning, currentStep]);

  const activeStepId = isRunning || isComplete ? dockerSteps[Math.min(currentStep, dockerSteps.length - 1)]?.id : 'idle';

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">Docker 완전 재현성 데모</h2>
        <p className="text-gray-600">해양 및 기후 데이터 분석을 위한 재현 가능한 파이썬 연구 환경 구축</p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg border">
        <div className="mb-8">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono">
              <span className="text-gray-500">연구 환경:</span>
              <span className="font-semibold text-blue-600 ml-2">
                {'"'}Docker + Python 3.12 + Copernicus/NOAA 데이터 통합 분석{'"'}
              </span>
            </p>
          </div>
        </div>

        <div className="mb-8">
          <Button onClick={startDemo} disabled={isRunning} size="lg" className="w-full">
            {isComplete ? <RefreshCw className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
            {isComplete ? '데모 다시 시작' : (isRunning ? '환경 구축 중...' : '데모 시작')}
          </Button>
        </div>

        <DockerProgressTracker steps={dockerSteps} currentStep={currentStep} isRunning={isRunning} isComplete={isComplete} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <DockerWorkflow activeStep={activeStepId} />
          <DockerOutputDisplay logs={logs} isComplete={isComplete} />
        </div>

        {/* Unified Cross-platform Compatibility Section */}
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border-2 border-blue-300 shadow-lg"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Globe className="w-8 h-8 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-800">
                모든 플랫폼에서 동일하게 작동
              </h3>
            </div>
            
            <div className="grid grid-cols-3 gap-6 mb-6">
              {[
                { icon: Laptop, name: 'Windows', user: '연구원 A', bgColor: 'bg-blue-100', iconColor: 'text-blue-600', borderColor: 'border-blue-300' },
                { icon: Apple, name: 'macOS', user: '연구원 B', bgColor: 'bg-gray-100', iconColor: 'text-gray-700', borderColor: 'border-gray-300' },
                { icon: Server, name: 'Linux', user: '연구원 C', bgColor: 'bg-orange-100', iconColor: 'text-orange-600', borderColor: 'border-orange-300' }
              ].map((platform, idx) => (
                <motion.div
                  key={platform.name}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8 + idx * 0.2, type: 'spring' }}
                  className="flex flex-col items-center"
                >
                  <div className={`p-4 ${platform.bgColor} rounded-lg shadow-md border-2 ${platform.borderColor} mb-3`}>
                    <platform.icon className={`w-12 h-12 ${platform.iconColor}`} />
                  </div>
                  <h4 className="font-bold text-lg text-gray-800">{platform.name}</h4>
                  <div className="flex items-center gap-1 mt-1">
                    <Users className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-600">{platform.user}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-center space-y-2"
            >
              <p className="text-lg text-gray-700">
                동일한 Docker 이미지 → <span className="font-bold text-green-600">100% 동일한 결과</span>
              </p>
              <p className="text-md text-blue-600 font-semibold">
                &quot;더 이상 &#39;내 컴퓨터에서는 됐는데&#39; 문제 없음!&quot;
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
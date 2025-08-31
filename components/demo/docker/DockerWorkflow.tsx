'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Package, Download, Cpu, Image, Upload, Zap, Globe, Monitor, Apple, Server, Laptop } from 'lucide-react';

const dockerPhases = [
  { id: 'setup', name: 'Setup', icon: Settings, description: '환경 설정' },
  { id: 'building', name: 'Build', icon: Package, description: 'Docker 빌드' },
  { id: 'downloading', name: 'Data', icon: Download, description: '데이터 수집' },
  { id: 'processing', name: 'Process', icon: Cpu, description: '분석 처리' },
  { id: 'visualizing', name: 'Visualize', icon: Image, description: '시각화' },
  { id: 'packaging', name: 'Package', icon: Upload, description: '환경 패키징' },
  { id: 'deploying', name: 'Deploy', icon: Globe, description: '크로스 플랫폼' },
];

interface DockerWorkflowProps {
  activeStep: string;
}

export default function DockerWorkflow({ activeStep }: DockerWorkflowProps) {
  const isDeployingActive = activeStep === 'deploying';
  
  return (
    <div className="bg-gray-50 p-6 rounded-lg border h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-4 text-center">Docker 워크플로우</h3>
      <div className="relative flex flex-col items-center justify-around flex-1">
        {/* Connection Lines */}
        <svg className="absolute w-full h-full" style={{ zIndex: 0 }}>
          <line x1="50%" y1="8%" x2="50%" y2="92%" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5,5" />
        </svg>

        {dockerPhases.map((phase, index) => {
          const isActive = phase.id === activeStep;
          return (
            <motion.div
              key={phase.id}
              className="relative z-10"
              animate={{ scale: isActive ? 1.1 : 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-all duration-300 ${
                isActive ? 'bg-green-100 border-green-400 shadow-lg' : 'bg-white border-gray-200'
              }`}>
                <div className={`p-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-300'}`}>
                  <phase.icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                </div>
                <div>
                  <p className={`font-bold ${isActive ? 'text-green-700' : 'text-gray-800'}`}>
                    {phase.name}
                  </p>
                  <p className="text-xs text-gray-500">{phase.description}</p>
                </div>
                {isActive && (
                  <motion.div
                    className="absolute -right-2 -top-2"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <Zap className="w-5 h-5 text-yellow-500 fill-current" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Cross-platform compatibility box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: isDeployingActive ? 1 : 0.6,
          scale: isDeployingActive ? 1.05 : 1
        }}
        transition={{ duration: 0.5 }}
        className={`mt-6 p-4 rounded-lg border-2 ${
          isDeployingActive 
            ? 'bg-gradient-to-r from-blue-100 to-green-100 border-green-400 shadow-lg' 
            : 'bg-white border-gray-300'
        }`}
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <Globe className={`w-6 h-6 ${isDeployingActive ? 'text-green-600' : 'text-gray-600'}`} />
          <h4 className={`font-bold ${
            isDeployingActive ? 'text-green-700 text-lg' : 'text-gray-700 text-base'
          }`}>
            모든 플랫폼에서 동일하게 작동
          </h4>
        </div>
        <div className="flex justify-center gap-4">
          <motion.div
            animate={{ scale: isDeployingActive ? [1, 1.1, 1] : 1 }}
            transition={{ repeat: isDeployingActive ? Infinity : 0, duration: 2 }}
            className="flex flex-col items-center gap-1"
          >
            <div className={`p-2 rounded-lg ${isDeployingActive ? 'bg-blue-100' : 'bg-gray-100'}`}>
              <Laptop className={`w-6 h-6 ${isDeployingActive ? 'text-blue-600' : 'text-gray-500'}`} />
            </div>
            <span className={`text-sm ${isDeployingActive ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
              Windows
            </span>
          </motion.div>
          <motion.div
            animate={{ scale: isDeployingActive ? [1, 1.1, 1] : 1 }}
            transition={{ repeat: isDeployingActive ? Infinity : 0, duration: 2, delay: 0.3 }}
            className="flex flex-col items-center gap-1"
          >
            <div className={`p-2 rounded-lg ${isDeployingActive ? 'bg-gray-100' : 'bg-gray-100'}`}>
              <Apple className={`w-6 h-6 ${isDeployingActive ? 'text-gray-800' : 'text-gray-500'}`} />
            </div>
            <span className={`text-sm ${isDeployingActive ? 'text-gray-800 font-semibold' : 'text-gray-500'}`}>
              macOS
            </span>
          </motion.div>
          <motion.div
            animate={{ scale: isDeployingActive ? [1, 1.1, 1] : 1 }}
            transition={{ repeat: isDeployingActive ? Infinity : 0, duration: 2, delay: 0.6 }}
            className="flex flex-col items-center gap-1"
          >
            <div className={`p-2 rounded-lg ${isDeployingActive ? 'bg-orange-100' : 'bg-gray-100'}`}>
              <Server className={`w-6 h-6 ${isDeployingActive ? 'text-orange-600' : 'text-gray-500'}`} />
            </div>
            <span className={`text-sm ${isDeployingActive ? 'text-orange-600 font-semibold' : 'text-gray-500'}`}>
              Linux
            </span>
          </motion.div>
        </div>
        {isDeployingActive && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-sm text-green-600 font-medium mt-2"
          >
            100% 동일한 결과 보장
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
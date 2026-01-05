'use client'

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Play, RefreshCw, Container, Cpu, Activity,
  CheckCircle, Loader2, Sparkles, Database, Zap, Box,
  TrendingUp, BarChart3, Upload
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface LogEntry {
  type: 'docker' | 'data' | 'train' | 'eval' | 'deploy' | 'system';
  content: string;
}

interface Metric {
  epoch: number;
  loss: number;
  accuracy: number;
  valLoss: number;
  valAccuracy: number;
}

const DockerMLPipelineDemo = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [gpuUsage, setGpuUsage] = useState(0);
  const [containerStatus, setContainerStatus] = useState<'stopped' | 'starting' | 'running' | 'completed'>('stopped');
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const logContainerRef = useRef<HTMLDivElement>(null);

  const stages = [
    { id: 1, name: 'Container Setup', icon: Container, description: 'Docker + CUDA 환경' },
    { id: 2, name: 'Data Pipeline', icon: Database, description: '위성 데이터 전처리' },
    { id: 3, name: 'Model Training', icon: TrendingUp, description: 'Chl-a 예측 학습' },
    { id: 4, name: 'Evaluation', icon: BarChart3, description: 'In-situ 검증' },
    { id: 5, name: 'Deployment', icon: Upload, description: 'API 배포' },
  ];

  // RMSE (mg/m³) and R² for Chl-a prediction
  const trainingMetrics: Metric[] = [
    { epoch: 1, loss: 0.89, accuracy: 0.42, valLoss: 0.92, valAccuracy: 0.38 },
    { epoch: 2, loss: 0.71, accuracy: 0.58, valLoss: 0.75, valAccuracy: 0.54 },
    { epoch: 3, loss: 0.58, accuracy: 0.68, valLoss: 0.62, valAccuracy: 0.65 },
    { epoch: 4, loss: 0.47, accuracy: 0.76, valLoss: 0.51, valAccuracy: 0.73 },
    { epoch: 5, loss: 0.38, accuracy: 0.82, valLoss: 0.43, valAccuracy: 0.79 },
    { epoch: 6, loss: 0.31, accuracy: 0.86, valLoss: 0.36, valAccuracy: 0.83 },
    { epoch: 7, loss: 0.25, accuracy: 0.89, valLoss: 0.30, valAccuracy: 0.86 },
    { epoch: 8, loss: 0.21, accuracy: 0.91, valLoss: 0.26, valAccuracy: 0.88 },
    { epoch: 9, loss: 0.18, accuracy: 0.93, valLoss: 0.23, valAccuracy: 0.89 },
    { epoch: 10, loss: 0.15, accuracy: 0.94, valLoss: 0.21, valAccuracy: 0.90 },
  ];

  const demoScript: { stage: number; logs: LogEntry[]; gpu?: number; container?: 'stopped' | 'starting' | 'running' | 'completed'; epoch?: number; progress?: number }[] = [
    // Stage 1: Container Setup
    { stage: 1, logs: [{ type: 'docker', content: '$ docker pull laba/ocean-ml:cuda12.1-pytorch2.1' }], container: 'starting' },
    { stage: 1, logs: [{ type: 'system', content: 'Pulling ocean-ml image with MODIS/SeaWiFS processing libs...' }] },
    { stage: 1, logs: [{ type: 'docker', content: '$ docker run --gpus all -v ./satellite_data:/data chl-predictor:latest' }] },
    { stage: 1, logs: [{ type: 'system', content: 'Container started: chl-a-prediction-pipeline-2025' }], container: 'running' },
    { stage: 1, logs: [{ type: 'system', content: '✓ NVIDIA Driver: 535.104.05 | CUDA: 12.1 | GPU: RTX 4090 (24GB)' }], gpu: 5 },

    // Stage 2: Data Pipeline - Satellite Data
    { stage: 2, logs: [{ type: 'data', content: '[Copernicus] Downloading OCEANCOLOUR_GLO_BGC_L4 (2020-2024)...' }], gpu: 8 },
    { stage: 2, logs: [{ type: 'data', content: '[DataLoader] Loading multi-spectral satellite data:' }] },
    { stage: 2, logs: [{ type: 'data', content: '  - SST: sea_surface_temperature.nc (1826 days)' }], gpu: 12 },
    { stage: 2, logs: [{ type: 'data', content: '  - PAR: photosynthetically_active_radiation.nc' }] },
    { stage: 2, logs: [{ type: 'data', content: '  - Kd490: diffuse_attenuation_coefficient.nc' }] },
    { stage: 2, logs: [{ type: 'data', content: '  - MLD: mixed_layer_depth.nc (HYCOM reanalysis)' }], gpu: 18 },
    { stage: 2, logs: [{ type: 'data', content: '[Target] Chl-a in-situ: ARGO-BGC floats (4,892 profiles)' }] },
    { stage: 2, logs: [{ type: 'data', content: '[Preprocessing] Cloud masking, gap-filling, log-transform Chl-a...' }], gpu: 22 },
    { stage: 2, logs: [{ type: 'data', content: '[Split] Train: 3,500 | Val: 700 | Test: 692 matchups' }] },
    { stage: 2, logs: [{ type: 'system', content: '✓ Data pipeline ready. Input shape: (N, 4, 64, 64)' }], gpu: 28 },

    // Stage 3: Model Training - Chl-a Prediction
    { stage: 3, logs: [{ type: 'train', content: '[Model] ChlNet-v2 (ResNet34 encoder + Attention, params: 28.3M)' }], gpu: 48 },
    { stage: 3, logs: [{ type: 'train', content: '[Loss] Log-MSE + Gradient Penalty | [Optimizer] AdamW (lr=3e-4)' }] },
    { stage: 3, logs: [{ type: 'train', content: '[Training] 10 epochs, batch=64, mixed precision (FP16)...' }], gpu: 72 },
    { stage: 3, logs: [{ type: 'train', content: 'Epoch 1/10 | RMSE: 0.89 mg/m³ | R²: 0.42 | Val_R²: 0.38' }], epoch: 1, progress: 10, gpu: 85 },
    { stage: 3, logs: [{ type: 'train', content: 'Epoch 2/10 | RMSE: 0.71 mg/m³ | R²: 0.58 | Val_R²: 0.54' }], epoch: 2, progress: 20, gpu: 88 },
    { stage: 3, logs: [{ type: 'train', content: 'Epoch 3/10 | RMSE: 0.58 mg/m³ | R²: 0.68 | Val_R²: 0.65' }], epoch: 3, progress: 30, gpu: 91 },
    { stage: 3, logs: [{ type: 'train', content: 'Epoch 4/10 | RMSE: 0.47 mg/m³ | R²: 0.76 | Val_R²: 0.73' }], epoch: 4, progress: 40, gpu: 89 },
    { stage: 3, logs: [{ type: 'train', content: 'Epoch 5/10 | RMSE: 0.38 mg/m³ | R²: 0.82 | Val_R²: 0.79' }], epoch: 5, progress: 50, gpu: 92 },
    { stage: 3, logs: [{ type: 'train', content: 'Epoch 6/10 | RMSE: 0.31 mg/m³ | R²: 0.86 | Val_R²: 0.83' }], epoch: 6, progress: 60, gpu: 87 },
    { stage: 3, logs: [{ type: 'train', content: 'Epoch 7/10 | RMSE: 0.25 mg/m³ | R²: 0.89 | Val_R²: 0.86' }], epoch: 7, progress: 70, gpu: 90 },
    { stage: 3, logs: [{ type: 'train', content: 'Epoch 8/10 | RMSE: 0.21 mg/m³ | R²: 0.91 | Val_R²: 0.88' }], epoch: 8, progress: 80, gpu: 86 },
    { stage: 3, logs: [{ type: 'train', content: 'Epoch 9/10 | RMSE: 0.18 mg/m³ | R²: 0.93 | Val_R²: 0.89' }], epoch: 9, progress: 90, gpu: 88 },
    { stage: 3, logs: [{ type: 'train', content: 'Epoch 10/10 | RMSE: 0.15 mg/m³ | R²: 0.94 | Val_R²: 0.90' }], epoch: 10, progress: 100, gpu: 82 },
    { stage: 3, logs: [{ type: 'system', content: '✓ Training complete! Best: epoch 10 (Val_R²: 0.90)' }], gpu: 45 },

    // Stage 4: Evaluation - In-situ Validation
    { stage: 4, logs: [{ type: 'eval', content: '[Evaluation] Validating against ARGO-BGC in-situ (692 profiles)...' }], gpu: 55 },
    { stage: 4, logs: [{ type: 'eval', content: '[Metrics] Test RMSE: 0.19 mg/m³ | MAE: 0.14 mg/m³' }] },
    { stage: 4, logs: [{ type: 'eval', content: '[Metrics] R² Score: 0.91 | Pearson r: 0.954 | Bias: -0.02' }], gpu: 35 },
    { stage: 4, logs: [{ type: 'eval', content: '[Regional] Oligotrophic: R²=0.87 | Mesotrophic: R²=0.93 | Eutrophic: R²=0.89' }] },
    { stage: 4, logs: [{ type: 'eval', content: '[Visualization] Generating scatter plots, spatial maps...' }] },
    { stage: 4, logs: [{ type: 'system', content: '✓ Saved: validation_report.pdf, chl_prediction_map.png' }], gpu: 20 },

    // Stage 5: Deployment
    { stage: 5, logs: [{ type: 'deploy', content: '[Export] Converting to ONNX + TensorRT optimization...' }], gpu: 30 },
    { stage: 5, logs: [{ type: 'deploy', content: '[Export] Model size: 112 MB → INT8 quantized: 28 MB' }] },
    { stage: 5, logs: [{ type: 'deploy', content: '[Inference] Latency: 12ms/image (batch=1, RTX 4090)' }] },
    { stage: 5, logs: [{ type: 'docker', content: '$ docker build -t chl-predictor-api:v1.0 .' }], gpu: 15 },
    { stage: 5, logs: [{ type: 'docker', content: '$ docker push registry.laba.ai/chl-predictor:v1.0' }] },
    { stage: 5, logs: [{ type: 'system', content: '✓ API deployed! HAB early warning system ready.' }], gpu: 5, container: 'completed' },
  ];

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const startDemo = () => {
    setIsRunning(true);
    setIsComplete(false);
    setCurrentStage(0);
    setLogs([]);
    setMetrics([]);
    setGpuUsage(0);
    setContainerStatus('stopped');
    setCurrentEpoch(0);
    setTrainingProgress(0);

    let stepIndex = 0;

    const runStep = () => {
      if (stepIndex < demoScript.length) {
        const step = demoScript[stepIndex];

        setCurrentStage(step.stage);

        if (step.gpu !== undefined) setGpuUsage(step.gpu);
        if (step.container) setContainerStatus(step.container);
        if (step.epoch !== undefined) {
          setCurrentEpoch(step.epoch);
          setMetrics(trainingMetrics.slice(0, step.epoch));
        }
        if (step.progress !== undefined) setTrainingProgress(step.progress);

        step.logs.forEach((log, i) => {
          setTimeout(() => {
            setLogs(prev => [...prev, log]);
          }, i * 50);
        });

        stepIndex++;
        const delay = step.stage === 3 && step.epoch ? 400 : 600;
        setTimeout(runStep, delay);
      } else {
        setIsRunning(false);
        setIsComplete(true);
      }
    };

    setTimeout(runStep, 500);
  };

  const resetDemo = () => {
    setIsRunning(false);
    setIsComplete(false);
    setCurrentStage(0);
    setLogs([]);
    setMetrics([]);
    setGpuUsage(0);
    setContainerStatus('stopped');
    setCurrentEpoch(0);
    setTrainingProgress(0);
  };

  const getLogColor = (type: string) => {
    switch (type) {
      case 'docker': return 'text-cyan-400';
      case 'data': return 'text-yellow-400';
      case 'train': return 'text-green-400';
      case 'eval': return 'text-purple-400';
      case 'deploy': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  const maxLoss = Math.max(...trainingMetrics.map(m => m.loss));

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
            <Container className="text-white" size={28} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Chlorophyll-a 예측 파이프라인
          </h1>
        </div>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          위성 데이터로 해양 생산성(Chl-a)을 예측하는 딥러닝 모델의 학습부터 배포까지 완전 자동화
        </p>
        <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
          <Badge variant="outline" className="text-cyan-600 border-cyan-300">
            <Container className="mr-1 h-3 w-3" /> Docker + CUDA
          </Badge>
          <Badge variant="outline" className="text-green-600 border-green-300">
            <Cpu className="mr-1 h-3 w-3" /> RTX 4090 24GB
          </Badge>
          <Badge variant="outline" className="text-emerald-600 border-emerald-300">
            <Database className="mr-1 h-3 w-3" /> Copernicus + ARGO
          </Badge>
        </div>
      </div>

      {/* Pipeline Stages */}
      <Card className="border-2 border-cyan-200">
        <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Sparkles className="text-cyan-500" />
              ML Pipeline Stages
            </span>
            {isComplete && (
              <Badge className="bg-green-500 text-white">
                <CheckCircle className="mr-1 h-3 w-3" />
                Pipeline Complete
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <Progress value={(currentStage / stages.length) * 100} className="h-2 mb-4" />
          <div className="grid grid-cols-5 gap-2">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              const isActive = index + 1 === currentStage && isRunning;
              const isCompleted = index + 1 < currentStage || isComplete;

              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`
                    flex flex-col items-center p-3 rounded-lg transition-all text-center
                    ${isActive ? 'bg-cyan-100 border-cyan-400 border-2 shadow-md' :
                      isCompleted ? 'bg-green-50 text-green-700' :
                      'bg-gray-50 text-gray-400'}
                  `}
                >
                  <Icon size={20} className={isActive ? 'animate-pulse' : ''} />
                  <span className="text-xs font-medium mt-1">{stage.name}</span>
                  <span className="text-[10px] opacity-70">{stage.description}</span>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Control Button */}
      <Card>
        <CardContent className="pt-6">
          <Button
            onClick={isComplete ? resetDemo : startDemo}
            disabled={isRunning}
            className="w-full h-14 text-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
            size="lg"
          >
            {isComplete ? (
              <>
                <RefreshCw className="mr-2" />
                Restart Pipeline
              </>
            ) : isRunning ? (
              <>
                <Loader2 className="mr-2 animate-spin" />
                Pipeline Running...
              </>
            ) : (
              <>
                <Play className="mr-2" />
                Start ML Pipeline Demo
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* GPU & Container Status */}
        <Card className="border-2 border-green-200">
          <CardHeader className="bg-green-50">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Cpu className="text-green-600" size={18} />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            {/* Container Status */}
            <div className="p-3 rounded-lg bg-gray-50 border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-600">Container</span>
                <Badge className={
                  containerStatus === 'running' ? 'bg-green-500' :
                  containerStatus === 'starting' ? 'bg-yellow-500' :
                  containerStatus === 'completed' ? 'bg-blue-500' :
                  'bg-gray-400'
                }>
                  {containerStatus === 'running' ? '● Running' :
                   containerStatus === 'starting' ? '◐ Starting' :
                   containerStatus === 'completed' ? '✓ Completed' :
                   '○ Stopped'}
                </Badge>
              </div>
              <div className="text-xs text-gray-500 font-mono truncate">
                {containerStatus !== 'stopped' ? 'ml-pipeline-ocean-sst-2025' : '-'}
              </div>
            </div>

            {/* GPU Usage */}
            <div className="p-3 rounded-lg bg-gray-50 border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-600">GPU Usage</span>
                <span className="text-sm font-bold text-green-600">{gpuUsage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  className="h-3 rounded-full bg-gradient-to-r from-green-400 to-green-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${gpuUsage}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="flex justify-between mt-1 text-[10px] text-gray-500">
                <span>VRAM: {Math.round(gpuUsage * 0.24)} / 24 GB</span>
                <span>RTX 4090</span>
              </div>
            </div>

            {/* Training Progress */}
            {currentStage === 3 && (
              <div className="p-3 rounded-lg bg-cyan-50 border border-cyan-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-cyan-700">Training</span>
                  <span className="text-sm font-bold text-cyan-600">Epoch {currentEpoch}/10</span>
                </div>
                <Progress value={trainingProgress} className="h-2" />
              </div>
            )}

            {/* Metrics Summary */}
            {metrics.length > 0 && (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                <div className="text-xs font-medium text-emerald-700 mb-2">Latest Metrics</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-500">RMSE:</span>
                    <span className="ml-1 font-mono text-emerald-600">{metrics[metrics.length - 1]?.loss.toFixed(2)} mg/m³</span>
                  </div>
                  <div>
                    <span className="text-gray-500">R²:</span>
                    <span className="ml-1 font-mono text-emerald-600">{metrics[metrics.length - 1]?.accuracy.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Training Chart & Logs */}
        <Card className="lg:col-span-2 border-2 border-gray-800">
          <CardHeader className="bg-gray-900 text-white rounded-t-lg">
            <CardTitle className="flex items-center justify-between text-sm font-mono">
              <span className="flex items-center gap-2">
                <Activity size={16} />
                Pipeline Logs
              </span>
              {metrics.length > 0 && (
                <span className="text-emerald-400 text-xs">
                  Best Val_R²: {Math.max(...metrics.map(m => m.valAccuracy)).toFixed(2)}
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {/* Mini Chart */}
            {metrics.length > 0 && (
              <div className="bg-gray-800 p-3 border-b border-gray-700">
                <div className="flex items-end gap-1 h-16">
                  {metrics.map((m, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${(1 - m.loss / maxLoss) * 100}%` }}
                      className="flex-1 bg-gradient-to-t from-green-500 to-green-300 rounded-t"
                      title={`Epoch ${m.epoch}: ${(m.accuracy * 100).toFixed(0)}%`}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-1 text-[10px] text-gray-500">
                  <span>Epoch 1</span>
                  <span className="text-green-400">Accuracy ↑</span>
                  <span>Epoch {metrics.length}</span>
                </div>
              </div>
            )}

            {/* Logs */}
            <div
              ref={logContainerRef}
              className="h-[250px] bg-gray-900 font-mono text-xs p-4 overflow-y-auto rounded-b-lg"
            >
              <AnimatePresence>
                {logs.map((log, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`mb-1 ${getLogColor(log.type)}`}
                  >
                    {log.content}
                  </motion.div>
                ))}
              </AnimatePresence>
              {logs.length === 0 && (
                <span className="text-gray-500">Pipeline not started...</span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Summary */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="pt-6 text-center">
              <BarChart3 className="mx-auto text-emerald-600 mb-2" size={32} />
              <h4 className="font-semibold text-emerald-800">R² = 0.91</h4>
              <p className="text-sm text-emerald-600">Chl-a 예측 정확도</p>
            </CardContent>
          </Card>
          <Card className="bg-cyan-50 border-cyan-200">
            <CardContent className="pt-6 text-center">
              <Container className="mx-auto text-cyan-600 mb-2" size={32} />
              <h4 className="font-semibold text-cyan-800">100% Reproducible</h4>
              <p className="text-sm text-cyan-600">Docker 기반 재현성</p>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6 text-center">
              <Zap className="mx-auto text-green-600 mb-2" size={32} />
              <h4 className="font-semibold text-green-800">12ms Inference</h4>
              <p className="text-sm text-green-600">TensorRT 최적화</p>
            </CardContent>
          </Card>
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="pt-6 text-center">
              <Box className="mx-auto text-orange-600 mb-2" size={32} />
              <h4 className="font-semibold text-orange-800">HAB 조기경보</h4>
              <p className="text-sm text-orange-600">적조 예측 시스템</p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default DockerMLPipelineDemo;

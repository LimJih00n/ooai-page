'use client'

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Play, RefreshCw, Brain, FolderTree, Terminal, FileSearch,
  Globe, Database, CheckCircle, Loader2, Sparkles,
  ListTodo, MessageSquare, Wrench, BookOpen, ChevronRight,
  Cpu, Zap, Target, Settings
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface Tool {
  name: string;
  icon: React.ElementType;
  activeBg: string;
  activeBorder: string;
  activeText: string;
  activeTextDark: string;
}

interface LogEntry {
  type: 'system' | 'tool' | 'thought' | 'action' | 'result' | 'user';
  content: string;
  tool?: string;
}

interface TodoItem {
  task: string;
  status: 'pending' | 'in_progress' | 'completed';
}

const AgenticAIDemo = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [contextFiles, setContextFiles] = useState<string[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);

  const tools: Tool[] = [
    { name: 'Read', icon: FileSearch, activeBg: 'bg-blue-100', activeBorder: 'border-blue-400', activeText: 'text-blue-600', activeTextDark: 'text-blue-700' },
    { name: 'Bash', icon: Terminal, activeBg: 'bg-gray-100', activeBorder: 'border-gray-400', activeText: 'text-gray-600', activeTextDark: 'text-gray-700' },
    { name: 'Grep', icon: FileSearch, activeBg: 'bg-green-100', activeBorder: 'border-green-400', activeText: 'text-green-600', activeTextDark: 'text-green-700' },
    { name: 'WebSearch', icon: Globe, activeBg: 'bg-purple-100', activeBorder: 'border-purple-400', activeText: 'text-purple-600', activeTextDark: 'text-purple-700' },
    { name: 'TodoWrite', icon: ListTodo, activeBg: 'bg-orange-100', activeBorder: 'border-orange-400', activeText: 'text-orange-600', activeTextDark: 'text-orange-700' },
    { name: 'MCP', icon: Database, activeBg: 'bg-indigo-100', activeBorder: 'border-indigo-400', activeText: 'text-indigo-600', activeTextDark: 'text-indigo-700' },
  ];

  const phases = [
    { id: 1, name: '컨텍스트 분석', description: '프로젝트 환경 파악' },
    { id: 2, name: '태스크 계획', description: '작업 분해 및 우선순위' },
    { id: 3, name: '도구 오케스트레이션', description: '다중 도구 병렬 실행' },
    { id: 4, name: '실행 및 검증', description: '결과 확인 및 피드백' },
  ];

  const demoScenario: { phase: number; entries: LogEntry[]; tool?: string; todos?: TodoItem[]; files?: string[] }[] = [
    // Phase 1: Context Analysis
    { phase: 1, entries: [{ type: 'user', content: '"인도양 SST 트렌드 분석하고 보고서 작성해줘"' }] },
    { phase: 1, entries: [{ type: 'thought', content: '프로젝트 컨텍스트를 먼저 파악해야 합니다. CLAUDE.md와 프로젝트 구조를 확인하겠습니다.' }] },
    { phase: 1, entries: [{ type: 'tool', content: 'CLAUDE.md 읽는 중...', tool: 'Read' }], tool: 'Read', files: ['CLAUDE.md'] },
    { phase: 1, entries: [{ type: 'result', content: '✓ 시각화 규칙: 영어 폰트, 국경선 없음, 위경도 2° 여유' }] },
    { phase: 1, entries: [{ type: 'tool', content: '프로젝트 구조 탐색 중...', tool: 'Glob' }], tool: 'Read', files: ['01_data/', '02_src/', '03_notebooks/'] },
    { phase: 1, entries: [{ type: 'result', content: '✓ 데이터: 01_data/indian_ocean_sst_2015-2025.nc (2.3GB)' }] },

    // Phase 2: Task Planning
    { phase: 2, entries: [{ type: 'thought', content: '복잡한 작업이므로 단계별로 분해하여 TodoWrite로 계획을 수립합니다.' }] },
    { phase: 2, entries: [{ type: 'tool', content: '태스크 계획 생성 중...', tool: 'TodoWrite' }], tool: 'TodoWrite',
      todos: [
        { task: 'NetCDF 데이터 로드 및 전처리', status: 'pending' },
        { task: 'SST 시계열 트렌드 분석', status: 'pending' },
        { task: '공간 분포 시각화', status: 'pending' },
        { task: '분석 보고서 작성', status: 'pending' },
      ]
    },
    { phase: 2, entries: [{ type: 'system', content: '4개 태스크 생성 완료. 순차적으로 진행합니다.' }] },

    // Phase 3: Tool Orchestration
    { phase: 3, entries: [{ type: 'action', content: '첫 번째 태스크 시작: 데이터 로드 및 전처리' }],
      todos: [
        { task: 'NetCDF 데이터 로드 및 전처리', status: 'in_progress' },
        { task: 'SST 시계열 트렌드 분석', status: 'pending' },
        { task: '공간 분포 시각화', status: 'pending' },
        { task: '분석 보고서 작성', status: 'pending' },
      ]
    },
    { phase: 3, entries: [{ type: 'tool', content: 'xarray로 청크 단위 데이터 로드...', tool: 'Bash' }], tool: 'Bash' },
    { phase: 3, entries: [{ type: 'result', content: '✓ 데이터 로드 완료: 3,652 time steps, 720x1440 grid' }],
      todos: [
        { task: 'NetCDF 데이터 로드 및 전처리', status: 'completed' },
        { task: 'SST 시계열 트렌드 분석', status: 'in_progress' },
        { task: '공간 분포 시각화', status: 'pending' },
        { task: '분석 보고서 작성', status: 'pending' },
      ]
    },
    { phase: 3, entries: [{ type: 'thought', content: '트렌드 분석과 시각화는 독립적이므로 병렬로 실행합니다.' }] },
    { phase: 3, entries: [{ type: 'tool', content: '[병렬] 선형 회귀 트렌드 계산...', tool: 'Bash' }], tool: 'Bash' },
    { phase: 3, entries: [{ type: 'tool', content: '[병렬] 최신 참고문헌 검색...', tool: 'WebSearch' }], tool: 'WebSearch' },
    { phase: 3, entries: [{ type: 'result', content: '✓ 트렌드: +0.18°C/decade (p<0.01), IOD 영향 확인' }] },
    { phase: 3, entries: [{ type: 'result', content: '✓ 참고문헌 5편 수집 (Roxy et al. 2024, Wang et al. 2023...)' }],
      todos: [
        { task: 'NetCDF 데이터 로드 및 전처리', status: 'completed' },
        { task: 'SST 시계열 트렌드 분석', status: 'completed' },
        { task: '공간 분포 시각화', status: 'in_progress' },
        { task: '분석 보고서 작성', status: 'pending' },
      ]
    },
    { phase: 3, entries: [{ type: 'tool', content: 'MCP filesystem으로 플롯 저장...', tool: 'MCP' }], tool: 'MCP' },
    { phase: 3, entries: [{ type: 'result', content: '✓ 04_results/fig01_sst_trend/sst_trend_map.png 저장됨' }],
      todos: [
        { task: 'NetCDF 데이터 로드 및 전처리', status: 'completed' },
        { task: 'SST 시계열 트렌드 분석', status: 'completed' },
        { task: '공간 분포 시각화', status: 'completed' },
        { task: '분석 보고서 작성', status: 'in_progress' },
      ]
    },

    // Phase 4: Execution & Verification
    { phase: 4, entries: [{ type: 'action', content: '분석 결과를 바탕으로 보고서 초안 작성' }] },
    { phase: 4, entries: [{ type: 'tool', content: '마크다운 보고서 생성 중...', tool: 'Bash' }], tool: 'Bash' },
    { phase: 4, entries: [{ type: 'result', content: '✓ 05_papers/indian_ocean_sst_analysis.md 생성 (2,450 words)' }] },
    { phase: 4, entries: [{ type: 'tool', content: '일일 작업 요약 생성...', tool: 'TodoWrite' }], tool: 'TodoWrite',
      todos: [
        { task: 'NetCDF 데이터 로드 및 전처리', status: 'completed' },
        { task: 'SST 시계열 트렌드 분석', status: 'completed' },
        { task: '공간 분포 시각화', status: 'completed' },
        { task: '분석 보고서 작성', status: 'completed' },
      ]
    },
    { phase: 4, entries: [{ type: 'system', content: '모든 태스크 완료! README_20250105_shlim.md에 작업 기록 저장됨.' }] },
  ];

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const startDemo = () => {
    setIsRunning(true);
    setIsComplete(false);
    setCurrentPhase(0);
    setLogs([]);
    setActiveTool(null);
    setTodos([]);
    setContextFiles([]);

    let stepIndex = 0;

    const runStep = () => {
      if (stepIndex < demoScenario.length) {
        const step = demoScenario[stepIndex];

        setCurrentPhase(step.phase);

        if (step.tool) {
          setActiveTool(step.tool);
          setTimeout(() => setActiveTool(null), 800);
        }

        if (step.todos) {
          setTodos(step.todos);
        }

        if (step.files) {
          setContextFiles(prev => [...prev, ...step.files!]);
        }

        step.entries.forEach((entry, i) => {
          setTimeout(() => {
            setLogs(prev => [...prev, entry]);
          }, i * 100);
        });

        stepIndex++;
        setTimeout(runStep, 1200);
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
    setCurrentPhase(0);
    setLogs([]);
    setActiveTool(null);
    setTodos([]);
    setContextFiles([]);
  };

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'user': return <MessageSquare size={14} className="text-blue-500" />;
      case 'thought': return <Brain size={14} className="text-purple-500" />;
      case 'tool': return <Wrench size={14} className="text-orange-500" />;
      case 'action': return <Zap size={14} className="text-yellow-500" />;
      case 'result': return <CheckCircle size={14} className="text-green-500" />;
      case 'system': return <Settings size={14} className="text-gray-500" />;
      default: return <ChevronRight size={14} />;
    }
  };

  const getLogStyle = (type: string) => {
    switch (type) {
      case 'user': return 'text-blue-400 bg-blue-950/50';
      case 'thought': return 'text-purple-400 italic';
      case 'tool': return 'text-orange-400';
      case 'action': return 'text-yellow-400 font-medium';
      case 'result': return 'text-green-400';
      case 'system': return 'text-gray-400';
      default: return 'text-gray-300';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <Brain className="text-white" size={28} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Agentic AI Workspace
          </h1>
        </div>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          프로젝트 컨텍스트를 이해하고, 복잡한 연구 작업을 자율적으로 계획하고 실행하는 AI 에이전트
        </p>
        <div className="flex items-center justify-center gap-2 mt-4">
          <Badge variant="outline" className="text-purple-600 border-purple-300">
            <Cpu className="mr-1 h-3 w-3" /> Claude Opus 4.5
          </Badge>
          <Badge variant="outline" className="text-indigo-600 border-indigo-300">
            <Target className="mr-1 h-3 w-3" /> Multi-Tool Orchestration
          </Badge>
        </div>
      </div>

      {/* Phase Progress */}
      <Card className="border-2 border-purple-200">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Sparkles className="text-purple-500" />
              Agentic Workflow
            </span>
            {isComplete && (
              <Badge className="bg-green-500 text-white">
                <CheckCircle className="mr-1 h-3 w-3" />
                Complete
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <Progress value={(currentPhase / phases.length) * 100} className="h-2 mb-4" />
          <div className="grid grid-cols-4 gap-2">
            {phases.map((phase, index) => {
              const isActive = index + 1 === currentPhase && isRunning;
              const isCompleted = index + 1 < currentPhase || isComplete;

              return (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`
                    flex flex-col items-center p-3 rounded-lg transition-all text-center
                    ${isActive ? 'bg-purple-100 border-purple-300 border-2 shadow-md' :
                      isCompleted ? 'bg-green-50 text-green-700' :
                      'bg-gray-50 text-gray-400'}
                  `}
                >
                  <span className="text-lg font-bold">{phase.id}</span>
                  <span className="text-xs font-medium mt-1">{phase.name}</span>
                  <span className="text-[10px] mt-0.5 opacity-70">{phase.description}</span>
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
            className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            size="lg"
          >
            {isComplete ? (
              <>
                <RefreshCw className="mr-2" />
                Restart Demo
              </>
            ) : isRunning ? (
              <>
                <Loader2 className="mr-2 animate-spin" />
                Agent Working...
              </>
            ) : (
              <>
                <Play className="mr-2" />
                Start Agentic AI Demo
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tool Panel */}
        <Card className="border-2 border-indigo-200">
          <CardHeader className="bg-indigo-50">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Wrench className="text-indigo-600" size={18} />
              Available Tools
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-2 gap-2">
              {tools.map((tool) => {
                const Icon = tool.icon;
                const isActive = activeTool === tool.name;

                return (
                  <motion.div
                    key={tool.name}
                    animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                    className={`
                      flex items-center gap-2 p-2 rounded-lg border transition-all
                      ${isActive
                        ? `${tool.activeBg} ${tool.activeBorder} shadow-md`
                        : 'bg-gray-50 border-gray-200'}
                    `}
                  >
                    <Icon size={16} className={isActive ? tool.activeText : 'text-gray-500'} />
                    <span className={`text-xs font-medium ${isActive ? tool.activeTextDark : 'text-gray-600'}`}>
                      {tool.name}
                    </span>
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto"
                      >
                        <Loader2 size={12} className="animate-spin text-indigo-600" />
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Context Files */}
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-2">
                <FolderTree size={14} />
                Context Loaded
              </div>
              <div className="space-y-1">
                {contextFiles.length === 0 ? (
                  <span className="text-xs text-gray-400">No files loaded yet...</span>
                ) : (
                  contextFiles.map((file, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded"
                    >
                      {file}
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Agent Log */}
        <Card className="lg:col-span-2 border-2 border-gray-800">
          <CardHeader className="bg-gray-900 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-sm font-mono">
              <Brain size={16} />
              Agent Activity Log
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div
              ref={logContainerRef}
              className="h-[300px] bg-gray-900 font-mono text-xs p-4 overflow-y-auto rounded-b-lg"
            >
              <AnimatePresence>
                {logs.map((log, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex items-start gap-2 mb-2 ${getLogStyle(log.type)} ${log.type === 'user' ? 'p-2 rounded' : ''}`}
                  >
                    <span className="mt-0.5">{getLogIcon(log.type)}</span>
                    <span>{log.content}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
              {logs.length === 0 && (
                <span className="text-gray-500">Waiting for task...</span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Todo List */}
      {todos.length > 0 && (
        <Card className="border-2 border-orange-200">
          <CardHeader className="bg-orange-50">
            <CardTitle className="flex items-center gap-2 text-sm">
              <ListTodo className="text-orange-600" size={18} />
              Task Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {todos.map((todo, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`
                    p-3 rounded-lg border-2 transition-all
                    ${todo.status === 'completed' ? 'bg-green-50 border-green-300' :
                      todo.status === 'in_progress' ? 'bg-orange-50 border-orange-300' :
                      'bg-gray-50 border-gray-200'}
                  `}
                >
                  <div className="flex items-center gap-2">
                    {todo.status === 'completed' ? (
                      <CheckCircle size={16} className="text-green-500" />
                    ) : todo.status === 'in_progress' ? (
                      <Loader2 size={16} className="text-orange-500 animate-spin" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                    )}
                    <span className={`text-sm ${todo.status === 'completed' ? 'text-green-700' : 'text-gray-700'}`}>
                      {todo.task}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Capabilities Summary */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="pt-6 text-center">
              <BookOpen className="mx-auto text-purple-600 mb-2" size={32} />
              <h4 className="font-semibold text-purple-800">Context Aware</h4>
              <p className="text-sm text-purple-600">CLAUDE.md 기반 프로젝트 이해</p>
            </CardContent>
          </Card>
          <Card className="bg-indigo-50 border-indigo-200">
            <CardContent className="pt-6 text-center">
              <Wrench className="mx-auto text-indigo-600 mb-2" size={32} />
              <h4 className="font-semibold text-indigo-800">Multi-Tool</h4>
              <p className="text-sm text-indigo-600">6+ 도구 병렬 오케스트레이션</p>
            </CardContent>
          </Card>
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="pt-6 text-center">
              <ListTodo className="mx-auto text-orange-600 mb-2" size={32} />
              <h4 className="font-semibold text-orange-800">Task Planning</h4>
              <p className="text-sm text-orange-600">복잡한 작업 자동 분해</p>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6 text-center">
              <Target className="mx-auto text-green-600 mb-2" size={32} />
              <h4 className="font-semibold text-green-800">Session Memory</h4>
              <p className="text-sm text-green-600">일일 작업 기록 및 복원</p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default AgenticAIDemo;

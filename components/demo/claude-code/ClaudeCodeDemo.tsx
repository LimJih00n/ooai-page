'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play, RefreshCw, Terminal, FileCode, Loader2, CheckCircle, Sparkles, FolderTree, GitBranch } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const ClaudeCodeDemo = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [generatedCode, setGeneratedCode] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const steps = [
    { id: 1, name: 'Context Analysis', icon: FolderTree, description: 'Analyzing project structure' },
    { id: 2, name: 'Code Generation', icon: FileCode, description: 'Writing Python script' },
    { id: 3, name: 'Code Review', icon: GitBranch, description: 'Reviewing and optimizing' },
    { id: 4, name: 'Execution', icon: Terminal, description: 'Running the script' },
  ];

  const terminalLines = [
    '$ claude "Create a script to analyze SST data from NetCDF files"',
    '',
    'Claude Code is analyzing your request...',
    '',
    'Reading project context:',
    '  - Found: data/sst_2025.nc (45MB)',
    '  - Found: requirements.txt',
    '  - Found: existing analysis scripts in src/',
    '',
    'Generating Python script...',
    '',
    'Created: src/sst_analysis.py',
    '',
    'Running code review...',
    '  - Checking imports: OK',
    '  - Checking data paths: OK',
    '  - Optimizing memory usage: Applied chunking',
    '',
    'Executing script...',
    '',
    '[INFO] Loading SST data from data/sst_2025.nc',
    '[INFO] Processing 365 time steps...',
    '[INFO] Mean SST: 23.45 C (std: 2.31)',
    '[INFO] Trend: +0.12 C/decade',
    '[INFO] Saved plot to: output/sst_trend_2025.png',
    '',
    'Task completed successfully!',
  ];

  const finalCode = `import xarray as xr
import matplotlib.pyplot as plt
import numpy as np

# Load SST data with chunking for memory efficiency
ds = xr.open_dataset('data/sst_2025.nc', chunks={'time': 30})

# Calculate statistics
mean_sst = ds['sst'].mean(dim=['lat', 'lon']).compute()
std_sst = ds['sst'].std(dim=['lat', 'lon']).compute()

# Calculate trend using linear regression
time_numeric = np.arange(len(mean_sst))
coeffs = np.polyfit(time_numeric, mean_sst.values, 1)
trend_per_decade = coeffs[0] * 365 * 10  # Convert to per decade

print(f"[INFO] Mean SST: {mean_sst.mean().values:.2f} C")
print(f"[INFO] Trend: {trend_per_decade:+.2f} C/decade")

# Create visualization
fig, ax = plt.subplots(figsize=(12, 6))
ax.plot(mean_sst.time, mean_sst, 'b-', alpha=0.7, label='Daily SST')
ax.plot(mean_sst.time, np.polyval(coeffs, time_numeric),
        'r--', linewidth=2, label=f'Trend: {trend_per_decade:+.2f} C/decade')
ax.set_xlabel('Date')
ax.set_ylabel('SST (C)')
ax.set_title('Sea Surface Temperature Analysis - 2025')
ax.legend()
ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.savefig('output/sst_trend_2025.png', dpi=150)
print("[INFO] Saved plot to: output/sst_trend_2025.png")`;

  const startDemo = () => {
    setIsRunning(true);
    setIsComplete(false);
    setCurrentStep(0);
    setTerminalOutput([]);
    setGeneratedCode('');

    let lineIndex = 0;
    let codeIndex = 0;

    const terminalInterval = setInterval(() => {
      if (lineIndex < terminalLines.length) {
        setTerminalOutput(prev => [...prev, terminalLines[lineIndex]]);
        lineIndex++;

        // Update steps based on terminal progress
        if (lineIndex === 3) setCurrentStep(1);
        if (lineIndex === 10) setCurrentStep(2);
        if (lineIndex === 13) setCurrentStep(3);
        if (lineIndex === 18) setCurrentStep(4);
      } else {
        clearInterval(terminalInterval);
      }
    }, 150);

    // Start code generation after step 2
    setTimeout(() => {
      const codeInterval = setInterval(() => {
        if (codeIndex < finalCode.length) {
          const charsToAdd = Math.min(10, finalCode.length - codeIndex);
          setGeneratedCode(finalCode.substring(0, codeIndex + charsToAdd));
          codeIndex += charsToAdd;
        } else {
          clearInterval(codeInterval);
          setTimeout(() => {
            setIsRunning(false);
            setIsComplete(true);
          }, 500);
        }
      }, 15);
    }, 1500);
  };

  const resetDemo = () => {
    setIsRunning(false);
    setIsComplete(false);
    setCurrentStep(0);
    setTerminalOutput([]);
    setGeneratedCode('');
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Claude Code Demo
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          AI coding assistant that understands your project context and generates production-ready code
        </p>
      </div>

      {/* Progress Steps */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Sparkles className="text-purple-500" />
              Workflow Progress
            </span>
            {isComplete && (
              <Badge className="bg-green-500 text-white">
                <CheckCircle className="mr-1 h-3 w-3" />
                Complete
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={(currentStep / steps.length) * 100} className="h-2 mb-4" />
          <div className="grid grid-cols-4 gap-2">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index + 1 === currentStep && isRunning;
              const isCompleted = index + 1 < currentStep || isComplete;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`
                    flex flex-col items-center p-3 rounded-lg transition-all text-center
                    ${isActive ? 'bg-purple-100 border-purple-300 border' :
                      isCompleted ? 'bg-green-50 text-green-700' :
                      'bg-gray-50 text-gray-400'}
                  `}
                >
                  <Icon size={20} className={isActive ? 'animate-pulse' : ''} />
                  <span className="text-xs font-medium mt-1">{step.name}</span>
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
            className="w-full h-14 text-lg"
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
                Claude Code is working...
              </>
            ) : (
              <>
                <Play className="mr-2" />
                Start Claude Code Demo
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Terminal Output */}
        <Card className="border-2 border-gray-800">
          <CardHeader className="bg-gray-900 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-sm font-mono">
              <Terminal size={16} />
              Terminal
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[400px] bg-gray-900 text-green-400 font-mono text-xs p-4 overflow-y-auto rounded-b-lg">
              <AnimatePresence>
                {terminalOutput.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="whitespace-pre-wrap"
                  >
                    {line}
                  </motion.div>
                ))}
              </AnimatePresence>
              {terminalOutput.length === 0 && (
                <span className="text-gray-500">Waiting for command...</span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Generated Code */}
        <Card className="border-2 border-purple-200">
          <CardHeader className="bg-purple-50">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FileCode className="text-purple-600" />
                Generated Code
              </span>
              {generatedCode && (
                <Badge variant="outline" className="text-purple-600">
                  src/sst_analysis.py
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <pre className="h-[400px] bg-gray-50 text-gray-800 font-mono text-xs p-4 overflow-auto rounded-b-lg">
              <code>{generatedCode || '// Generated code will appear here...'}</code>
            </pre>
          </CardContent>
        </Card>
      </div>

      {/* Features */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="pt-6 text-center">
              <FolderTree className="mx-auto text-purple-600 mb-2" size={32} />
              <h4 className="font-semibold text-purple-800">Context Aware</h4>
              <p className="text-sm text-purple-600">Understands your project structure</p>
            </CardContent>
          </Card>
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6 text-center">
              <FileCode className="mx-auto text-blue-600 mb-2" size={32} />
              <h4 className="font-semibold text-blue-800">Production Ready</h4>
              <p className="text-sm text-blue-600">Generates optimized, clean code</p>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6 text-center">
              <Terminal className="mx-auto text-green-600 mb-2" size={32} />
              <h4 className="font-semibold text-green-800">Auto Execution</h4>
              <p className="text-sm text-green-600">Runs and validates code automatically</p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default ClaudeCodeDemo;

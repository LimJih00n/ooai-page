'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play, RefreshCw, Server, Database, FileSearch, Globe, Loader2, CheckCircle, Sparkles, Plug, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const MCPServerDemo = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [connectedTools, setConnectedTools] = useState<string[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const mcpTools = [
    { id: 'filesystem', name: 'Filesystem', icon: FileSearch, description: 'Read/write project files', bgColor: 'bg-blue-50', borderColor: 'border-blue-200', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
    { id: 'database', name: 'PostgreSQL', icon: Database, description: 'Query research database', bgColor: 'bg-green-50', borderColor: 'border-green-200', iconBg: 'bg-green-100', iconColor: 'text-green-600' },
    { id: 'web', name: 'Web Fetch', icon: Globe, description: 'Fetch external data APIs', bgColor: 'bg-purple-50', borderColor: 'border-purple-200', iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
    { id: 'custom', name: 'Ocean Data API', icon: Server, description: 'Custom Copernicus connector', bgColor: 'bg-indigo-50', borderColor: 'border-indigo-200', iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600' },
  ];

  const steps = [
    { id: 1, name: 'Initialize MCP', description: 'Starting protocol server' },
    { id: 2, name: 'Connect Tools', description: 'Registering available tools' },
    { id: 3, name: 'AI Request', description: 'Processing user query' },
    { id: 4, name: 'Tool Execution', description: 'Running connected tools' },
  ];

  const logMessages = [
    '[MCP] Initializing Model Context Protocol server...',
    '[MCP] Server started on localhost:3001',
    '',
    '[MCP] Registering tools...',
    '[Tool] filesystem: Connected (read, write, list)',
    '[Tool] database: Connected (query, insert)',
    '[Tool] web_fetch: Connected (get, post)',
    '[Tool] ocean_data_api: Connected (get_sst, get_chlorophyll)',
    '',
    '[MCP] All tools registered successfully',
    '[MCP] Waiting for AI requests...',
    '',
    '[AI] Request: "Fetch latest SST data and save analysis"',
    '[MCP] Routing to appropriate tools...',
    '',
    '[Tool:ocean_data_api] Fetching SST data from Copernicus...',
    '[Tool:ocean_data_api] Downloaded: sst_20250105.nc (12.3 MB)',
    '',
    '[Tool:filesystem] Writing to data/sst_20250105.nc',
    '[Tool:filesystem] File saved successfully',
    '',
    '[Tool:database] Inserting metadata record...',
    '[Tool:database] Record ID: 2847 created',
    '',
    '[MCP] Task completed: 4 tools executed, 0 errors',
    '[AI] Response: Data fetched and saved successfully!',
  ];

  const startDemo = () => {
    setIsRunning(true);
    setIsComplete(false);
    setCurrentStep(0);
    setConnectedTools([]);
    setLogs([]);

    let logIndex = 0;

    const logInterval = setInterval(() => {
      if (logIndex < logMessages.length) {
        setLogs(prev => [...prev, logMessages[logIndex]]);
        logIndex++;

        // Update steps and connect tools
        if (logIndex === 2) setCurrentStep(1);
        if (logIndex === 4) {
          setCurrentStep(2);
          // Connect tools with fixed delays
          mcpTools.forEach((tool, index) => {
            setTimeout(() => {
              setConnectedTools(prev => [...prev, tool.id]);
            }, index * 300);
          });
        }
        if (logIndex === 12) setCurrentStep(3);
        if (logIndex === 15) setCurrentStep(4);
      } else {
        clearInterval(logInterval);
        setIsRunning(false);
        setIsComplete(true);
      }
    }, 180);
  };

  const resetDemo = () => {
    setIsRunning(false);
    setIsComplete(false);
    setCurrentStep(0);
    setConnectedTools([]);
    setLogs([]);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          MCP Server Demo
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Model Context Protocol enables AI to securely connect to external tools, databases, and APIs
        </p>
      </div>

      {/* Progress Steps */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Sparkles className="text-indigo-500" />
              MCP Workflow
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
                    ${isActive ? 'bg-indigo-100 border-indigo-300 border' :
                      isCompleted ? 'bg-green-50 text-green-700' :
                      'bg-gray-50 text-gray-400'}
                  `}
                >
                  <span className="text-lg font-bold">{step.id}</span>
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
                MCP Server running...
              </>
            ) : (
              <>
                <Play className="mr-2" />
                Start MCP Server Demo
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Connected Tools */}
        <Card className="border-2 border-indigo-200">
          <CardHeader className="bg-indigo-50">
            <CardTitle className="flex items-center gap-2">
              <Plug className="text-indigo-600" />
              Connected Tools
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {mcpTools.map((tool) => {
                const Icon = tool.icon;
                const isConnected = connectedTools.includes(tool.id);

                return (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: isConnected ? 1 : 0.3 }}
                    className={`
                      flex items-center gap-3 p-3 rounded-lg border transition-all
                      ${isConnected
                        ? `${tool.bgColor} ${tool.borderColor}`
                        : 'bg-gray-50 border-gray-200'}
                    `}
                  >
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center
                      ${isConnected ? tool.iconBg : 'bg-gray-100'}
                    `}>
                      <Icon size={20} className={isConnected ? tool.iconColor : 'text-gray-400'} />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{tool.name}</div>
                      <div className="text-xs text-gray-500">{tool.description}</div>
                    </div>
                    {isConnected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <CheckCircle className="text-green-500" size={20} />
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Server Logs */}
        <Card className="lg:col-span-2 border-2 border-gray-800">
          <CardHeader className="bg-gray-900 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-sm font-mono">
              <Server size={16} />
              MCP Server Logs
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[350px] bg-gray-900 text-green-400 font-mono text-xs p-4 overflow-y-auto rounded-b-lg">
              <AnimatePresence>
                {logs.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`whitespace-pre-wrap ${
                      line?.startsWith('[Tool') ? 'text-blue-400' :
                      line?.startsWith('[AI]') ? 'text-purple-400' :
                      line?.startsWith('[MCP]') ? 'text-green-400' :
                      'text-gray-400'
                    }`}
                  >
                    {line || ''}
                  </motion.div>
                ))}
              </AnimatePresence>
              {logs.length === 0 && (
                <span className="text-gray-500">Server not started...</span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Benefits */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Card className="bg-indigo-50 border-indigo-200">
            <CardContent className="pt-6 text-center">
              <Plug className="mx-auto text-indigo-600 mb-2" size={32} />
              <h4 className="font-semibold text-indigo-800">Extensible</h4>
              <p className="text-sm text-indigo-600">Add custom tools easily</p>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6 text-center">
              <Server className="mx-auto text-green-600 mb-2" size={32} />
              <h4 className="font-semibold text-green-800">Secure</h4>
              <p className="text-sm text-green-600">Controlled access to resources</p>
            </CardContent>
          </Card>
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="pt-6 text-center">
              <Zap className="mx-auto text-purple-600 mb-2" size={32} />
              <h4 className="font-semibold text-purple-800">Powerful</h4>
              <p className="text-sm text-purple-600">AI + External tools combined</p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default MCPServerDemo;

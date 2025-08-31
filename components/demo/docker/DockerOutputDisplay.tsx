'use client'

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, FileCode } from 'lucide-react';

interface Log {
  step: string;
  message: string;
}

interface DockerOutputDisplayProps {
  logs: Log[];
  isComplete: boolean;
}

const dockerfileContent = `# Multi-stage build for reproducible research
FROM python:3.12-slim-bookworm AS builder

# Install system dependencies
RUN apt-get update && apt-get install -y \\
    build-essential libproj-dev libgeos-dev

# Create virtual environment
ENV VENV_PATH=/opt/venv
RUN python3 -m venv $VENV_PATH
ENV PATH="$VENV_PATH/bin:$PATH"

# Install Python packages
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Final stage
FROM python:3.12-slim-bookworm AS final
RUN useradd --create-home appuser
USER appuser
WORKDIR /home/appuser/work

COPY --from=builder /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

EXPOSE 8888
CMD ["jupyter", "lab", "--ip=0.0.0.0"]`;

export default function DockerOutputDisplay({ logs, isComplete }: DockerOutputDisplayProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getStepColor = (step: string) => {
    const colors: { [key: string]: string } = {
      'idle': 'text-gray-400',
      'setup': 'text-blue-400',
      'building': 'text-yellow-400',
      'downloading': 'text-cyan-400',
      'processing': 'text-purple-400',
      'visualizing': 'text-pink-400',
      'packaging': 'text-green-400',
    };
    return colors[step] || 'text-gray-400';
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg border border-gray-700 h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-4 text-center flex items-center justify-center">
        <Terminal className="mr-2" />
        Docker 빌드 로그
      </h3>
      <div ref={scrollRef} className="flex-grow h-64 overflow-y-auto pr-2 font-mono text-sm space-y-2">
        {logs.map((log, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.02 }}
          >
            <span className={`${getStepColor(log.step)} mr-2`}>{`[${log.step}]>`}</span>
            <span className="text-gray-200">{log.message}</span>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ delay: 0.5 }}
            className="mt-4 pt-4 border-t border-gray-700"
          >
            <h4 className="text-md font-semibold mb-2 text-center flex items-center justify-center">
              <FileCode className="mr-2" />
              생성된 Dockerfile
            </h4>
            <div className="bg-gray-800 p-3 rounded-md overflow-x-auto">
              <pre className="text-xs text-gray-300 whitespace-pre">
                {dockerfileContent}
              </pre>
            </div>
            <div className="mt-4 p-3 bg-green-900/30 border border-green-600 rounded-md">
              <p className="text-sm text-green-400 text-center">
                ✅ 재현 가능한 환경 구축 완료!
              </p>
              <p className="text-xs text-gray-400 text-center mt-1">
                docker run -v $(pwd):/work my-ocean-research:v1.0
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
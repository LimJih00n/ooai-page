'use client'

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, BarChart2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Log {
  step: string;
  message: string;
}

interface OutputDisplayProps {
  logs: Log[];
  isComplete: boolean;
}

const sampleData = [
  { year: 2015, temp_anomaly: 0.9, squid_catch: 80 },
  { year: 2016, temp_anomaly: 1.01, squid_catch: 75 },
  { year: 2017, temp_anomaly: 0.93, squid_catch: 82 },
  { year: 2018, temp_anomaly: 0.85, squid_catch: 88 },
  { year: 2019, temp_anomaly: 0.98, squid_catch: 77 },
  { year: 2020, temp_anomaly: 1.02, squid_catch: 72 },
  { year: 2021, temp_anomaly: 1.1, squid_catch: 68 },
  { year: 2022, temp_anomaly: 1.15, squid_catch: 65 },
];

export default function OutputDisplay({ logs, isComplete }: OutputDisplayProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg border border-gray-700 h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-4 text-center flex items-center justify-center">
        <Terminal className="mr-2" />
        실시간 분석 결과
      </h3>
      <div ref={scrollRef} className="flex-grow h-64 overflow-y-auto pr-2 font-mono text-sm space-y-2">
        {logs.map((log, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <span className="text-green-400 mr-2">{`[${log.step}]>`}</span>
            <span>{log.message}</span>
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
              <BarChart2 className="mr-2" />
              최종 분석 결과
            </h4>
            <p className="text-xs text-center text-gray-400 mb-4">
              동해 표층 수온 상승과 오징어 어획량 간의 음의 상관관계가 통계적으로 유의미하게 나타남 (p &lt; 0.05).
            </p>
            <div className="h-48 w-full">
              <ResponsiveContainer>
                <BarChart data={sampleData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                  <XAxis dataKey="year" stroke="#d1d5db" fontSize={12} />
                  <YAxis yAxisId="left" stroke="#60a5fa" fontSize={12} />
                  <YAxis yAxisId="right" orientation="right" stroke="#a78bfa" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #4b5563',
                    }}
                  />
                  <Legend wrapperStyle={{fontSize: "12px"}} />
                  <Bar yAxisId="left" dataKey="temp_anomaly" name="수온 편차" fill="#60a5fa" />
                  <Bar yAxisId="right" dataKey="squid_catch" name="오징어 어획량(톤)" fill="#a78bfa" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

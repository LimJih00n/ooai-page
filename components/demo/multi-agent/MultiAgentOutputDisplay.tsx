'use client'

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, FileCode } from 'lucide-react';

interface Log {
  step: string;
  message: string;
}

interface HybridOutputDisplayProps {
  logs: Log[];
  isComplete: boolean;
}

const finalCode = `import xarray as xr
import matplotlib.pyplot as plt
import cartopy.crs as ccrs

# 1. Load Chlorophyll and SST data using xarray
chlo_data = xr.open_dataset('path/to/chlo_data.nc')
sst_data = xr.open_dataset('path/to/sst_data.nc')

# 2. Calculate Pearson correlation coefficient
correlation = xr.corr(chlo_data['chl'], sst_data['sst'], dim='time')

# 3. Visualize the result on a map
plt.figure(figsize=(10, 8))
ax = plt.axes(projection=ccrs.PlateCarree())
correlation.plot(ax=ax, transform=ccrs.PlateCarree(), cmap='viridis')
ax.coastlines()
plt.title('Correlation between CHLO and SST')
plt.show()
`;

export default function HybridOutputDisplay({ logs, isComplete }: HybridOutputDisplayProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getStepColor = (step: string) => {
    const colors: { [key: string]: string } = {
      'idle': 'text-gray-400',
      'Jeni': 'text-blue-400',
      'Exaone': 'text-green-400',
      'Specialist': 'text-yellow-400',
    };
    return colors[step.toUpperCase()] || 'text-gray-400';
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg border border-gray-700 h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-4 text-center flex items-center justify-center">
        <Terminal className="mr-2" />
        실시간 AI 에이전트 로그
      </h3>
      <div ref={scrollRef} className="flex-grow h-64 overflow-y-auto pr-2 font-mono text-sm space-y-2">
        {logs.map((log, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
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
              최종 생성된 Python 코드
            </h4>
            <div className="bg-gray-800 p-3 rounded-md overflow-x-auto">
              <pre className="text-xs text-gray-300 whitespace-pre">
                <code dangerouslySetInnerHTML={{
                  __html: finalCode
                    .replace(/(import|from|as)/g, '<span style="color: #c586c0;">$1</span>')
                    .replace(/(plt|xr|ccrs)/g, '<span style="color: #9cdcfe;">$1</span>')
                    .replace(/('.*?')/g, '<span style="color: #ce9178;">$1</span>')
                    .replace(/(#.*)/g, '<span style="color: #6a9955;">$1</span>')
                }} />
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

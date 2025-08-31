'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface ProgressTrackerProps {
  steps: { id: string; name: string }[];
  currentStep: number;
  isRunning: boolean;
  isComplete: boolean;
}

export default function HybridProgressTracker({ steps, currentStep, isRunning, isComplete }: ProgressTrackerProps) {
  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = index === currentStep && isRunning;
          const isCompleted = isComplete || index < currentStep;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <motion.div
                  animate={{
                    scale: isActive ? 1.2 : 1,
                    backgroundColor: isCompleted ? '#8b5cf6' : (isActive ? '#a78bfa' : '#e5e7eb'),
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                >
                  {isCompleted ? <Check /> : index + 1}
                </motion.div>
                <p className={`mt-2 text-xs text-center font-semibold ${isActive || isCompleted ? 'text-purple-600' : 'text-gray-500'}`}>
                  {step.name}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 h-1 bg-gray-200 mx-2 relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: isCompleted || isActive ? '100%' : '0%' }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="absolute top-0 left-0 h-full bg-purple-500"
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

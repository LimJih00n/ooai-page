'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Circle } from 'lucide-react';

interface Step {
  id: string;
  name: string;
}

interface DockerProgressTrackerProps {
  steps: Step[];
  currentStep: number;
  isRunning: boolean;
  isComplete: boolean;
}

export default function DockerProgressTracker({ steps, currentStep, isRunning, isComplete }: DockerProgressTrackerProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      {steps.map((step, index) => {
        const isActive = index === currentStep && isRunning;
        const isDone = index < currentStep || isComplete;
        
        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <motion.div
                animate={{
                  scale: isActive ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  duration: 1,
                  repeat: isActive ? Infinity : 0,
                }}
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  isDone 
                    ? 'bg-green-500 border-green-500' 
                    : isActive 
                    ? 'bg-yellow-500 border-yellow-500' 
                    : 'bg-gray-200 border-gray-300'
                }`}
              >
                {isDone ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <Circle className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                )}
              </motion.div>
              <p className={`text-xs mt-2 text-center ${
                isDone || isActive ? 'font-semibold text-gray-800' : 'text-gray-500'
              }`}>
                {step.name}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 ${
                index < currentStep ? 'bg-green-500' : 'bg-gray-300'
              }`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
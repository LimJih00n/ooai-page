'use client'

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  code: string;
  title: string;
}

export default function CodeModal({ isOpen, onClose, code, title }: CodeModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-[999] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-gray-900 text-white w-full max-w-4xl h-[80vh] rounded-lg shadow-xl flex flex-col border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
              <div className="flex items-center space-x-2">
                <Code className="w-5 h-5 text-blue-400" />
                <h2 className="font-semibold">{title}</h2>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </header>
            <main className="flex-grow p-4 overflow-y-auto">
              <pre className="language-tsx">
                <code className="language-tsx whitespace-pre-wrap text-sm">
                  {code}
                </code>
              </pre>
            </main>
            <footer className="p-4 border-t border-gray-700 text-center flex-shrink-0">
              <Button onClick={onClose}>닫기</Button>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

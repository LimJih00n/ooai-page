'use client'

import { useState } from 'react'
import { Calculator, TrendingUp, Clock, Users, DollarSign, Zap, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// ROI 계산 데이터
const calculateROI = (researchers: number, avgSalary: number) => {
  const yearlyHours = 2000 // 연간 근무시간
  const currentEfficiency = 0.23 // 현재 실제 연구 시간 비율
  const LabAEfficiency = 0.60 // LabA 사용 시 효율
  
  const hourlyRate = avgSalary / yearlyHours
  const currentProductiveHours = yearlyHours * currentEfficiency
  const labAProductiveHours = yearlyHours * LabAEfficiency
  
  const timeSaved = (labAProductiveHours - currentProductiveHours) * researchers
  const costSaved = timeSaved * hourlyRate
  const reproducibityCost = avgSalary * researchers * 0.15 // 재현성 실패로 인한 15% 손실
  
  return {
    timeSaved,
    costSaved,
    reproducibityCost,
    totalSavings: costSaved + reproducibityCost,
    roi: ((costSaved + reproducibityCost) / (avgSalary * researchers * 0.05)) * 100 // 5% 투자 대비
  }
}

const COLORS = ['#2563eb', '#9333ea', '#4f46e5', '#7c3aed']

export default function ROICalculator() {
  const [researchers, setResearchers] = useState(5)
  const [avgSalary, setAvgSalary] = useState(60000000) // 6천만원
  const roi = calculateROI(researchers, avgSalary)
  
  // 차트 데이터
  const comparisonData = [
    { name: '기존 방식', 실제연구시간: 23, 행정업무: 35, 환경설정: 25, 문제해결: 17, fill: '#e5e7eb' },
    { name: 'LabA', 실제연구시간: 60, 행정업무: 20, 환경설정: 5, 문제해결: 15, fill: '#2563eb' }
  ]
  
  const savingsData = [
    { name: '시간 절약', value: Math.round(roi.timeSaved), fill: COLORS[0] },
    { name: '재현성 개선', value: Math.round(roi.reproducibityCost / 1000000), fill: COLORS[1] },
    { name: '자동화 효과', value: Math.round(roi.costSaved / 1000000), fill: COLORS[2] }
  ]
  
  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center space-x-3 mb-4"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Calculator className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900">
            연구실 ROI 계산기
          </h3>
        </motion.div>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          귀하의 연구실에서 LabA 도입 시 예상되는 정확한 투자 수익률을 계산해보세요
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Panel */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span>연구실 정보 입력</span>
              </CardTitle>
              <CardDescription>
                현재 연구실 규모와 환경을 입력해주세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  연구원 수: {researchers}명
                </label>
                <input
                  type="range"
                  min="2"
                  max="20"
                  value={researchers}
                  onChange={(e) => setResearchers(Number(e.target.value))}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  평균 연봉: {(avgSalary / 10000).toLocaleString()}만원
                </label>
                <input
                  type="range"
                  min="40000000"
                  max="100000000"
                  step="5000000"
                  value={avgSalary}
                  onChange={(e) => setAvgSalary(Number(e.target.value))}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              <Button
                variant="research"
                className="w-full group"
              >
                ROI 계산하기
                <TrendingUp className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass p-4 rounded-lg border border-blue-200"
            >
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(roi.roi)}%
              </div>
              <div className="text-sm text-gray-600">예상 ROI</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass p-4 rounded-lg border border-purple-200"
            >
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(roi.totalSavings / 10000000)}억
              </div>
              <div className="text-sm text-gray-600">연간 절약</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Visualization Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Efficiency Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-purple-600" />
                <span>생산성 비교</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                      }}
                    />
                    <Bar dataKey="실제연구시간" stackId="a" fill="#2563eb" />
                    <Bar dataKey="행정업무" stackId="a" fill="#7c3aed" />
                    <Bar dataKey="환경설정" stackId="a" fill="#dc2626" />
                    <Bar dataKey="문제해결" stackId="a" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Cost Savings Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <span>절약 효과</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={savingsData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value?.toLocaleString() ?? '0'}`}
                      >
                        {savingsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-indigo-600" />
                  <span>시간 효율성</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">절약된 시간</span>
                    <span className="font-bold text-indigo-600">
                      {Math.round(roi.timeSaved).toLocaleString()}시간/년
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">재현성 개선</span>
                    <span className="font-bold text-purple-600">70% → 5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">실제 연구 시간</span>
                    <span className="font-bold text-blue-600">23% → 60%</span>
                  </div>
                  
                  {/* Progress bars */}
                  <div className="space-y-3 mt-6">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>생산성 향상</span>
                        <span>161% ↑</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '85%' }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-6"
      >
        <div className="text-center mb-6">
          <h4 className="text-2xl font-bold mb-2">투자 수익률 요약</h4>
          <p className="opacity-90">1년 내 완전한 투자 회수 + 지속적인 수익 창출</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-center cursor-pointer"
          >
            <div className="text-3xl font-bold mb-2">{Math.round(roi.roi)}%</div>
            <div className="text-sm opacity-90">투자수익률 (ROI)</div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-center cursor-pointer"
          >
            <div className="text-3xl font-bold mb-2">
              {Math.round(roi.totalSavings / 10000000)}억원
            </div>
            <div className="text-sm opacity-90">연간 총 절약</div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-center cursor-pointer"
          >
            <div className="text-3xl font-bold mb-2">6개월</div>
            <div className="text-sm opacity-90">투자 회수 기간</div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-center cursor-pointer"
          >
            <div className="text-3xl font-bold mb-2">37%</div>
            <div className="text-sm opacity-90">시간 효율성 증가</div>
          </motion.div>
        </div>

        <div className="mt-6 text-center">
          <Button 
            variant="outline" 
            size="lg" 
            className="border-white text-white hover:bg-white/10 group"
          >
            상세 ROI 보고서 받기
            <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </motion.div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: #2563eb;
          border-radius: 50%;
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}
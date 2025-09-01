import MultiAgentWorkflow from '@/components/demo/multi-agent/MultiAgentWorkflow';

export default function MultiAgentDemoPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          다중 에이전트 협업 데모
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          LangGraph 프레임워크를 기반으로 구축된 AI 에이전트들이 어떻게 협력하여 복잡한 데이터 분석 과제를 수행하는지 확인해보세요.
          각 에이전트는 특정 역할을 수행하며, 워크플로우는 인간의 검토를 통해 신뢰성을 확보합니다.
        </p>
      </div>
      
      <div className="flex justify-center">
        <MultiAgentWorkflow />
      </div>

      <div className="mt-12 max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg border">
        <h2 className="text-2xl font-bold mb-4">데모 시나리오 개요</h2>
        <p className="mb-4 text-gray-700">
          이 데모는 "특정 해역의 해수면 온도 변화와 특정 어종의 출현 빈도 사이의 상관관계 분석"이라는 가상의 연구 목표를 시뮬레이션합니다.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>연구 계획가 (Planner):</strong> 목표를 구체적인 실행 계획으로 분해합니다.</li>
          <li><strong>데이터 수집가 (Data Fetcher):</strong> 해양학, 생태학 데이터베이스 및 웹에서 관련 정보를 수집합니다.</li>
          <li><strong>데이터 분석가 (Synthesizer):</strong> 수집된 데이터를 종합하여 통계적 상관관계를 도출합니다.</li>
          <li><strong>보고서 생성가 (Report Generator):</strong> 분석 결과를 바탕으로 구조화된 보고서를 작성합니다.</li>
          <li><strong>인간 검토자 (Human-in-the-Loop):</strong> 최종 결과물을 검토하고, 승인하거나 수정을 요청하여 워크플로우의 다음 단계를 결정합니다.</li>
        </ul>
      </div>
    </main>
  );
}

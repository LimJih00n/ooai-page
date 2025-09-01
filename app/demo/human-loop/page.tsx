import HumanLoopDemo from '@/components/demo/human-loop/HumanLoopDemo';

export default function HumanInTheLoopPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Human-in-the-Loop: 인간-AI 협업 데모
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          AI가 생성한 분석 결과를 인간 연구원이 직접 검토하고 피드백을 제공하는 과정을 시뮬레이션합니다. 
          이러한 협업 워크플로우는 AI 결과물의 <strong>신뢰성</strong>을 확보하고 연구자의 <strong>제어권</strong>을 보장하는 핵심적인 기능입니다.
        </p>
      </div>
      
      <div className="flex justify-center">
        <HumanLoopDemo />
      </div>

      <div className="mt-12 max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg border">
        <h2 className="text-2xl font-bold mb-4">데모 시나리오 개요</h2>
        <p className="mb-4 text-gray-700">
          {"\"해수면 온도(SST)와 엽록소 농도의 상관관계 분석\"이라는 가상의 연구 목표를 AI와 인간이 협력하여 수행합니다."}
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>1단계 (AI 분석):</strong> AI 에이전트가 데이터를 분석하고 시각화하는 Python 코드를 자동으로 생성하고 실행합니다.</li>
          <li><strong>2단계 (인간 검토):</strong> 연구원은 AI의 코드와 결과물을 검토합니다. 결과가 만족스러우면 {'\'승인\''}할 수 있습니다.</li>
          <li><strong>3단계 (수정 요청):</strong> {"만약 시각화 방식을 변경하고 싶다면, 연구원은 \"막대 그래프 대신 산점도를 사용해줘\"와 같이 자연어로 피드백을 제공할 수 있습니다."}</li>
          <li><strong>4단계 (AI 재작업):</strong> AI는 피드백을 반영하여 코드를 수정한 후, 분석을 다시 실행하여 연구원의 재검토를 받습니다.</li>
          <li><strong>5단계 (완료):</strong> 최종 결과가 승인되면, AI는 이를 바탕으로 보고서를 생성하며 워크플로우를 완료합니다.</li>
        </ul>
      </div>
    </main>
  );
}
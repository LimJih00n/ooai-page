import AutoReportDemo from '@/components/demo/auto-report/AutoReportDemo';

export default function AutoReportPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          AI 기반 자동 보고서 생성 데모
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          복잡한 분석 결과를 바탕으로, AI가 어떻게 전문적인 형식의 연구 보고서 초안을 자동으로 생성하는지 확인해보세요.
          이를 통해 연구자는 보고서 작성에 드는 시간을 획기적으로 줄이고, 결과 해석과 같은 더 중요한 작업에 집중할 수 있습니다.
        </p>
      </div>
      
      <div className="flex justify-center">
        <AutoReportDemo />
      </div>

      <div className="mt-12 max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg border">
        <h2 className="text-2xl font-bold mb-4">데모 시나리오 개요</h2>
        <p className="mb-4 text-gray-700">
          {`AI 에이전트에게 "인도양 다이폴(IOD)과 주요 해양 환경 변수 간의 관계"에 대한 핵심 분석 결과 데이터를 입력합니다.`}
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>입력 데이터:</strong> 연구 목표, 핵심 통계치(상관계수 등), 결론 요약 등 정형화된 데이터를 AI에게 제공합니다.</li>
          <li><strong>보고서 생성:</strong> AI는 입력 데이터를 바탕으로, 지정된 형식에 맞춰 서론, 연구 방법, 결과, 결론이 포함된 구조화된 보고서를 실시간으로 작성합니다.</li>
          <li><strong>결과물:</strong> 연구자는 단 몇 초 만에 논문 초록이나 학회 발표 자료로 즉시 활용할 수 있는 수준의 보고서 초안을 얻게 됩니다.</li>
        </ul>
      </div>
    </main>
  );
}

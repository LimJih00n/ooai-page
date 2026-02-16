import type { Scene } from '../shared/types'

export const scenes: Scene[] = [
  {
    id: 'hwp-1',
    windowType: 'browser',
    windowProps: {
      url: 'https://tools.ocean5i.com/hwp-converter',
      title: 'O5I HWP 변환기',
      content: `## 📄 HWP 문서 자동 변환

### 지원 변환
| 변환 | 설명 | 상태 |
|------|------|:----:|
| DOCX → HWP | Word를 한글 파일로 변환 | ✅ |
| DOCX → HWPX | Word를 한글 XML로 변환 | ✅ |
| MD → HWP | Markdown을 한글로 변환 | ✅ |
| HWP → DOCX | 한글을 Word로 변환 | ✅ |
| HWP → PDF | 한글을 PDF로 변환 | ✅ |
| 다중 병합 | 여러 DOCX를 하나의 HWP로 | ✅ |

### 📎 파일 업로드
\`연구제안서_초안.docx\` 업로드 완료 (2.3MB)

**변환 옵션**: DOCX → HWP
**스타일 템플릿**: 정부과제 신청서 양식 적용`,
    },
    bubble: {
      speaker: 'researcher',
      text: 'Word로 작성한 연구제안서를 정부과제 제출용 HWP로 변환합니다.',
    },
    duration: 4500,
  },
  {
    id: 'hwp-2',
    windowType: 'terminal',
    windowProps: {
      title: 'hwp-converter — 변환 중',
      lines: [
        { text: 'HWP 변환 파이프라인 실행', type: 'comment' },
        { text: '', type: 'output' },
        { text: '$ hwp-convert 연구제안서_초안.docx --to hwp --template gov', type: 'command' },
        { text: '', type: 'output' },
        { text: '[1/5] DOCX 파싱... 42페이지, 15개 표, 8개 이미지', type: 'output' },
        { text: '[2/5] 스타일 매핑... 정부과제 양식 적용', type: 'output' },
        { text: '[3/5] 표/이미지 변환... 15개 표, 8개 이미지 변환', type: 'success' },
        { text: '[4/5] 한글 문단 구조 생성... OK', type: 'success' },
        { text: '[5/5] HWP 파일 패키징... OK', type: 'success' },
        { text: '', type: 'output' },
        { text: '변환 완료: 연구제안서_초안.hwp (3.1MB)', type: 'success' },
        { text: '변환 시간: 4.2초 | 정확도: 98.7%', type: 'success' },
      ],
    },
    bubble: {
      speaker: 'system',
      text: 'DOCX를 파싱하고, 정부과제 양식 스타일을 적용하여 HWP로 변환합니다.',
    },
    duration: 4500,
  },
  {
    id: 'hwp-3',
    windowType: 'code',
    windowProps: {
      fileName: 'style_template.py',
      language: 'python',
      code: `# 정부과제 양식 스타일 자동 적용
template_styles = {
    "title": {
        "font": "한컴바탕", "size": 18,
        "bold": True, "align": "center"
    },
    "heading1": {
        "font": "한컴바탕", "size": 14,
        "bold": True, "numbering": "1."
    },
    "body": {
        "font": "한컴바탕", "size": 11,
        "line_spacing": 160, "first_indent": 10
    },
    "table": {
        "border": "single", "header_bg": "#E8E8E8",
        "font": "한컴바탕", "size": 10
    }
}

# 기존 HWP의 스타일을 복제하여 적용 가능
# → 제출 양식에 완벽하게 맞는 HWP 생성`,
      highlightLines: [2, 3, 4, 21],
    },
    bubble: {
      speaker: 'ai',
      text: '정부과제 제출 양식에 맞는 폰트, 줄간격, 표 스타일을 자동 적용합니다.',
    },
    duration: 4000,
  },
  {
    id: 'hwp-4',
    windowType: 'browser',
    windowProps: {
      url: 'https://tools.ocean5i.com/hwp-converter/result',
      title: '변환 결과 미리보기',
      content: `## ✅ 변환 완료

### 변환 결과 요약
| 항목 | 값 |
|------|-----|
| 원본 | 연구제안서_초안.docx (2.3MB) |
| 결과 | 연구제안서_초안.hwp (3.1MB) |
| 페이지 | 42페이지 |
| 표 | 15개 (100% 변환) |
| 이미지 | 8개 (100% 변환) |
| 스타일 | 정부과제 양식 적용 |
| 변환 시간 | 4.2초 |
| 정확도 | 98.7% |

### 추가 변환 가능
- 📄 HWP → PDF 변환 (제출용)
- 📄 HWPX → HWP 변환 (호환용)
- 📦 다중 파일 병합 (부록 합치기)

**[다운로드]** 연구제안서_초안.hwp`,
    },
    bubble: {
      speaker: 'system',
      text: '42페이지, 15개 표, 8개 이미지까지 정확하게 변환됩니다. 추가 포맷 변환도 가능합니다.',
    },
    duration: 4500,
  },
  {
    id: 'hwp-5',
    windowType: 'terminal',
    windowProps: {
      title: 'batch-convert — 일괄 변환',
      lines: [
        { text: '다중 파일 일괄 변환도 지원', type: 'comment' },
        { text: '', type: 'output' },
        { text: '$ hwp-batch *.docx --to hwp --template gov --merge', type: 'command' },
        { text: '', type: 'output' },
        { text: '[1/4] 1장_연구목적.docx → HWP... OK', type: 'success' },
        { text: '[2/4] 2장_연구방법.docx → HWP... OK', type: 'success' },
        { text: '[3/4] 3장_기대효과.docx → HWP... OK', type: 'success' },
        { text: '[4/4] 4장_예산계획.docx → HWP... OK', type: 'success' },
        { text: '', type: 'output' },
        { text: '병합: 최종_연구제안서.hwp (8.7MB, 128페이지)', type: 'success' },
        { text: '총 변환 시간: 12.3초', type: 'success' },
      ],
    },
    bubble: {
      speaker: 'system',
      text: '여러 Word 파일을 하나의 HWP로 자동 병합합니다. 정부과제 제출서류 준비에 최적화.',
    },
    duration: 4000,
  },
]

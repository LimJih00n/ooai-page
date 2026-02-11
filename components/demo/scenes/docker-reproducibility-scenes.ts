import type { Scene } from '../shared/types'

export const scenes: Scene[] = [
  {
    id: 'docker-r-1',
    windowType: 'code',
    windowProps: {
      fileName: 'Dockerfile',
      language: 'dockerfile',
      code: `FROM python:3.12-slim-bookworm

# System dependencies for ocean science
RUN apt-get update && apt-get install -y \\
    libproj-dev libgeos-dev libhdf5-dev \\
    && rm -rf /var/lib/apt/lists/*

# Python packages with pinned versions
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Research code
WORKDIR /research
COPY src/ ./src/
COPY configs/ ./configs/

# Non-root user for security
RUN useradd -m researcher
USER researcher

# Default: run analysis
CMD ["python", "src/analyze.py"]`,
      highlightLines: [1, 4, 5, 10, 18, 19],
    },
    bubble: {
      speaker: 'system',
      text: 'Dockerfile defines the exact research environment — Python 3.12, pinned packages, non-root user.',
    },
    duration: 4500,
  },
  {
    id: 'docker-r-2',
    windowType: 'terminal',
    windowProps: {
      title: 'docker — build',
      lines: [
        { text: 'docker build -t ocean-research:v1.0 .', type: 'command' },
        { text: '', type: 'output' },
        { text: '[1/7] FROM python:3.12-slim-bookworm', type: 'output' },
        { text: '[2/7] RUN apt-get update && apt-get install...', type: 'output' },
        { text: '[3/7] COPY requirements.txt .', type: 'output' },
        { text: '[4/7] RUN pip install (23 packages)', type: 'output' },
        { text: '  numpy==1.26.4  pandas==2.2.1  xarray==2024.2.0', type: 'output' },
        { text: '  cartopy==0.23.0  matplotlib==3.9.0  scipy==1.13.0', type: 'output' },
        { text: '[5/7] COPY src/ configs/', type: 'output' },
        { text: '[6/7] RUN useradd -m researcher', type: 'output' },
        { text: '[7/7] CMD ["python", "src/analyze.py"]', type: 'output' },
        { text: '', type: 'output' },
        { text: 'Image built: ocean-research:v1.0 (1.2GB)', type: 'success' },
        { text: 'SHA256: a3f8c2e...d41b (immutable digest)', type: 'success' },
      ],
    },
    bubble: {
      speaker: 'system',
      text: 'All dependencies locked to exact versions — the image is immutable and reproducible.',
    },
    duration: 4500,
  },
  {
    id: 'docker-r-3',
    windowType: 'terminal',
    windowProps: {
      title: 'docker — run analysis',
      lines: [
        { text: 'docker run -v ./data:/data ocean-research:v1.0', type: 'command' },
        { text: '', type: 'output' },
        { text: '[researcher@container] Starting analysis...', type: 'output' },
        { text: 'Loading: /data/indian_ocean_sst.nc (2.3GB)', type: 'output' },
        { text: 'Processing: monthly climatology...', type: 'output' },
        { text: 'Processing: trend analysis...', type: 'output' },
        { text: 'Processing: EOF decomposition...', type: 'output' },
        { text: '', type: 'output' },
        { text: 'Results saved to /data/output/', type: 'success' },
        { text: '  sst_trend.nc      (spatial trends)', type: 'output' },
        { text: '  eof_patterns.nc   (EOF modes 1-3)', type: 'output' },
        { text: '  analysis_log.json (full provenance)', type: 'output' },
        { text: '', type: 'output' },
        { text: 'SHA256 of results: b7d2f1e...c93a', type: 'success' },
      ],
    },
    bubble: {
      speaker: 'ai',
      text: 'Analysis runs inside the container — results include a cryptographic hash for verification.',
    },
    duration: 4500,
  },
  {
    id: 'docker-r-4',
    windowType: 'terminal',
    windowProps: {
      title: 'cross-platform — verification',
      lines: [
        { text: 'Running on 3 different platforms...', type: 'comment' },
        { text: '', type: 'output' },
        { text: '[Windows 11]  docker run ocean-research:v1.0', type: 'command' },
        { text: '  Result SHA256: b7d2f1e...c93a', type: 'success' },
        { text: '  SST trend: +0.178 C/decade', type: 'output' },
        { text: '', type: 'output' },
        { text: '[macOS 15]    docker run ocean-research:v1.0', type: 'command' },
        { text: '  Result SHA256: b7d2f1e...c93a', type: 'success' },
        { text: '  SST trend: +0.178 C/decade', type: 'output' },
        { text: '', type: 'output' },
        { text: '[Ubuntu 24]   docker run ocean-research:v1.0', type: 'command' },
        { text: '  Result SHA256: b7d2f1e...c93a', type: 'success' },
        { text: '  SST trend: +0.178 C/decade', type: 'output' },
        { text: '', type: 'output' },
        { text: 'All 3 platforms: IDENTICAL results (hash match)', type: 'success' },
      ],
    },
    bubble: {
      speaker: 'system',
      text: '3 platforms (Windows, macOS, Linux) produce identical results — cryptographic hashes match perfectly.',
    },
    duration: 5000,
  },
  {
    id: 'docker-r-5',
    windowType: 'browser',
    windowProps: {
      url: 'http://localhost:8080/reproducibility-report',
      title: 'Reproducibility Dashboard',
      content: `## Reproducibility Verification Report

### Status: 100% Reproducible

### Platform Tests
- **Windows 11**: PASS (SHA match)
- **macOS 15**: PASS (SHA match)
- **Ubuntu 24.04**: PASS (SHA match)

### Environment Guarantees
- Python 3.12.3 (exact version)
- 23 packages (all pinned)
- System libs (libproj 9.3.1, libgeos 3.12.1)
- Non-root execution (security)

### Result Consistency
- SST trend: +0.178 C/decade (all platforms)
- EOF1 variance: 42.3% (all platforms)
- Output hash: b7d2f1e...c93a (identical)

---

> No more "it works on my machine" — Docker guarantees bit-for-bit reproducibility!`,
    },
    bubble: {
      speaker: 'researcher',
      text: '"It works on my machine" is a thing of the past — Docker ensures 100% reproducible research!',
    },
    duration: 4000,
  },
]

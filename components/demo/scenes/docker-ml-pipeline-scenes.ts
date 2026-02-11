import type { Scene } from '../shared/types'

export const scenes: Scene[] = [
  {
    id: 'docker-ml-1',
    windowType: 'terminal',
    windowProps: {
      title: 'docker — GPU container',
      lines: [
        { text: 'docker run --gpus all -v /data:/data ocean-ml:latest', type: 'command' },
        { text: '', type: 'output' },
        { text: 'NVIDIA Container Runtime initialized', type: 'output' },
        { text: 'GPU: NVIDIA A100 80GB (CUDA 12.4)', type: 'success' },
        { text: 'PyTorch 2.4.0+cu124 loaded', type: 'success' },
        { text: 'Container ready. Memory: 80GB GPU / 256GB RAM', type: 'success' },
        { text: '', type: 'output' },
        { text: 'Starting ML pipeline...', type: 'output' },
      ],
    },
    bubble: {
      speaker: 'system',
      text: 'Docker GPU container initialized — NVIDIA A100 with CUDA 12.4 and PyTorch 2.4.',
    },
    duration: 4000,
  },
  {
    id: 'docker-ml-2',
    windowType: 'terminal',
    windowProps: {
      title: 'docker — data ingestion',
      lines: [
        { text: 'Multi-source data ingestion', type: 'comment' },
        { text: '', type: 'output' },
        { text: '[1/4] SST (Copernicus)     12,000 images   2.1GB  OK', type: 'success' },
        { text: '[2/4] PAR (NASA OB.DAAC)    8,500 images   1.4GB  OK', type: 'success' },
        { text: '[3/4] Kd490 (Sentinel-3)    6,200 images   0.9GB  OK', type: 'success' },
        { text: '[4/4] ARGO profiles         3,847 profiles  0.3GB  OK', type: 'success' },
        { text: '', type: 'output' },
        { text: 'Total: 30,547 samples, 4.7GB ingested', type: 'success' },
        { text: 'Train/Val/Test split: 70/15/15', type: 'output' },
      ],
    },
    bubble: {
      speaker: 'ai',
      text: 'Ingesting satellite imagery and in-situ profiles — combining 4 sources for multi-modal training.',
    },
    duration: 4500,
  },
  {
    id: 'docker-ml-3',
    windowType: 'terminal',
    windowProps: {
      title: 'docker — training',
      lines: [
        { text: 'Training deep learning model...', type: 'comment' },
        { text: '', type: 'output' },
        { text: 'Model: UNet-Transformer (23.4M parameters)', type: 'output' },
        { text: 'Optimizer: AdamW (lr=1e-4, weight_decay=0.01)', type: 'output' },
        { text: '', type: 'output' },
        { text: 'Epoch  1/10  loss=0.847  RMSE=0.89  R2=0.62', type: 'output' },
        { text: 'Epoch  3/10  loss=0.412  RMSE=0.53  R2=0.78', type: 'output' },
        { text: 'Epoch  5/10  loss=0.198  RMSE=0.31  R2=0.87', type: 'output' },
        { text: 'Epoch  8/10  loss=0.089  RMSE=0.19  R2=0.92', type: 'success' },
        { text: 'Epoch 10/10  loss=0.052  RMSE=0.15  R2=0.94', type: 'success' },
        { text: '', type: 'output' },
        { text: 'Best model saved: checkpoint_epoch10.pt (R2=0.94)', type: 'success' },
      ],
    },
    bubble: {
      speaker: 'ai',
      text: 'Training UNet-Transformer model — RMSE dropped from 0.89 to 0.15, achieving R2=0.94.',
    },
    duration: 5000,
  },
  {
    id: 'docker-ml-4',
    windowType: 'browser',
    windowProps: {
      url: 'http://localhost:8501/validation-dashboard',
      title: 'Model Validation Dashboard',
      content: `## Validation Results

### Test Set Performance
- **Test R2**: 0.91
- **Test RMSE**: 0.18
- **Test MAE**: 0.12
- **Bias**: +0.02 (negligible)

### Cross-validation (5-fold)
- **Mean R2**: 0.90 (+/- 0.02)
- **Mean RMSE**: 0.19 (+/- 0.03)

### Spatial Performance
- Coastal: R2=0.88 (complex dynamics)
- Open ocean: R2=0.93 (stable patterns)
- Upwelling zones: R2=0.86 (high variability)

---

> Model generalizes well across different ocean regimes`,
    },
    bubble: {
      speaker: 'researcher',
      text: 'Independent validation confirms high prediction accuracy — Test R2=0.91 across ocean regimes.',
    },
    duration: 4500,
  },
  {
    id: 'docker-ml-5',
    windowType: 'terminal',
    windowProps: {
      title: 'docker — deployment',
      lines: [
        { text: 'Model optimization & deployment', type: 'comment' },
        { text: '', type: 'output' },
        { text: 'Converting to ONNX... done (92MB)', type: 'success' },
        { text: 'TensorRT optimization... done (47MB, 3.2x faster)', type: 'success' },
        { text: 'Quantization (INT8)... done (12MB, 8.1x faster)', type: 'success' },
        { text: '', type: 'output' },
        { text: 'Deploying as REST API (FastAPI + Uvicorn)...', type: 'output' },
        { text: 'API endpoint: POST /api/v1/predict', type: 'success' },
        { text: 'Inference latency: 12ms/image (batch=1)', type: 'success' },
        { text: '', type: 'output' },
        { text: 'Pipeline complete: Data -> Train -> Validate -> Deploy', type: 'success' },
      ],
    },
    bubble: {
      speaker: 'system',
      text: 'Model optimized (ONNX + TensorRT) and deployed as API — 12ms per inference image.',
    },
    duration: 4000,
  },
]

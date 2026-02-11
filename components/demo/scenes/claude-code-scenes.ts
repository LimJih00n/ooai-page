import type { Scene } from '../shared/types'

export const scenes: Scene[] = [
  {
    id: 'claude-1',
    windowType: 'terminal',
    windowProps: {
      title: 'claude — project scan',
      lines: [
        { text: 'claude "Create an SST analysis script"', type: 'command' },
        { text: '', type: 'output' },
        { text: 'Scanning project structure...', type: 'output' },
        { text: '  /research/IndianOcean/01_data/ → 3 NetCDF files (4.2GB)', type: 'output' },
        { text: '  /research/IndianOcean/02_src/  → 5 existing scripts', type: 'output' },
        { text: '  /research/IndianOcean/03_notebooks/ → 2 notebooks', type: 'output' },
        { text: '', type: 'output' },
        { text: 'Reading existing code patterns...', type: 'output' },
        { text: 'Detected: xarray + dask chunking pattern', type: 'success' },
        { text: 'Detected: matplotlib + cartopy for visualization', type: 'success' },
      ],
    },
    bubble: {
      speaker: 'ai',
      text: 'Scanning project structure and existing code to understand the conventions before generating new code.',
    },
    duration: 4500,
  },
  {
    id: 'claude-2',
    windowType: 'code',
    windowProps: {
      fileName: 'sst_analysis.py',
      language: 'python',
      code: `import xarray as xr
import numpy as np
from scipy import stats
import matplotlib.pyplot as plt
import cartopy.crs as ccrs

# Load with chunking for memory efficiency
ds = xr.open_dataset(
    "01_data/indian_ocean_sst.nc",
    chunks={"time": 365, "lat": 180, "lon": 360}
)

# Compute monthly climatology
monthly = ds.sst.groupby("time.month").mean("time")

# Linear trend per grid cell
def calc_trend(y):
    x = np.arange(len(y))
    slope, _, _, p, _ = stats.linregress(x, y)
    return slope if p < 0.05 else np.nan

trend = xr.apply_ufunc(
    calc_trend, ds.sst,
    input_core_dims=[["time"]],
    vectorize=True, dask="parallelized"
)

print(f"Mean SST: {ds.sst.mean().values:.2f} C")
print(f"Trend: {trend.mean().values*120:.2f} C/decade")`,
      highlightLines: [8, 9, 10, 21, 22, 23],
    },
    bubble: {
      speaker: 'ai',
      text: 'Generating memory-efficient analysis code — chunked loading with dask and vectorized trend computation.',
    },
    duration: 5000,
  },
  {
    id: 'claude-3',
    windowType: 'terminal',
    windowProps: {
      title: 'claude — code review',
      lines: [
        { text: 'Auto-reviewing generated code...', type: 'comment' },
        { text: '', type: 'output' },
        { text: '[CHECK] Imports: all packages available          PASS', type: 'success' },
        { text: '[CHECK] File paths: relative to project root     PASS', type: 'success' },
        { text: '[CHECK] Memory: chunked loading enabled          PASS', type: 'success' },
        { text: '[CHECK] Statistics: p-value filtering applied    PASS', type: 'success' },
        { text: '[CHECK] CLAUDE.md rules: English fonts, no borders PASS', type: 'success' },
        { text: '', type: 'output' },
        { text: 'All 5 checks passed. Code is ready to execute.', type: 'success' },
      ],
    },
    bubble: {
      speaker: 'system',
      text: 'Running automated code review — checking imports, paths, memory usage, and CLAUDE.md compliance.',
    },
    duration: 4000,
  },
  {
    id: 'claude-4',
    windowType: 'terminal',
    windowProps: {
      title: 'claude — execution',
      lines: [
        { text: 'python 02_src/sst_analysis.py', type: 'command' },
        { text: '', type: 'output' },
        { text: 'Loading dataset... 3,652 timesteps', type: 'output' },
        { text: 'Computing monthly climatology... done', type: 'output' },
        { text: 'Calculating grid-cell trends... [=========>] 100%', type: 'output' },
        { text: '', type: 'output' },
        { text: 'Mean SST: 23.45 C', type: 'success' },
        { text: 'Trend: +0.12 C/decade (significant at p<0.05)', type: 'success' },
        { text: 'Figure saved: 04_results/fig01_sst_trend/sst_trend_map.png', type: 'success' },
      ],
    },
    bubble: {
      speaker: 'ai',
      text: 'Script executed successfully — SST mean 23.45C with a warming trend of +0.12C per decade.',
    },
    duration: 4500,
  },
  {
    id: 'claude-5',
    windowType: 'browser',
    windowProps: {
      url: 'file:///research/IndianOcean/04_results/fig01_sst_trend/',
      title: 'SST Trend Analysis Results',
      content: `## SST Trend Map — Indian Ocean (2015-2025)

### Analysis Summary
- **Mean SST**: 23.45 C (basin average)
- **Linear Trend**: +0.12 C/decade
- **Statistical Significance**: p < 0.05 (Mann-Kendall test)
- **Strongest Warming**: Western Indian Ocean (+0.18 C/decade)

---

### Generated Files
- \`sst_trend_map.png\` — Spatial trend distribution
- \`sst_timeseries.png\` — Basin-averaged time series
- \`analysis.md\` — Detailed methodology & results

---

> From code generation to visualization — fully automated by Claude Code`,
    },
    bubble: {
      speaker: 'researcher',
      text: 'Code generation, review, execution, and visualization — all completed automatically!',
    },
    duration: 4000,
  },
]

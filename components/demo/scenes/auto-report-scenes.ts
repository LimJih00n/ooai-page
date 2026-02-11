import type { Scene } from '../shared/types'

export const scenes: Scene[] = [
  {
    id: 'report-1',
    windowType: 'terminal',
    windowProps: {
      title: 'auto-report — data analysis',
      lines: [
        { text: 'Starting automated analysis pipeline', type: 'comment' },
        { text: '', type: 'output' },
        { text: 'python auto_report.py --region indian_ocean --years 2015-2025', type: 'command' },
        { text: '', type: 'output' },
        { text: 'Dataset: 11 years x 365 days x 720x1440 grid', type: 'output' },
        { text: 'Total data points: 5,800,000', type: 'output' },
        { text: 'Variables: SST, EKE, CHL, Wind, SSH', type: 'output' },
        { text: '', type: 'output' },
        { text: 'Loading with dask chunks... done (peak mem: 4.2GB)', type: 'success' },
        { text: 'Quality control: 99.2% valid data', type: 'success' },
      ],
    },
    bubble: {
      speaker: 'ai',
      text: 'Starting analysis of 5.8M data points — 11 years of multi-variable ocean observations.',
    },
    duration: 4500,
  },
  {
    id: 'report-2',
    windowType: 'code',
    windowProps: {
      fileName: 'analysis_pipeline.py',
      language: 'python',
      code: `from eofs.xarray import Eof
import xarray as xr
import numpy as np

# EOF Analysis - dominant variability modes
solver = Eof(sst_anomaly, weights=coslat)
eofs = solver.eofs(neofs=3)
pcs = solver.pcs(npcs=3, pcscaling=1)
variance = solver.varianceFraction(neigs=3)
print(f"EOF1: {variance[0]*100:.1f}% variance")

# Cross-correlation analysis
variables = {"SST": sst, "EKE": eke, "CHL": chl}
corr_matrix = {}
for v1, d1 in variables.items():
    for v2, d2 in variables.items():
        r, p = pearsonr(d1.values.ravel(), d2.values.ravel())
        corr_matrix[f"{v1}-{v2}"] = (r, p)

# IOD regression
iod_reg = linear_regression(iod_index, sst_mean)
print(f"IOD sensitivity: {iod_reg.slope:.3f} C/unit")`,
      highlightLines: [6, 7, 8, 17, 18],
    },
    bubble: {
      speaker: 'ai',
      text: 'Running EOF decomposition and cross-correlation analysis on 5 oceanographic variables.',
    },
    duration: 5000,
  },
  {
    id: 'report-3',
    windowType: 'browser',
    windowProps: {
      url: 'http://localhost:8501/analysis-dashboard',
      title: 'Analysis Results Dashboard',
      content: `## Indian Ocean Multi-Variable Analysis

### Correlation Matrix
- **SST-EKE**: R = 0.26 (p < 0.01, moderate)
- **SST-CHL**: R = 0.08 (p = 0.24, not significant)
- **EKE-CHL**: R = 0.15 (p < 0.05, weak)

### IOD Impact
- **SST response**: +0.34 C per unit IOD
- **EKE response**: +30% during positive IOD
- **CHL response**: negligible (-2%, p = 0.71)

### EOF Analysis
- **EOF1**: 42.3% variance (basin-wide warming)
- **EOF2**: 18.7% variance (IOD dipole pattern)
- **EOF3**: 9.1% variance (seasonal cycle)

---

> SST and EKE show significant IOD sensitivity. CHL response is minimal.`,
    },
    bubble: {
      speaker: 'system',
      text: 'Results: SST and EKE significantly influenced by IOD, but CHL response is negligible.',
    },
    duration: 4500,
  },
  {
    id: 'report-4',
    windowType: 'document',
    windowProps: {
      title: 'Indian Ocean Multi-Variable Analysis Report',
      content: `# Multi-Variable Analysis of Indian Ocean Dynamics

## Abstract
This study examines the interrelationships between sea surface temperature (SST), eddy kinetic energy (EKE), and chlorophyll-a concentration (CHL) in the Indian Ocean over 2015-2025, with particular focus on Indian Ocean Dipole (IOD) modulation.

## 1. Introduction
The Indian Ocean exhibits complex coupled ocean-atmosphere dynamics driven by monsoon systems and interannual variability modes...

## 2. Data & Methods
- **SST**: CMEMS Global Ocean (0.25 deg, daily)
- **EKE**: AVISO+ satellite altimetry
- **CHL**: ESA OC-CCI v6.0
- **Methods**: EOF analysis, Pearson correlation, IOD-stratified regression

## 3. Results
- SST trend: +0.18 C/decade (basin average)
- EKE increased 30% during positive IOD events
- CHL shows no statistically significant IOD response

## 4. Conclusion
IOD primarily modulates physical variables (SST, EKE) while biological response (CHL) remains decoupled at basin scale.`,
    },
    bubble: {
      speaker: 'ai',
      text: 'Generating academic report with standard sections — abstract, methods, results, and conclusions.',
    },
    duration: 4500,
  },
  {
    id: 'report-5',
    windowType: 'document',
    windowProps: {
      title: 'Final Report — Ready for Conference',
      content: `# Completed Analysis Report

## Document Statistics
- **Word count**: 3,200 words
- **Figures**: 6 (trend maps, EOF patterns, correlations)
- **Tables**: 3 (correlation matrix, EOF variance, IOD response)
- **References**: 12 (auto-collected from literature)

## Time Comparison
- **Manual analysis**: 2-3 hours (data processing, plotting, writing)
- **AI-automated**: 10 seconds (same rigor, reproducible)

## Output Files
- \`report.md\` — Full analysis report
- \`figures/\` — 6 publication-ready figures (300 DPI)
- \`data/\` — Processed datasets (NetCDF)
- \`analysis.log\` — Complete reproducibility trail

---

> From raw data to conference-ready report — fully automated, fully reproducible.`,
    },
    bubble: {
      speaker: 'researcher',
      text: 'Conference-ready report in 10 seconds! Same rigor as manual analysis, fully reproducible.',
    },
    duration: 4000,
  },
]

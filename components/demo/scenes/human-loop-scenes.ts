import type { Scene } from '../shared/types'

export const scenes: Scene[] = [
  {
    id: 'human-1',
    windowType: 'code',
    windowProps: {
      fileName: 'ocean_analysis_v1.py',
      language: 'python',
      code: `import pandas as pd
import matplotlib.pyplot as plt

# Load ocean observation data
df = pd.read_csv("ocean_observations.csv")

# Basic correlation analysis
sst = df["sea_surface_temp"]
chl = df["chlorophyll_a"]

# Simple bar chart of monthly averages
monthly = df.groupby("month").mean()
fig, ax = plt.subplots(figsize=(10, 6))
ax.bar(monthly.index, monthly["sea_surface_temp"],
       color="steelblue", label="SST")
ax.set_xlabel("Month")
ax.set_ylabel("Temperature (C)")
ax.set_title("Monthly Average SST")
ax.legend()
plt.savefig("sst_monthly_bar.png", dpi=150)`,
      highlightLines: [13, 14, 15],
    },
    bubble: {
      speaker: 'ai',
      text: 'Generated initial analysis code — basic bar chart of monthly SST averages.',
    },
    duration: 4500,
  },
  {
    id: 'human-2',
    windowType: 'terminal',
    windowProps: {
      title: 'python — execution result',
      lines: [
        { text: 'python ocean_analysis_v1.py', type: 'command' },
        { text: '', type: 'output' },
        { text: 'Loading ocean_observations.csv... 15,847 records', type: 'output' },
        { text: 'Computing monthly averages...', type: 'output' },
        { text: '', type: 'output' },
        { text: 'Pearson correlation (SST vs CHL): r = 0.243', type: 'success' },
        { text: 'p-value: 0.0312 (significant at 0.05 level)', type: 'success' },
        { text: '', type: 'output' },
        { text: 'Figure saved: sst_monthly_bar.png', type: 'success' },
        { text: 'Weak positive correlation detected.', type: 'output' },
      ],
    },
    bubble: {
      speaker: 'system',
      text: 'Analysis complete — weak positive correlation (r=0.243). Bar chart generated.',
    },
    duration: 4000,
  },
  {
    id: 'human-3',
    windowType: 'browser',
    windowProps: {
      url: 'http://localhost:3000/review/analysis-v1',
      title: 'Researcher Feedback',
      content: `## Review: Ocean Analysis v1

### Feedback from Dr. Lim

> The bar chart only shows monthly averages — it doesn't reveal the **relationship** between SST and Chlorophyll-a.

### Requested Changes
- Replace bar chart with **scatter plot + regression line**
- Add **correlation heatmap** for all variables
- Include **seasonal distribution comparison**
- Show confidence intervals on the regression

### Priority: High
The current visualization is insufficient for the paper. We need to show the actual SST-CHL relationship.

---

> Feedback submitted. AI will revise the analysis.`,
    },
    bubble: {
      speaker: 'researcher',
      text: 'Bar chart is insufficient. Requesting scatter plot with regression, heatmap, and seasonal comparison.',
    },
    duration: 5000,
  },
  {
    id: 'human-4',
    windowType: 'code',
    windowProps: {
      fileName: 'ocean_analysis_v2.py',
      language: 'python',
      code: `import seaborn as sns
from scipy import stats

fig, axes = plt.subplots(2, 2, figsize=(14, 12))

# 1. Scatter plot with regression line
sns.regplot(x=sst, y=chl, ax=axes[0,0],
    scatter_kws={"alpha": 0.3, "s": 10},
    line_kws={"color": "red"})
axes[0,0].set_title("SST vs Chlorophyll-a")

# 2. Correlation heatmap (all variables)
corr = df[["sea_surface_temp", "chlorophyll_a",
    "salinity", "wind_speed"]].corr()
sns.heatmap(corr, annot=True, ax=axes[0,1],
    cmap="RdBu_r", center=0, vmin=-1, vmax=1)

# 3. Seasonal box plot comparison
seasons = df.assign(season=df.month.map(get_season))
sns.boxplot(x="season", y="chlorophyll_a",
    data=seasons, ax=axes[1,0], palette="Set2")

# 4. Joint distribution (KDE)
sns.kdeplot(x=sst, y=chl, ax=axes[1,1],
    fill=True, cmap="YlOrRd", levels=10)

plt.tight_layout()
plt.savefig("sst_chl_analysis_v2.png", dpi=300)`,
      highlightLines: [7, 8, 9, 15, 16, 21, 22, 25, 26],
    },
    bubble: {
      speaker: 'ai',
      text: 'Revised: 4-panel visualization — scatter+regression, heatmap, seasonal boxplot, and KDE distribution.',
    },
    duration: 5000,
  },
  {
    id: 'human-5',
    windowType: 'document',
    windowProps: {
      title: 'SST-Chlorophyll Analysis Report (Final)',
      content: `# SST-Chlorophyll Relationship Analysis

## Statistical Summary
- **Pearson r**: 0.243 (p = 0.031)
- **Regression**: CHL = 0.18 * SST + 0.42
- **95% CI**: [0.02, 0.34]

## Key Findings
- Weak but significant positive correlation
- Strongest in spring/summer months
- Salinity shows negligible correlation (r = 0.04)
- Wind speed inversely related to CHL (r = -0.31)

## Visualization Suite
- Scatter plot with regression line and CI
- Multi-variable correlation heatmap
- Seasonal chlorophyll distribution
- Joint SST-CHL density estimation

## Conclusion
SST is a modest predictor of chlorophyll-a concentration. Seasonal variation and wind-driven mixing are confounding factors that warrant further investigation.

---
> Approved by researcher. Human feedback improved analysis from 1 to 4 visualizations.`,
    },
    bubble: {
      speaker: 'researcher',
      text: 'Approved! Human feedback transformed a basic chart into publication-ready 4-panel analysis.',
    },
    duration: 4000,
  },
]

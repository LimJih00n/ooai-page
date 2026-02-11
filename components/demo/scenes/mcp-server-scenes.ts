import type { Scene } from '../shared/types'

export const scenes: Scene[] = [
  {
    id: 'mcp-1',
    windowType: 'terminal',
    windowProps: {
      title: 'mcp-server — gateway',
      lines: [
        { text: 'Starting MCP Gateway Server...', type: 'comment' },
        { text: '', type: 'output' },
        { text: 'npx @anthropic/mcp-server start --port 3001', type: 'command' },
        { text: '', type: 'output' },
        { text: 'MCP Gateway v2.1.0 initialized', type: 'output' },
        { text: 'Protocol: Model Context Protocol (stdio/SSE)', type: 'output' },
        { text: 'Listening on port 3001...', type: 'success' },
        { text: 'Waiting for tool connections...', type: 'output' },
      ],
    },
    bubble: {
      speaker: 'system',
      text: 'Starting the MCP Gateway — the bridge that connects AI to external tools and data sources.',
    },
    duration: 4000,
  },
  {
    id: 'mcp-2',
    windowType: 'terminal',
    windowProps: {
      title: 'mcp-server — tool registry',
      lines: [
        { text: 'Connected tools:', type: 'comment' },
        { text: '', type: 'output' },
        { text: '[1/4] filesystem   — File read/write/search operations', type: 'success' },
        { text: '[2/4] postgresql   — Database query & schema inspection', type: 'success' },
        { text: '[3/4] web_fetch    — HTTP requests & web scraping', type: 'success' },
        { text: '[4/4] ocean_api    — Copernicus/NOAA data access', type: 'success' },
        { text: '', type: 'output' },
        { text: '4 tools registered. AI can now invoke any tool.', type: 'success' },
        { text: 'Access control: role-based permissions active', type: 'output' },
      ],
    },
    bubble: {
      speaker: 'ai',
      text: '4 external tools connected via MCP — filesystem, database, web, and ocean data API.',
    },
    duration: 4000,
  },
  {
    id: 'mcp-3',
    windowType: 'code',
    windowProps: {
      fileName: 'mcp.json',
      language: 'json',
      code: `{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["@anthropic/mcp-filesystem", "/data"],
      "permissions": ["read", "write"]
    },
    "postgresql": {
      "command": "npx",
      "args": ["@anthropic/mcp-postgresql"],
      "env": { "DB_URL": "postgres://..." }
    },
    "ocean_api": {
      "command": "python3",
      "args": ["ocean_mcp_server.py"],
      "permissions": ["copernicus", "noaa"]
    }
  }
}`,
      highlightLines: [5, 11, 15],
    },
    bubble: {
      speaker: 'system',
      text: 'Each tool has explicit permissions defined in mcp.json — controlling exactly what AI can access.',
    },
    duration: 4500,
  },
  {
    id: 'mcp-4',
    windowType: 'terminal',
    windowProps: {
      title: 'mcp-server — live execution',
      lines: [
        { text: 'AI Request: "Get latest SST data and store analysis"', type: 'comment' },
        { text: '', type: 'output' },
        { text: '[ocean_api]  → Fetching SST from Copernicus CMEMS...', type: 'output' },
        { text: '[ocean_api]  ← 2.3GB NetCDF received (720x1440 grid)', type: 'success' },
        { text: '[filesystem] → Writing to /data/sst_2025.nc...', type: 'output' },
        { text: '[filesystem] ← File saved (2.3GB)', type: 'success' },
        { text: '[postgresql] → INSERT INTO analyses (type, result)...', type: 'output' },
        { text: '[postgresql] ← Row inserted (id: 1847)', type: 'success' },
        { text: '', type: 'output' },
        { text: 'Pipeline: ocean_api -> filesystem -> postgresql', type: 'success' },
      ],
    },
    bubble: {
      speaker: 'ai',
      text: 'AI automatically chains tools: fetch ocean data, save to filesystem, record in database.',
    },
    duration: 5000,
  },
  {
    id: 'mcp-5',
    windowType: 'browser',
    windowProps: {
      url: 'http://localhost:3001/api/status',
      title: 'MCP Server Status',
      content: `## MCP Gateway — Execution Summary

### Request Completed
- **Status**: Success
- **Tools Used**: 4 of 4
- **Total Time**: 3.2 seconds

### Tool Chain
- \`ocean_api\` — Downloaded SST dataset (2.3GB)
- \`filesystem\` — Saved to local storage
- \`postgresql\` — Recorded analysis metadata

### Statistics
- **API Calls**: 7
- **Data Transferred**: 2.3GB
- **Errors**: 0

---

> MCP enables AI to orchestrate external tools with fine-grained access control`,
    },
    bubble: {
      speaker: 'system',
      text: '4 tools orchestrated seamlessly — ocean data fetched, stored, and cataloged in one request!',
    },
    duration: 4000,
  },
]

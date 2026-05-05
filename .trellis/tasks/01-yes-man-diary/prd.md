# Yes Man Diary — 产品需求文档 (PRD)

> **状态**: Ready for Development  
> **创建日期**: 2026-05-05  
> **目标用户**: 个人使用  
> **设计风格**: 轻松活泼，电影海报风格（亮黄 `#FFD700` + 活力橙 `#FF6B35` + 深黑 `#1A1A1A`）

---

## 1. Overview

《Yes Man》主题个人挑战日记网站。每天获得一件小事推荐去勇敢尝试，也可以自己记录今天的"Yes 时刻"。支持公开/私密双模式、历史回顾统计、分享海报生成。

## 2. Tech Stack

| 层级 | 技术 | 用途 |
|------|------|------|
| Framework | Next.js 14 (App Router) | React 全栈框架 |
| Language | TypeScript | 类型安全 |
| Styling | Tailwind CSS | 原子化样式 |
| Animation | Framer Motion | 交互动画 |
| Database | Turso (libSQL / Serverless SQLite) | 数据持久化 |
| DB Client | `@libsql/client` | 连接 Turso |
| Deployment | Vercel (GitHub auto-deploy) | 自动部署 |
| Icons | Lucide React | 图标库 |
| Poster | `html-to-image` (dom-to-image-more) | DOM 转图片下载 |

## 3. Database Schema (Turso SQLite)

### Table: `moments`

```sql
CREATE TABLE IF NOT EXISTS moments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content TEXT NOT NULL,              -- 日记内容（如"今天学了 Neo4j"）
  category TEXT DEFAULT 'custom',     -- 分类：social/food/explore/creative/health/learning/custom
  source TEXT DEFAULT 'custom',       -- 来源：recommended（系统推荐）/ custom（用户自定义）
  is_public BOOLEAN DEFAULT 1,        -- 1=公开  0=私密
  completed_at TEXT,                  -- ISO 8601 完成日期
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_moments_completed ON moments(completed_at);
CREATE INDEX IF NOT EXISTS idx_moments_public ON moments(is_public);
CREATE INDEX IF NOT EXISTS idx_moments_category ON moments(category);
```

### 预置挑战库：`data/challenges.json`

静态 JSON 文件，50+ 条中文挑战，首页随机展示。分类：social（社交）、food（美食）、explore（探索）、creative（创意）、health（健康）、learning（学习）。

```json
[
  { "id": 1, "content": "和便利店的店员多聊一句", "category": "social" },
  { "id": 2, "content": "走一条从未走过的路回家", "category": "explore" },
  { "id": 3, "content": "尝试一种从未吃过的水果", "category": "food" },
  { "id": 4, "content": "画一幅涂鸦，不管好坏", "category": "creative" },
  { "id": 5, "content": "做 10 个俯卧撑", "category": "health" },
  { "id": 6, "content": "花 30 分钟学一个新概念", "category": "learning" }
]
```

## 4. API Routes (Next.js Route Handlers)

| Route | Method | Auth | 说明 |
|-------|--------|------|------|
| `/api/moments` | GET | 无 | 获取公开记录，支持 `?month=YYYY-MM` 筛选 |
| `/api/moments` | POST | 无 | 创建新记录 |
| `/api/moments/private` | GET | Password Header | 获取私密记录 |
| `/api/stats` | GET | 无 | 统计聚合 |
| `/api/challenges/random` | GET | 无 | 返回随机预置挑战 |

### 密码验证逻辑

```typescript
const PRIVATE_PASSWORD = process.env.PRIVATE_ACCESS_PASSWORD;

export async function GET(request: Request) {
  const password = request.headers.get('x-private-password');
  if (password !== PRIVATE_PASSWORD) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // 查询 Turso 返回 is_public=0 的记录
}
```

## 5. Pages & Routes

| Route | 页面功能 | 核心组件 |
|-------|---------|---------|
| `/` | 首页：今日推荐挑战 + 快速打卡 + 自定义记录 | `ChallengeCard`, `MomentForm` |
| `/timeline` | 时间线：公开记录按月分组 | `TimelineGroup`, `MomentItem` |
| `/stats` | 统计页：年度/月度柱状图 + 分类饼图 + 连续打卡 | `MonthlyChart`, `CategoryPie`, `StreakCounter` |
| `/private` | 私密空间：密码验证 → 私密记录 | `PasswordGate`, `PrivateTimeline` |
| `/share/[id]` | 分享海报页：单条记录海报底版 | `PosterVertical`, `PosterSquare` |

## 6. Environment Variables

```env
# Turso 数据库
TURSO_DATABASE_URL=libsql://yesman-sparkchase.aws-ap-northeast-1.turso.io
TURSO_AUTH_TOKEN=<JWT Token>

# 私密空间访问密码（自行设置）
PRIVATE_ACCESS_PASSWORD=<your-password>
```

**注意**：所有敏感变量只在服务端 API Route 中使用，前端不可访问。

## 7. Core Features

### 7.1 每日推荐挑战

- 首页加载时从 `data/challenges.json` 随机抽取一条
- "🔄 换一条"按钮重新随机
- "✅ 接受挑战" → 直接 POST /api/moments（`source='recommended'`）
- 动画：卡片像电影票从机器"吐"出（Framer Motion `y: -50 → 0`）

### 7.2 自定义记录（核心）

- Textarea 输入框，placeholder="今天你对什么说了 Yes？"
- 分类 Pills：社交 / 美食 / 探索 / 创意 / 健康 / 学习 / 自定义
- 公开/私密 Toggle
- 提交 → POST /api/moments → 成功动画（撒花/对勾放大）

### 7.3 私密空间

- `/private` 页面：深色背景密码输入框
- 输入正确密码 → sessionStorage 标记 `private_access=1`
- API 每次带 `x-private-password` Header，服务端实时验证
- 展示所有 `is_public=0` 的记录

### 7.4 历史回顾

**Timeline (`/timeline`)**：
- 按 `YYYY年MM月` 分组折叠面板
- 月内记录列表，右侧数量徽章

**Stats (`/stats`)**：
- 年度柱状图：12 个月完成数
- 分类饼图：SVG 绘制各 category 占比
- 连续打卡天数（Streak）：SQL 查连续日期
- KPI 卡片：总完成数 / 本月数 / 连续天数

### 7.5 分享海报（两种样式）

触发：记录卡片右下角 "📤 分享" 按钮。

**竖版 (375×667) — 电影票根风格**：
- 顶部：Yes Man Logo + 锯齿撕裂边（CSS `clip-path`）
- 中间：场记板样式展示日期 + 内容
- 底部：二维码（指向 `/share/[id]`）+ "你今天说 Yes 了吗？"
- 配色：亮黄底 + 黑粗体字

**方版 (600×600) — 社交媒体卡片**：
- 居中大字排版内容
- 日期 + 分类标签
- 底部品牌条

技术：`html-to-image` 将 DOM 节点转 PNG 下载。

## 8. Animation & Interaction

- 卡片进入：`initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}`
- 打卡成功：Confetti 效果 + 按钮变 ✅
- 分类切换：Pills 色块滑动（`transition-all`）
- 海报生成：Loading 旋转 → 弹窗预览 → 下载

## 9. Deployment

```
本地开发 → git push origin main → GitHub → Vercel Auto-Deploy → 线上站点
                                      ↓
                              Environment Variables
                              (TURSO_URL, TURSO_TOKEN, PASSWORD)
```

- **Vercel 配置**：Build = `next build`，Output = `.next`，Node 18.x+
- **可选 GitHub Actions**：`.github/workflows/vercel-deploy.yml`（分支策略控制）
- **推荐**：直接用 Vercel 自带 Git Integration 更简单

## 10. File Structure

```
yes-man/
├── app/
│   ├── page.tsx                    # 首页
│   ├── timeline/page.tsx           # 时间线
│   ├── stats/page.tsx              # 统计
│   ├── private/page.tsx            # 私密空间
│   ├── share/[id]/page.tsx         # 分享海报页
│   ├── api/
│   │   ├── moments/route.ts        # GET/POST
│   │   ├── moments/private/route.ts # GET 私密
│   │   ├── stats/route.ts          # GET 统计
│   │   └── challenges/random/route.ts # GET 随机
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                         # Button, Card, Input, Badge
│   ├── challenge/
│   │   ├── ChallengeCard.tsx
│   │   └── ChallengePicker.tsx
│   ├── moments/
│   │   ├── MomentForm.tsx
│   │   ├── MomentItem.tsx
│   │   └── MomentList.tsx
│   ├── stats/
│   │   ├── MonthlyChart.tsx
│   │   ├── CategoryPie.tsx
│   │   └── StreakCounter.tsx
│   ├── share/
│   │   ├── PosterVertical.tsx
│   │   ├── PosterSquare.tsx
│   │   └── ShareModal.tsx
│   └── layout/
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       └── PasswordGate.tsx
├── lib/
│   ├── db.ts                       # Turso client
│   ├── utils.ts                    # 日期、分类映射
│   └── constants.ts                # 常量定义
├── data/
│   └── challenges.json             # 预置挑战库
├── public/
│   └── images/
├── .env.local                      # gitignored
├── .env.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 11. Data Flow

```
[首页]
  → 读取 challenges.json 随机展示推荐
  → 点击"接受挑战" → POST /api/moments → 写入 Turso

[自定义记录]
  → 填写表单 → 选择分类/公开私密 → POST /api/moments → 写入 Turso

[Timeline]
  → GET /api/moments?month=YYYY-MM → 返回公开记录 → 按月分组渲染

[私密空间]
  → 输入密码 → GET /api/moments/private (Header) → 验证后返回私密记录

[Stats]
  → GET /api/stats → SQL 聚合 → 渲染图表
```

## 12. Security

- `PRIVATE_ACCESS_PASSWORD` 和 `TURSO_AUTH_TOKEN` 仅存于服务端环境变量
- 所有数据库操作通过 API Route，禁止前端直连 Turso
- `.env.local` 已加入 `.gitignore`
- `/share/[id]` 只展示 `is_public=1` 记录

## 13. Milestones

| 阶段 | 内容 |
|------|------|
| M1 | 项目初始化 + Turso 连接 + 数据库 Schema |
| M2 | 首页：推荐挑战卡片 + 自定义记录表单 |
| M3 | API：CRUD moments + Timeline 页面 |
| M4 | Stats 统计页 + 连续打卡 |
| M5 | 私密空间 + 密码验证 |
| M6 | 分享海报（两种样式）+ 下载 |
| M7 | 部署配置 + Vercel 环境变量 |

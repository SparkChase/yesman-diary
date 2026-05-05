# Yes Man Diary — 勇敢说 Yes

> **Slogan**: 每天一件小事，勇敢尝试，记录你的 Yes 时刻。

受到电影《Yes Man》启发，这是一个帮助你走出舒适区、勇敢尝试新事物的个人日记应用。每天推荐一件新鲜小事，也可以记录你自己的「Yes 时刻」——那些你本可以说 No，但最终选择了 Yes 的瞬间。

---

## 功能

- **每日挑战推荐**：从 50+ 条预置小事中随机抽取（社交/美食/探索/创意/健康/学习）
- **自定义 Yes 时刻**：记录你自己完成的挑战，如"今天学了 Neo4j"
- **公开 / 私密双模式**：每条记录可选择公开展示或放入密码保护的私密空间
- **时间线回顾**：按月分组查看所有公开的 Yes 时刻
- **数据统计**：近 12 个月完成数柱状图、分类占比饼图、连续打卡天数
- **分享海报**：竖版电影票根 / 方形社交媒体卡片两种样式，一键下载 PNG

---

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **数据库**: Turso (Serverless SQLite)
- **部署**: Vercel

---

## 本地启动

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制模板文件：

```bash
cp .env.example .env.local
```

编辑 `.env.local`，填入你的 Turso 数据库凭据和私密密码：

```env
TURSO_DATABASE_URL=libsql://your-db.turso.io
TURSO_AUTH_TOKEN=your-token-here
PRIVATE_ACCESS_PASSWORD=your-secret-password
```

> **Turso 数据库获取方式**：
> 1. 注册 [Turso](https://turso.tech)
> 2. 创建数据库：`turso db create yesman`
> 3. 获取 URL：`turso db show yesman`
> 4. 获取 Token：`turso db tokens create yesman`

### 3. 初始化数据库

首次运行需要创建表结构。在项目根目录执行：

```bash
npx tsx scripts/init-db.ts
```

如果没有 `tsx`，先安装：`npm install -g tsx`

或者你可以直接启动应用后，调用一次自动初始化接口（可选）。

### 4. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

---

## 部署到 Vercel

### 方式一：Vercel Git Integration（推荐）

1. 将代码推送到 GitHub
2. 在 [Vercel Dashboard](https://vercel.com) 点击 **Add New Project**
3. 导入 GitHub 仓库
4. 在 **Environment Variables** 中添加：
   - `TURSO_DATABASE_URL`
   - `TURSO_AUTH_TOKEN`
   - `PRIVATE_ACCESS_PASSWORD`
5. 点击 Deploy

### 方式二：GitHub Actions

项目已配置 `.github/workflows/deploy.yml`，需要在 GitHub 仓库的 **Settings → Secrets and variables → Actions** 中添加：

- `TURSO_DATABASE_URL`
- `TURSO_AUTH_TOKEN`
- `PRIVATE_ACCESS_PASSWORD`
- `VERCEL_TOKEN` — 通过 `vercel tokens create` 获取
- `VERCEL_ORG_ID` — 通过 `vercel link` 后查看 `.vercel/project.json`
- `VERCEL_PROJECT_ID` — 同上

每次 `git push` 到 `main` 分支会自动部署到生产环境。

---

## 脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 本地开发 |
| `npm run build` | 构建生产版本 |
| `npm run lint` | ESLint 检查 |
| `npm run typecheck` | TypeScript 类型检查 |

---

## 项目结构

```
yes-man/
├── app/
│   ├── page.tsx              # 首页：挑战推荐 + 记录表单
│   ├── timeline/page.tsx     # 公开时间线
│   ├── stats/page.tsx        # 统计页
│   ├── private/page.tsx      # 私密空间
│   ├── share/[id]/page.tsx   # 分享海报页
│   └── api/                  # API 路由
├── components/
│   ├── challenge/            # 挑战卡片
│   ├── moments/              # 记录表单 + 列表
│   ├── stats/                # 统计图表
│   ├── share/                # 海报组件
│   └── layout/               # 导航栏 / 页脚
├── lib/
│   ├── db.ts                 # Turso 客户端
│   ├── actions.ts            # 数据库操作
│   ├── stats.ts              # 统计查询
│   ├── constants.ts          # 类型 / 常量
│   └── utils.ts              # 工具函数
├── data/
│   └── challenges.ts         # 50+ 预置挑战
└── .github/workflows/        # 自动部署
```

---

## License

MIT

# Yes Man Diary 部署指南

## 环境变量配置

在 Vercel Dashboard → Project Settings → Environment Variables 中添加：

| 变量名 | 说明 | 来源 |
|--------|------|------|
| `TURSO_DATABASE_URL` | Turso 数据库 URL | Turso Dashboard |
| `TURSO_AUTH_TOKEN` | Turso 访问令牌 | Turso CLI 生成 |
| `PRIVATE_ACCESS_PASSWORD` | 私密空间访问密码 | 自行设置 |

## 部署方式

### 方式一：Vercel Git Integration（推荐）

1. 在 [Vercel](https://vercel.com) 导入 GitHub 仓库
2. 配置上述 Environment Variables
3. 每次 `git push` 自动部署

### 方式二：GitHub Actions

如果配置了 `.github/workflows/deploy.yml`，需要额外在 GitHub Secrets 中添加：

- `VERCEL_TOKEN` — Vercel Personal Access Token
- `VERCEL_ORG_ID` — Vercel Team/User ID
- `VERCEL_PROJECT_ID` — Vercel Project ID

获取方式：
```bash
npm i -g vercel
vercel login
vercel link
# 查看 .vercel/project.json 获取 orgId 和 projectId
vercel tokens create
```

## 数据库初始化

首次部署后，需要初始化数据库表结构。可以在本地执行：

```bash
# 设置环境变量后运行
npx tsx scripts/init-db.ts
```

或者创建一个一次性 API 调用来初始化。

## 本地开发

```bash
# 1. 安装依赖
npm install

# 2. 配置环境变量
cp .env.example .env.local
# 编辑 .env.local 填入你的 Turso 凭据

# 3. 启动开发服务器
npm run dev

# 4. 访问 http://localhost:3000
```

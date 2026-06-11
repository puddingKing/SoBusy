# 无聊

当你感到无聊时，打开它，说说此刻的心情——它会为你推荐书单、音乐或影像。

## 功能

- 用自然语言描述心情或想法
- 根据心境推荐书籍、音乐、视频
- 内置精选内容库，无需联网即可使用
- 可选配置 AI API，获得更个性化的推荐

## 开发

```bash
# 安装依赖
yarn install

# 编译 Electron 主进程
yarn build

# 开发模式（先启动 Vite，再启动 Electron）
yarn electron:dev
```

如果只想在浏览器中预览 UI：

```bash
yarn dev
```

## 打包

```bash
yarn electron:build
```

安装包输出在 `release/` 目录。

## AI 配置（可选）

在应用「设置」中填入：

| 字段 | 说明 |
|------|------|
| API Key | OpenAI 或兼容服务的密钥 |
| API 地址 | 默认 `https://api.openai.com/v1` |
| 模型 | 默认 `gpt-4o-mini` |

未配置时，应用会根据关键词匹配本地精选库进行推荐。

## 技术栈

- Electron — 桌面应用
- React + TypeScript — 界面
- Vite — 构建工具
- Tailwind CSS — 样式

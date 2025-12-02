# 更新日志

<Timeline>

## 2025-12-02 (v0.3.4)

### 新增
- **博客系统**：
    - 实现博客首页 `BlogIndex.vue`，支持文章列表展示及作者信息显示。
    - 新增 `authors.json` 数据文件，用于统一管理作者元数据（头像、链接等）。
    - 配置 `/blog/` 专属侧边栏路由，优化博客阅读体验。

### 修复
- **构建修复**：
    - 修复 `campus-life/scholarship.md` 中未闭合的 `<br>` 标签。
    - 修复 `general-skills/tools.md` 中 HTML 缩进导致的解析错误。
- **类型定义**：新增 `types.d.ts` 声明文件，解决 `*.data.mjs` 虚拟模块的 TypeScript 报错。

## 2025-11-30 (v0.3.3)

### 新增
- **高级组件指南**：新增页面 `community-hub/advanced-components.md`，整理 Markdown 扩展语法（警告块、数学公式、图表）及 Vue 组件嵌入示例（如 `Tip`, `ContributorList`）。
- **时间轴组件**：新建 `Timeline.vue` 组件，实现左侧垂直线条和时间节点圆点样式，并应用于更新日志页面。

### 修复
- **作者信息**：重构 `theme/index.ts`，使用 Layout 插槽 (`doc-footer-before`) 显式注入 `Author` 组件，确保在文章底部正确显示。
- **Logo 显示**：修复页眉 Logo 不显示的问题，支持从 `config.mts` 读取配置，并优化了 `Header` 组件的样式。
- **构建修复**：修复 `advanced-components.md` 中 `movie.mp4` 无法解析导致的构建错误。

### 优化
- **主题注册**：统一在 `theme/index.ts` 全局注册 `Tip`、`Dropdown`、`MemberList`、`ContributorList`、`Timeline` 等组件。
- **布局结构**：将 `Header` 和 `Footer` 组件注册到对应 Layout 插槽 (`doc-before`, `doc-after`)。

## 2025-11-30 (v0.3.2)

### 重构
- **目录结构优化**：将 `campus-life` 目录下文件按功能模块（新生入学、学业规划、生活社交、梦想帮扶）进行子目录归档，提升文件组织清晰度。
- **配置同步**：更新 `config.mts` 侧边栏配置以适配新的目录结构。

### 修复
- **构建错误**：修复 Pinia 实例未正确挂载导致的构建报错 (`Cannot read properties of undefined (reading '_s')`)。
- **链接修复**：批量修正因目录移动导致的图片引用和跨文件链接失效问题。

### 优化
- **编辑器性能**：为 `MarkdownEditor` 组件增加防抖 (Debounce) 和资源清理机制，解决输入卡顿及内存泄漏问题。
- **404 页面**：重构 404 页面 (`NotFound.vue`)，移除重型 3D 动画，采用轻量化响应式设计。

### 新增
- **UI 示例**：新增 `examples/ui-grid-demo.md`，展示响应式网格、特性网格及横向滚动布局。
- **API 示例**：完善 `examples/api-examples.md`，增加 VitePress Runtime API (`useData`) 的详细使用演示。

## 2025-11-30 (v0.3.1)

### 新增
- **Markdown 指南**：新增全功能语法手册，涵盖基础语法与 VitePress 扩展语法（数学公式、图表、提示块等）。
- **在线编辑器**：集成实时预览编辑器，支持贡献者在线练习 Markdown 语法。

### 优化
- **语法补全**：补充了转义字符、内嵌 HTML、差异对比代码块等详细说明。

## 2025-11-29 (v0.3.0)

### 重构与优化
- **目录结构同步**：参照主仓库标准，重构了 `campus-life`、`academic-resources`、`general-skills` 等核心目录结构。
- **路由修复**：全面修复 `.vitepress/config.mts` 中的侧边栏配置，解决了父级菜单无法点击的问题，移除了无效链接（如 `ui-card-grid`）。
- **构建修复**：修复了 PowerShell 语法高亮配置导致的构建警告。

### 内容调整
- **文件归档**：新建 `examples/` 目录归档演示文件，新建 `blog/` 目录归档博客文章。
- **索引页补充**：新增了“梦想帮扶”、“学术资源-资源”、“通用技能-工具”等板块的索引页 (`index.md`)，优化导航体验。
- **贡献指南**：更新贡献指南侧边栏，补充了 API 示例和组件测试页面的入口。

## 计划中 (未发布)

### 新增
- 项目初始化
- 基础文档结构
- 首页设计
- 贡献指南

### 计划中
- 完善各章节内容
- 添加更多实用工具
- 优化网站设计
- 建立社区

## 2025-01-XX (v0.2.1)

### 新增
- 项目基础架构
- VitePress 配置
- 基础文档模板

### 改进
- 优化项目结构
- 完善开发环境

### 修复
- 修复依赖问题
- 优化构建配置

</Timeline>

---

*更多历史版本请查看 GitHub 发布页面。*
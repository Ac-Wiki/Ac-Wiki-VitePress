---
author: [Ac-Wiki]
---
<script setup>
import ContributorList from '/.vitepress/components/ContributorList.vue'
</script>

# 关于我们

## 项目简介

Ac-Wiki 是一个由学生自发组织的公益性学术生活百科项目。我们致力于为大学生提供全面、实用的校园生活指导和学习资源。

## 🔊 声明

1. 本项目完全为自发组织的公益项目，我们随时欢迎您的参与和使用，并对您的付出与建议表达衷心的感谢

2. 本项目英文名称 AcWiki 中，Ac 为 Academy（学术）的简称，Wiki 意为百科，本项目与"AcFun",信息奥赛中的"Accepted"等并无主观或客观上的联系

3. 本项目更新的信息 / 内容 / 文件等资料，可能来自贡献者本人或各类已有书籍 / 资料 / 文献，同时会积极的在互联网中引用，我们秉持尊重原则，会积极标明引用情况，引用情况请参阅相关页面注释

4. 这是一个用爱发电的项目，因此更新频率及生命周期可能无法保证，我们特别呼吁愿意贡献 / 有过 Wiki 编辑经验 / 各行业专家参与到项目的维护与完善中，本着自愿参与原则，我们将对贡献者在 GitHub Profile 页面展示致谢

5. 频道关联群组[TG](https://t.me/AcFourm)/[QQ](https://qm.qq.com/q/rmBHBLvpew) 用作维护组与用户交流的场所，欢迎建言献策，友好沟通，群内交流并无过多约束，请理性讨论

6. 本项目并不局限于此平台，考虑到使用者群体，我们后期会积极建立各式网站，并会迁移已有的更新内容

# 录结构树


```markdown
Ac-Wiki
├── .vitepress                  # VitePress 核心配置与资源
│   ├── components              # 自定义 Vue 组件
│   │   ├── Author.vue          # 作者信息卡片组件
│   │   ├── BlogIndex.vue       # 博客首页列表组件
│   │   ├── Timeline.vue        # 更新日志时间轴组件
│   │   ├── MarkdownEditor.vue  # 在线 Markdown 编辑器
│   │   └── ...                 # 其他 UI 组件 (Header, Footer, Tip 等)
│   ├── data                    # 数据源与加载器
│   │   ├── authors.json        # [新增] 博客作者元数据
│   │   ├── blog.data.mts       # [新增] 博客文章自动加载器
│   │   ├── archive.data.mts    # 归档数据加载器
│   │   └── members.json        # 社区成员数据
│   ├── theme                   # 主题定制
│   │   ├── index.ts            # 主题入口 (组件注册、布局插槽)
│   │   └── style.css           # 全局样式重写
│   └── config.mts              # 站点主配置文件 (导航、侧边栏、插件)
├── blog                        # [新增] 博客板块
│   ├── posts                   # 博客文章存放目录
│   └── index.md                # 博客首页 (挂载 BlogIndex 组件)
├── community-hub               # 社区中心
│   ├── changelog.md            # 更新日志
│   ├── contributing.md         # 贡献指南
│   └── ...
├── campus-life                 # 校园生活文档
├── academic-resources          # 学术资源文档
├── general-skills              # 通用技能文档
├── examples                    # 功能演示与示例
├── public                      # 静态资源 (图片、图标)
├── types.d.ts                  # [新增] TypeScript 类型声明 (*.data.mjs)
├── package.json                # 项目依赖与脚本
└── index.md                    # 网站首页
```




## 技术栈

- **前端框架**：Vue.js 3
- **静态站点生成器**：VitePress
- **构建工具**：Vite
- **包管理器**：pnpm
- **代码托管**：GitHub

## 项目历史

- **2025年1月** - 项目启动，基础架构搭建
- **计划中** - 内容完善，社区建设

## 联系我们

- **QQ 群**：https://qm.qq.com/q/WJI3hgBcm4
- **邮箱**：待创建
- **GitHub**：[项目地址]

### 贡献者



<!-- markdownlint-disable-next-line MD033 -->
<!-- <member-list :show-newest-num="9" /> -->

感谢所有参与到开发/测试中的朋友们，是大家的帮助让 AcWiki 越来越好！ (*´▽ ｀) ノノ

#### 仓库贡献者（来自 UNGH）

将通过 UNGH API 实时拉取 https://github.com/ac-wiki/ac-wiki 的贡献者列表
<ContributorList owner="ac-wiki" repo="ac-wiki" />

<!-- markdownlint-disable-next-line MD033 -->
<style scoped>
/* Hide MemberList grade tabs (scrollcheck-x) only on this page */
.scrollcheck-x { display: none !important; }
</style>

---

[![Star History Chart](https://api.star-history.com/svg?repos=Ac-Wiki/AcWiKi&type=Date)](https://star-history.com/#Ac-Wiki/AcWiKi&Date)

## 📎 引用与致谢

### 方山厨子

[《成年人社会生活常识课》](https://www.bilibili.com/video/BV1eWxneME3Q) - 提供了大量实用的社会生活知识，是本项目重要的参考资源。
[访问主页](https://space.bilibili.com/274459325)

- [西邮 Wiki](https://wiki.cooo.site/) - 为我们提供了宝贵的参考
- [VitePress](https://vitepress.dev/) - 优秀的静态站点生成器
- 所有为项目做出贡献的同学

---


*2025年1月* 


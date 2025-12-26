# 高级组件指南

本文档介绍了 Ac-Wiki 中可用的高级组件和 Markdown 扩展语法。

## Markdown 扩展语法

### 提示块 (Alerts)

::: tip 提示
这是一个提示块。
:::

::: info 信息
这是一个信息块。
:::

::: warning 警告
这是一个警告块。
:::

::: danger 危险
这是一个危险块。
:::

### 数学公式

支持使用 KaTeX 编写数学公式。

行内公式：$E=mc^2$

块级公式：

$$
\frac{1}{\Bigl(\sqrt{\phi \sqrt{5}}-\phi\Bigr) e^{\frac25 \pi}} = 1+\frac{e^{-2\pi}} {1+\frac{e^{-4\pi}} {1+\frac{e^{-6\pi}} {1+\frac{e^{-8\pi}} {1+\cdots} } } }
$$

## Vue 组件

### Tip 组件

自定义的 Tip 组件，支持复制功能。

<Tip copy>
这是一段可以复制的文本。
</Tip>

### 贡献者列表 (ContributorList)

显示项目的贡献者列表。

<ContributorList />

### 成员列表 (MemberList)

显示成员列表。

<MemberList />

## 常见问题修复

### 视频资源引用

如果在构建时遇到 `movie.mp4` 无法解析的问题，请将其放入代码块中展示，而不是直接作为 HTML 标签引用，或者确保资源存在于 `public` 目录中。

```html
<video src="/movie.mp4" controls></video>
```

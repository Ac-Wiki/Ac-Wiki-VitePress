---
outline: deep
---

# VitePress 运行时 API 示例

本页面展示了如何在 Ac-Wiki 中使用 VitePress 的 `useData()` API 获取项目配置和当前页面信息。这对于开发自定义组件非常有用。

<script setup>
import { useData } from 'vitepress'

const { site, theme, page, frontmatter, lang, dir } = useData()
</script>

## 1. 站点信息 (Site Data)

获取 `config.mts` 中配置的全局站点信息。

- **项目标题**: `{{ site.title }}`
- **项目描述**: `{{ site.description }}`
- **当前语言**: `{{ lang }}`
- **文本方向**: `{{ dir }}`

```js
const { site, lang, dir } = useData()
console.log(site.value.title) // "Ac-Wiki"
```

::: details 点击查看完整 Site Data 对象
<div class="json-container">
<pre>{{ site }}</pre>
</div>
:::

## 2. 主题配置 (Theme Config)

获取当前生效的主题配置（导航栏、侧边栏、社交链接等）。

- **Logo**: `{{ theme.logo }}`
- **最后更新时间显示文本**: `{{ theme.lastUpdated?.text }}`
- **编辑链接文本**: `{{ theme.editLink?.text }}`

### 社交链接
<div v-for="link in theme.socialLinks" :key="link.link" class="social-link-item">
  - <b>{{ link.icon }}</b>: {{ link.link }}
</div>

```js
const { theme } = useData()
// 获取导航栏配置
console.log(theme.value.nav)
```

::: details 点击查看完整 Theme Config 对象
<div class="json-container">
<pre>{{ theme }}</pre>
</div>
:::

## 3. 页面信息 (Page Data)

获取当前页面的元数据。

- **页面标题**: `{{ page.title }}`
- **文件路径**: `{{ page.filePath }}`
- **相对路径**: `{{ page.relativePath }}`
- **最后更新时间**: `{{ page.lastUpdated ? new Date(page.lastUpdated).toLocaleString() : 'N/A' }}`

```js
const { page } = useData()
```

::: details 点击查看完整 Page Data 对象
<div class="json-container">
<pre>{{ page }}</pre>
</div>
:::

## 4. Frontmatter

获取当前 Markdown 文件顶部的 YAML 配置。

当前页面的 Frontmatter 配置：
<div class="json-container">
<pre>{{ frontmatter }}</pre>
</div>

```yaml
---
outline: deep
---
```

## 更多资源

- [VitePress Runtime API 文档](https://vitepress.dev/zh/reference/runtime-api)

# 图标演示页面

这个页面展示了如何在 Ac-Wiki 中使用 Iconify 图标。

## 基本用法

### 使用 Icon 组件

```vue
<Icon icon="mdi:home" />
<Icon icon="mdi:github" />
<Icon icon="mdi:heart" />
```

### 实际效果

- <Icon icon="mdi:home" /> 首页
- <Icon icon="mdi:github" /> GitHub
- <Icon icon="mdi:heart" /> 喜欢
- <Icon icon="mdi:star" /> 收藏
- <Icon icon="mdi:book-open-variant" /> 阅读

## 常用图标集合

### Material Design Icons (mdi)

- <Icon icon="mdi:school" /> 学校
- <Icon icon="mdi:account" /> 用户
- <Icon icon="mdi:settings" /> 设置
- <Icon icon="mdi:help-circle" /> 帮助
- <Icon icon="mdi:information" /> 信息

### Carbon Icons (carbon)

- <Icon icon="carbon:education" /> 教育
- <Icon icon="carbon:user-multiple" /> 用户组
- <Icon icon="carbon:document" /> 文档
- <Icon icon="carbon:search" /> 搜索
- <Icon icon="carbon:download" /> 下载

### Tabler Icons (tabler)

- <Icon icon="tabler:book" /> 书籍
- <Icon icon="tabler:graduation-cap" /> 毕业帽
- <Icon icon="tabler:users" /> 用户
- <Icon icon="tabler:tools" /> 工具
- <Icon icon="tabler:bulb" /> 灯泡

## 图标样式

### 不同大小

- <Icon icon="mdi:home" style="font-size: 1rem;" /> 小图标 (1rem)
- <Icon icon="mdi:home" style="font-size: 1.5rem;" /> 中图标 (1.5rem)
- <Icon icon="mdi:home" style="font-size: 2rem;" /> 大图标 (2rem)

### 不同颜色

- <Icon icon="mdi:heart" style="color: red;" /> 红色
- <Icon icon="mdi:star" style="color: gold;" /> 金色
- <Icon icon="mdi:check" style="color: green;" /> 绿色
- <Icon icon="mdi:alert" style="color: orange;" /> 橙色

## 在 Markdown 中使用

在 Markdown 文件中，您可以使用 HTML 标签来插入图标：

```html
<Icon icon="mdi:home" /> 首页链接
<Icon icon="mdi:github" /> GitHub 仓库
```

## 图标搜索

您可以在以下网站搜索更多图标：

- [Iconify](https://icon-sets.iconify.design/) - 图标集合
- [Material Design Icons](https://materialdesignicons.com/) - Material Design 图标
- [Tabler Icons](https://tabler-icons.io/) - Tabler 图标
- [Carbon Icons](https://carbondesignsystem.com/guidelines/icons/library/) - Carbon 图标

## 注意事项

1. 图标会自动继承父元素的颜色
2. 可以通过 CSS 自定义图标样式
3. 图标支持响应式设计
4. 建议使用语义化的图标名称

---

*更多图标使用示例，请参考 [Iconify 官方文档](https://iconify.design/docs/usage/vue/)* 
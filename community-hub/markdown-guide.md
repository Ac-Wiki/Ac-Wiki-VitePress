# Markdown 语法指南与在线编辑器

Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。Ac-Wiki 的所有文档均使用 Markdown 编写。

为了帮助贡献者快速上手，我们提供了这份简要的语法指南以及一个在线编辑器供您练习。

## 在线练习

您可以在下方的编辑器中尝试编写 Markdown，右侧会实时显示渲染结果。

<MarkdownEditor />

## 常用语法速查

### 标题

使用 `#` 号可表示 1-6 级标题。

```markdown
# 一级标题
## 二级标题
### 三级标题
```

### 段落与换行

段落之间使用空行进行分隔。

如果需要在段落内强制换行，可以在行尾添加**两个空格**然后回车，或者直接使用 `<br>` 标签。

```markdown
这是第一行，  
这是第二行（行尾有两个空格）。

这是新的一段。
```

### 文本样式

```markdown
**加粗文本**
*斜体文本*
~~删除线~~
`行内代码`
```

### 列表

无序列表使用 `-` 或 `*`：

```markdown
- 项目 1
- 项目 2
  - 子项目
```

有序列表使用数字加点：

```markdown
1. 第一项
2. 第二项
```

### 链接与图片

```markdown
[链接文字](https://example.com)

![图片描述](/logo.svg)
```

### 引用

使用 `>` 表示引用：

```markdown
> 这是一段引用文本
```

### 分隔线

使用三个或以上的星号 `*`、减号 `-` 或底线 `_` 来创建分隔线：

```markdown
---
***
___
```

### 代码块

使用三个反引号 \`\`\` 包裹代码块，并指定语言：

```markdown
\`\`\`javascript
console.log('Hello World');
\`\`\`
```

### 表格

```markdown
| 标题 1 | 标题 2 |
| :----- | :----- |
| 内容 1 | 内容 2 |
```

### 转义字符

如果您想显示 Markdown 的保留字符（如 `*`、`#` 等），可以在字符前添加反斜杠 `\`：

```markdown
\*这不是斜体\*
\# 这不是标题
```

### 内嵌 HTML

Markdown 兼容 HTML，您可以直接在文档中使用 HTML 标签：

```markdown
<b>加粗文本</b>
<span style="color:red">红色文本</span>
```

### 提示块 (Admonitions)

VitePress 支持特殊的提示块语法：

```markdown
::: info
这是一个信息提示块
:::

::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::
```

## VitePress 扩展语法

除了标准的 Markdown 语法，VitePress 还支持许多强大的扩展功能，让文档更加丰富。

### 1. 表情符号 (Emoji)

您可以直接输入表情符号，或者使用对应的短代码：

```markdown
:tada: :100: :rocket:
```

**效果：** :tada: :100: :rocket:

### 2. 目录 (Table of Contents)

使用 `[[TOC]]` 可以在当前位置插入一个目录：

```markdown
[[TOC]]
```

### 3. 折叠块 (Details)

使用 `::: details` 可以创建一个可折叠的内容块：

```markdown
::: details 点击查看详细内容
这里是隐藏的详细内容。
可以包含代码块、列表等任何 Markdown 内容。
:::
```

**效果：**

::: details 点击查看详细内容
这里是隐藏的详细内容。
可以包含代码块、列表等任何 Markdown 内容。
:::

### 4. 代码块扩展

#### 行高亮

在代码块语言后面指定行号即可高亮显示：

```markdown
\`\`\`js {1,3-4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
\`\`\`
```

#### 代码行号

VitePress 默认启用了行号显示（如果在配置中开启）。

#### 差异对比 (Diff)

使用 `diff` 语言标记来显示代码变更：

```markdown
\`\`\`diff
- remove this line
+ add this line
\`\`\`
```

#### 聚焦模式 (Focus)

使用 `// [!code focus]` 注释来聚焦特定代码行：

```markdown
\`\`\`js
console.log('Hello') // [!code focus]
console.log('World')
\`\`\`
```

### 5. 数学公式 (Math)

Ac-Wiki 已启用数学公式支持（基于 KaTeX）。使用 `$` 表示行内公式，`$$` 表示块级公式：

```markdown
行内公式：$E=mc^2$

块级公式：
$$
\frac{1}{2\pi}\int_{-\infty}^{\infty}e^{-\frac{x^2}{2}}dx
$$
```

**效果：**

行内公式：$E=mc^2$

块级公式：
$$
\frac{1}{2\pi}\int_{-\infty}^{\infty}e^{-\frac{x^2}{2}}dx
$$

### 6. 导入代码片段

您可以直接从文件中导入代码片段，避免复制粘贴：

```markdown
<<< @/package.json
```

还可以指定行数范围或高亮：

```markdown
<<< @/package.json{1-5}
```

### 7. 自定义容器标题

您可以自定义提示块的标题：

```markdown
::: danger 🚨 紧急注意
这是一个自定义标题的危险警告块。
:::
```

**效果：**

::: danger 🚨 紧急注意
这是一个自定义标题的危险警告块。
:::

## 更多资源

- [Markdown 官方教程](https://markdown.com.cn/basic-syntax/)
- [VitePress Markdown 扩展](https://vitepress.dev/zh/guide/markdown)

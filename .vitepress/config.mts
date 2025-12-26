import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress'
import markdownItAbbr from "markdown-it-abbr";
import markdownItFootnote from "markdown-it-footnote";
import markdownItAttrs from "markdown-it-attrs";
import markdownItAdmonition from "markdown-it-admonition";

// https://vitepress.dev/zh/reference/site-config
export default defineConfig({
    lang: 'zh-CN',
    title: 'Ac-Wiki',
    description: '学术生活百科 - 大学生的百科全书',
    lastUpdated: true,
    cleanUrls: false,

    head: [
        ['link', { rel: 'icon', href: '/logo.svg' }],
        ["script", { src: "/js/feedback.js" }],
        ["script", { src: "https://cn.vercount.one/js" }],
    ],

    themeConfig: {
        // https://vitepress.dev/zh/reference/default-theme-config
        logo: '/logo.svg',
        // siteTitle: '',
        nav: nav(),

        sidebar: {
            // 以首次匹配的侧边栏为主
            '/docs/campus-life/': campusLifeSidebar(),
            // 路径需要尾随斜杠
            '/docs/growth-path/': growthPathSidebar(),
            '/docs/academic-resources/': academicResourcesSidebar(),
            '/docs/general-skills/': generalSkillsSidebar(),
            '/docs/community-hub/': communityHubSidebar(),
            '/docs/examples/': communityHubSidebar(),
            '/docs/blog/': blogSidebar(),
            // 默认侧边栏
            '/': AcWikiSidebar(),
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/ac-wiki/ac-wiki' },
            // { icon: 'telegram', link: 'https://t.me/AcFourm' },
            { icon: 'qq', link: 'https://qm.qq.com/q/1ODUcQi9oQ' },
        ],

        // 本地搜索（MiniSearch）
        search: {
            provider: 'local',
        },

        externalLinkIcon: true,
        langMenuLabel: '切换语言',
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',
        sidebarMenuLabel: '菜单',
        outline: { level: [2, 3], label: '目录' },
        returnToTopLabel: '返回顶部',
        editLink: {
            pattern: 'https://github.com/ac-wiki/ac-wiki/blame/main/docs/:path',
            text: '在 GitHub 上编辑',
        },
        lastUpdated: {
            text: '更新于',
            formatOptions: { dateStyle: 'short', timeStyle: 'medium' },
        },
        docFooter: { prev: '上一篇', next: '下一篇' },

        footer: {
            message: '公益项目。与任何组织无关。Made with ❤.',
            copyright: `© ${new Date().getFullYear()} <a href="https://github.com/ac-wiki">Ac-Wiki 项目组</a>`,
        },
    },

    markdown: {
        math: true,
        config: (md) => {
            md.use(markdownItAbbr);
            md.use(markdownItFootnote);
            md.use(markdownItAttrs);
            md.use(markdownItAdmonition);
            
            // 将 ```pwsh 统一映射为 ```powershell，修复语法高亮回退为 txt 的问题
            const origFence = md.renderer.rules.fence
            md.renderer.rules.fence = function (tokens, idx, options, env, slf) {
                const token = tokens[idx]
                if (typeof token.info === 'string') {
                    const info = token.info.trim().toLowerCase()
                    if (info === 'pwsh') {
                        token.info = 'powershell'
                    }
                }
                return origFence
                    ? origFence(tokens, idx, options, env, slf)
                    : slf.renderToken(tokens, idx, options)
            }
        },
    },

    vite: {
        server: {
            allowedHosts: true,
        },
        optimizeDeps: {
            include: ['@iconify/vue']
        },
        build: {
            chunkSizeWarningLimit: 1000
        }
    },
    
    // 博客插件配置
    async transformPageData(pageData, context) {
        if (pageData.relativePath.startsWith("docs/blog/posts/")) {
            pageData.frontmatter.layout = "blog";
        }
    },
})

function nav(): DefaultTheme.NavItem[] {
    return [
        { text: '校园生活', link: '/docs/campus-life/', activeMatch: '^/docs/campus-life/' },
        { text: '学术资源', link: '/docs/academic-resources/', activeMatch: '^/docs/academic-resources/' },
        { text: '通用技能', link: '/docs/general-skills/', activeMatch: '^/docs/general-skills/' },
        { text: '成长路径', link: '/docs/growth-path/', activeMatch: '^/docs/growth-path/' },
        { text: '博客', link: '/docs/blog', activeMatch: '/docs/blog' },
        {
            text: '关于',
            items: [
                { text: '友情链接', link: '/docs/community-hub/links' },
                { text: '贡献指南', link: '/docs/community-hub/contribute' },
                { text: '更新日志', link: '/docs/community-hub/changelog' },
                { text: '关于我们', link: '/docs/community-hub/about' },
                { text: '关于wiki', link: '/docs/community-hub/about-wiki' },
            ],
        },
    ]
}
function AcWikiSidebar(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: 'Ac-Wiki',
            items: [
                { text: '写在开头', link: '/docs/overview' },
            ],
        },
    ]
}
function campusLifeSidebar(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: '校园生活',
            link: '/docs/campus-life/',
            collapsed: false,
            items: [
                {
                    text: '新生入学',
                    collapsed: false,
                    items: [
                        { text: '开学第 0 课', link: '/docs/campus-life/new-student/first-lesson-of-school' },
                        { text: '学生邮箱', link: '/docs/campus-life/new-student/student-email' },
                        { text: '图书馆使用', link: '/docs/campus-life/new-student/library' },
                        { text: '医保指南', link: '/docs/campus-life/new-student/medical-insurance' },
                    ]
                },
                {
                    text: '学业规划',
                    collapsed: false,
                    items: [
                        { text: '选课指南', link: '/docs/campus-life/academic-planning/different-courses' },
                        { text: '签到考勤', link: '/docs/campus-life/academic-planning/class-attendance' },
                        { text: '转专业指南', link: '/docs/campus-life/academic-planning/major-transfer-guide' },
                        { text: '辅修双学位', link: '/docs/campus-life/academic-planning/minor-or-dual-degree' },
                        { text: '国际交流', link: '/docs/campus-life/academic-planning/international-exchange' },
                    ]
                },
                {
                    text: '生活社交',
                    collapsed: false,
                    items: [
                        { text: '人际关系', link: '/docs/campus-life/social-life/social-connections' },
                        { text: '冲突解决', link: '/docs/campus-life/social-life/resolving-conflicts' },
                        { text: '脱单指南', link: '/docs/campus-life/social-life/getting-out-of-singleness' },
                    ]
                },
                {
                    text: '梦想帮扶',
                    link: '/docs/campus-life/dream-help/',
                    collapsed: false,
                    items: [
                        { text: '奖/助学金申请', link: '/docs/campus-life/dream-help/scholarship' },
                        { text: '勤工俭学申请', link: '/docs/campus-life/dream-help/work-study-program' },
                        { text: '国家助学贷款', link: '/docs/campus-life/dream-help/faq-national-student-loan' },
                    ],
                },
            ],
        },
    ]
}

function academicResourcesSidebar(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: '学术资源',
            link: '/docs/academic-resources/',
            collapsed: true,
            items: [
                { text: '学术研究和学术写作', link:  '/docs/academic-resources/academic-research-and-academic-writing' },
                { text: '关键概念', link: '/docs/academic-resources/some-key-concepts' },
                { text: '毕业论文（理学）', link: '/docs/academic-resources/thesis-bachelor-science' },
                {
                  text: '资源',
                  link: '/docs/academic-resources/resources',
                  items: [
                      { text: '获取资源', link: '/docs/academic-resources/how-to-get-resources' },
                      { text: '数学学习', link: '/docs/academic-resources/resources/math/learning-resources' },   
                  ],
                },
            ],
        },
    ]
}

function generalSkillsSidebar(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: '通用技能',
            link: '/docs/general-skills/',
            collapsed: true,
            items: [
                { text: '学生优惠', link: '/docs/general-skills/student-discounts' },
                { text: '银行账户与信用卡', link: '/docs/general-skills/bank-accounts-and-credit-cards' },
                { text: '搜索引擎', link: '/docs/general-skills/search-platforms' },
                {
                  text: '工具',
                  link: '/docs/general-skills/tools/',
                  items: [
                      {text: '效率软件', link: '/docs/general-skills/tools/efficiency' },
                      { 
                        text: '网络安全',
                        collapsed: true,
                        link: '/docs/general-skills/cyber-security/',
                        items: [
                            { text: '密码管理', link: '/docs/general-skills/tools/cyber-security/password_manage' },
                            { text: '隐私保护', link: '/docs/general-skills/tools/cyber-security/privacy' },
                        ],
                       },
                       { 
                        text: '奇技淫巧',
                        collapsed: true,
                        link: '/docs/general-skills/qi-ji-yin-qiao/',
                        items: [
                            { text: '校园跑', link: '/docs/general-skills/qi-ji-yin-qiao/campus-running' },
                            { text: '刷课', link: '/docs/general-skills/qi-ji-yin-qiao/pointless-courses' },

                        ],
                       },
                  ],
              },
                {
                  text: '学习',
                  link: '/docs/general-skills/study/',
                  items: [
                    { text: '考试和竞赛', link: '/docs/general-skills/study/study' },
                  ],
              },
                {
                  text: '生活技巧',
                  link: '/docs/general-skills/',
                  items: [
                      { text: '生活实用技巧', link: '/docs/general-skills/life-tips' },
                      { text: '保养手段', link: '/docs/general-skills/health' },
                      { text: '流行健康手册', link: '/docs/general-skills/health-when-travelling' },
                  ],
              },
                {
                  text: '就业',
                  link: '/docs/general-skills/recruit-exercitation',
                  items: [{ text: '企业文化', link: '/docs/general-skills/recruit-exercitation' },],
              },
                {
                  text: '方法论',
                  link: '/docs/general-skills/computer-basic/',
                  items: [
                      { 
                        text: '计算机基础',
                        
                        link: '/docs/general-skills/computer-basic/',
                        items: [
                            { 
                                text: '上网教程', 
                                collapsed: true,
                                items: [
                                    {
                                        text: '第一章：基础知识',
                                        collapsed: true,
                                        items: [
                                            { text: '内存与硬盘', link: '/docs/general-skills/computer-basic/SurfingTutorial/chap1/ram_disk' },
                                        ]
                                    },
                                    {
                                        text: '第二章：浏览器与搜索',
                                        collapsed: true,
                                        items: [
                                            { text: '浏览器选择', link: '/docs/general-skills/computer-basic/SurfingTutorial/chap2/browser_choose' },
                                            { text: '搜索引擎', link: '/docs/general-skills/computer-basic/SurfingTutorial/chap2/search_engine' },
                                            { text: '浏览器插件推荐', link: '/docs/general-skills/computer-basic/SurfingTutorial/chap2/browser_plugins_recommend' },
                                            { text: '杀毒软件', link: '/docs/general-skills/computer-basic/SurfingTutorial/chap2/antivirus' },
                                            { text: 'BitTorrent', link: '/docs/general-skills/computer-basic/SurfingTutorial/chap2/bit_torrent' },
                                        ]
                                    },
                                    {
                                        text: '第三章：系统操作',
                                        collapsed: true,
                                        items: [
                                            { text: '文件的组成', link: '/docs/general-skills/computer-basic/SurfingTutorial/chap3/file_attributes' },
                                            { text: '文件搜索', link: '/docs/general-skills/computer-basic/SurfingTutorial/chap3/file_search' },
                                            { text: '解压缩', link: '/docs/general-skills/computer-basic/SurfingTutorial/chap3/unzip' },
                                            { text: '截图方法', link: '/docs/general-skills/computer-basic/SurfingTutorial/chap3/screenshot_ways' },
                                            { text: '软件卸载', link: '/docs/general-skills/computer-basic/SurfingTutorial/chap3/uninstall' },
                                            { text: '环境变量', link: '/docs/general-skills/computer-basic/SurfingTutorial/chap3/environment_variables' },
                                            { text: '命令行', link: '/docs/general-skills/computer-basic/SurfingTutorial/chap3/command' },
                                            { text: '磁盘管理', link: '/docs/general-skills/computer-basic/SurfingTutorial/chap3/disk_management' },
                                            { text: 'Windows 磁盘', link: '/docs/general-skills/computer-basic/SurfingTutorial/chap3/windows_disk' },
                                        ]
                                    },
                                    {
                                        text: '第四章：进阶',
                                        collapsed: true,
                                        items: [
                                            { text: 'XMP', link: '/docs/general-skills/computer-basic/SurfingTutorial/chap4/XMP' },
                                        ]
                                    }
                                ]
                            },
                        ],
                       },
                  ],
              },
            ],
        },
    ]
}

function growthPathSidebar(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: '成长路径',
            link: '/docs/growth-path/',
            collapsed: true,
        },
    ]
}

function communityHubSidebar(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: '社区中心',
            link: '/docs/community-hub/',
            collapsed: false,
            items: [
                {
                    text: '关于项目',
                    collapsed: false,
                    items: [
                        { text: '关于 Wiki', link: '/docs/community-hub/about-wiki' },
                        { text: '关于我们', link: '/docs/community-hub/about' },
                        { text: '更新日志', link: '/docs/community-hub/changelog' },
                        { text: '友情链接', link: '/docs/community-hub/links' },
                    ]
                },
                {
                    text: '参与贡献',
                    collapsed: false,
                    items: [
                        { text: '贡献指南', link: '/docs/community-hub/contribute' },
                        { text: '加入共建', link: '/docs/community-hub/CONTRIBUTING' },
                        { text: 'Markdown 指南', link: '/docs/community-hub/markdown-guide' },
                        { text: '高级组件指南', link: '/docs/community-hub/advanced-components' },
                    ]
                },
                {
                    text: '功能示例',
                    collapsed: true,
                    items: [
                        { text: 'API 示例', link: '/docs/examples/api-examples' },
                        { text: 'Giscus 测试', link: '/docs/examples/test-giscus' },
                        { text: '图标展示', link: '/docs/examples/icon-demo' },
                        { text: '网格布局', link: '/docs/examples/ui-grid-demo' },
                    ]
                },
            ],
        },
    ]
}

function blogSidebar(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: '博客文章',
            items: [
                { text: 'Hello Ac-Wiki!', link: '/docs/blog/posts/hello-ac-wiki' },
                { text: '计算机科学与技术核心课程介绍与技术脉络', link: '/docs/blog/posts/cs-course-structure' },
                { text: '脱单技巧', link: '/docs/blog/posts/from-single-to-dating' },
                { text: '计算机科学与技术专业的几种出路', link: '/docs/blog/posts/future-paths-for-cs-students' },
                { text: '一些自己在校园生活中的经验', link: '/docs/blog/posts/some-experience-in-school-life' },
            ]
        }
    ]
}

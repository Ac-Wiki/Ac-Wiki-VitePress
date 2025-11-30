import type { DefaultTheme } from 'vitepress'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/zh/reference/site-config
export default defineConfig({
    lang: 'zh-CN',
    title: 'Ac-Wiki',
    description: '学术生活百科 - 大学生的百科全书',
    lastUpdated: true,
    cleanUrls: true,

    themeConfig: {
        // https://vitepress.dev/zh/reference/default-theme-config
        logo: '/logo.svg',
        // siteTitle: '',
        nav: nav(),

        sidebar: {
            // 以首次匹配的侧边栏为主
            '/campus-life/': campusLifeSidebar(),
            // 路径需要尾随斜杠
            '/growth-path/': growthPathSidebar(),
            '/academic-resources/': academicResourcesSidebar(),
            '/general-skills/': generalSkillsSidebar(),
            '/community-hub/': communityHubSidebar(),
            '/examples/': communityHubSidebar(),
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

    head: [
        ['link', { rel: 'icon', href: '/logo.svg' }],
        // 使用 @iconify/vue 组件，已在自定义主题中全局注册，无需 CDN
    ],
    markdown: {
        math: true,
        // 将 ```pwsh 统一映射为 ```powershell，修复语法高亮回退为 txt 的问题
        config: (md) => {
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
        }
    },
})

function nav(): DefaultTheme.NavItem[] {
    return [
        { text: '校园生活', link: '/campus-life/', activeMatch: '^/campus-life/' },
        { text: '学术资源', link: '/academic-resources/', activeMatch: '^/academic-resources/' },
        { text: '通用技能', link: '/general-skills/', activeMatch: '^/general-skills/' },
        { text: '成长路径', link: '/growth-path/', activeMatch: '^/growth-path/' },
        { text: '博客', link: '/blog', activeMatch: '/blog' },
        {
            text: '关于',
            items: [
                { text: '友情链接', link: '/community-hub/links' },
                { text: '贡献指南', link: '/community-hub/contribute' },
                { text: '更新日志', link: '/community-hub/changelog' },
                { text: '关于我们', link: '/community-hub/about' },
                { text: '关于wiki', link: '/community-hub/about-wiki' },
            ],
        },
    ]
}
function AcWikiSidebar(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: 'Ac-Wiki',
            items: [
                { text: '写在开头', link: '/overview' },
            ],
        },
    ]
}
function campusLifeSidebar(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: '校园生活',
            link: '/campus-life/',
            collapsed: false,
            items: [
                {
                    text: '新生入学',
                    collapsed: false,
                    items: [
                        { text: '开学第 0 课', link: '/campus-life/new-student/first-lesson-of-school' },
                        { text: '学生邮箱', link: '/campus-life/new-student/student-email' },
                        { text: '图书馆使用', link: '/campus-life/new-student/library' },
                        { text: '医保指南', link: '/campus-life/new-student/medical-insurance' },
                    ]
                },
                {
                    text: '学业规划',
                    collapsed: false,
                    items: [
                        { text: '选课指南', link: '/campus-life/academic-planning/different-courses' },
                        { text: '签到考勤', link: '/campus-life/academic-planning/class-attendance' },
                        { text: '转专业指南', link: '/campus-life/academic-planning/major-transfer-guide' },
                        { text: '辅修双学位', link: '/campus-life/academic-planning/minor-or-dual-degree' },
                        { text: '国际交流', link: '/campus-life/academic-planning/international-exchange' },
                    ]
                },
                {
                    text: '生活社交',
                    collapsed: false,
                    items: [
                        { text: '人际关系', link: '/campus-life/social-life/social-connections' },
                        { text: '冲突解决', link: '/campus-life/social-life/resolving-conflicts' },
                        { text: '脱单指南', link: '/campus-life/social-life/getting-out-of-singleness' },
                    ]
                },
                {
                    text: '梦想帮扶',
                    link: '/campus-life/dream-help/',
                    collapsed: false,
                    items: [
                        { text: '奖/助学金申请', link: '/campus-life/dream-help/scholarship' },
                        { text: '勤工俭学申请', link: '/campus-life/dream-help/work-study-program' },
                        { text: '国家助学贷款', link: '/campus-life/dream-help/faq-national-student-loan' },
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
            link: '/academic-resources/',
            collapsed: true,
            items: [
                { text: '学术研究和学术写作', link: '/academic-resources/academic-research-and-academic-writing' },
                { text: '关键概念', link: '/academic-resources/some-key-concepts' },
                { text: '毕业论文（理学）', link: '/academic-resources/thesis-bachelor-science' },
                {
                  text: '资源',
                  link: '/academic-resources/resources',
                  items: [
                      { text: '获取资源', link: '/academic-resources/how-to-get-resources' },
                      { text: '数学学习', link: '/academic-resources/math/learning-resources' },   
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
            link: '/general-skills/',
            collapsed: true,
            items: [
                { text: '学生优惠', link: '/general-skills/student-discounts' },
                { text: '银行账户与信用卡', link: '/general-skills/bank-accounts-and-credit-cards' },
                { text: '搜索引擎', link: '/general-skills/search-platforms' },
                {
                  text: '工具',
                  link: '/general-skills/tools/',
                  items: [
                      {text: '效率软件', link: '/general-skills/tools/efficiency' },
                      { 
                        text: '网络安全',
                        collapsed: true,
                        link: '/general-skills/cyber-security/',
                        items: [
                            { text: '密码管理', link: '/general-skills/password_manage' },
                            { text: '隐私保护', link: '/general-skills/cyber-security/privacy' },
                        ],
                       },
                       { 
                        text: '奇技淫巧',
                        collapsed: true,
                        link: '/general-skills/qi-ji-yin-qiao/',
                        items: [
                            { text: '校园跑', link: '/general-skills/qi-ji-yin-qiao/campus-running' },
                            { text: '刷课', link: '/general-skills/qi-ji-yin-qiao/pointless-courses' },

                        ],
                       },
                  ],
              },
                {
                  text: '学习',
                  link: '/general-skills/study/',
                  items: [
                    { text: '考试和竞赛', link: '/general-skills/study/study' },
                  ],
              },
                {
                  text: '生活技巧',
                  link: '/general-skills/',
                  items: [
                      { text: '生活实用技巧', link: '/general-skills/life-tips' },
                      { text: '保养手段', link: '/general-skills/health' },
                      { text: '流行健康手册', link: '/general-skills/health-when-travelling' },
                  ],
              },
                {
                  text: '就业',
                  link: '/general-skills/recruit-exercitation',
                  items: [{ text: '企业文化', link: '/general-skills/recruit-exercitation' },],
              },
                {
                  text: '方法论',
                  link: '/general-skills/computer-basic/',
                  items: [
                      { 
                        text: '计算机基础',
                        
                        link: '/general-skills/computer-basic/',
                        items: [
                            { 
                                text: '上网教程', 
                                collapsed: true,
                                items: [
                                    {
                                        text: '第一章：基础知识',
                                        collapsed: true,
                                        items: [
                                            { text: '内存与硬盘', link: '/general-skills/computer-basic/SurfingTutorial/chap1/ram_disk' },
                                        ]
                                    },
                                    {
                                        text: '第二章：浏览器与搜索',
                                        collapsed: true,
                                        items: [
                                            { text: '浏览器选择', link: '/general-skills/computer-basic/SurfingTutorial/chap2/browser_choose' },
                                            { text: '搜索引擎', link: '/general-skills/computer-basic/SurfingTutorial/chap2/search_engine' },
                                            { text: '浏览器插件推荐', link: '/general-skills/computer-basic/SurfingTutorial/chap2/browser_plugins_recommend' },
                                            { text: '杀毒软件', link: '/general-skills/computer-basic/SurfingTutorial/chap2/antivirus' },
                                            { text: 'BitTorrent', link: '/general-skills/computer-basic/SurfingTutorial/chap2/bit_torrent' },
                                        ]
                                    },
                                    {
                                        text: '第三章：系统操作',
                                        collapsed: true,
                                        items: [
                                            { text: '文件的组成', link: '/general-skills/computer-basic/SurfingTutorial/chap3/file_attributes' },
                                            { text: '文件搜索', link: '/general-skills/computer-basic/SurfingTutorial/chap3/file_search' },
                                            { text: '解压缩', link: '/general-skills/computer-basic/SurfingTutorial/chap3/unzip' },
                                            { text: '截图方法', link: '/general-skills/computer-basic/SurfingTutorial/chap3/screenshot_ways' },
                                            { text: '软件卸载', link: '/general-skills/computer-basic/SurfingTutorial/chap3/uninstall' },
                                            { text: '环境变量', link: '/general-skills/computer-basic/SurfingTutorial/chap3/environment_variables' },
                                            { text: '命令行', link: '/general-skills/computer-basic/SurfingTutorial/chap3/command' },
                                            { text: '磁盘管理', link: '/general-skills/computer-basic/SurfingTutorial/chap3/disk_management' },
                                            { text: 'Windows 磁盘', link: '/general-skills/computer-basic/SurfingTutorial/chap3/windows_disk' },
                                        ]
                                    },
                                    {
                                        text: '第四章：进阶',
                                        collapsed: true,
                                        items: [
                                            { text: 'XMP', link: '/general-skills/computer-basic/SurfingTutorial/chap4/XMP' },
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
            link: '/growth-path/',
            collapsed: true,
        },
    ]
}

function communityHubSidebar(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: '社区中心',
            link: '/community-hub/',
            collapsed: false,
            items: [
                {
                    text: '关于项目',
                    collapsed: false,
                    items: [
                        { text: '关于 Wiki', link: '/community-hub/about-wiki' },
                        { text: '关于我们', link: '/community-hub/about' },
                        { text: '更新日志', link: '/community-hub/changelog' },
                        { text: '友情链接', link: '/community-hub/links' },
                    ]
                },
                {
                    text: '参与贡献',
                    collapsed: false,
                    items: [
                        { text: '贡献指南', link: '/community-hub/contribute' },
                        { text: '加入共建', link: '/community-hub/CONTRIBUTING' },
                        { text: 'Markdown 指南', link: '/community-hub/markdown-guide' },
                        { text: '高级组件指南', link: '/community-hub/advanced-components' },
                    ]
                },
                {
                    text: '功能示例',
                    collapsed: true,
                    items: [
                        { text: 'API 示例', link: '/examples/api-examples' },
                        { text: 'Giscus 测试', link: '/examples/test-giscus' },
                        { text: '图标展示', link: '/examples/icon-demo' },
                        { text: '网格布局', link: '/examples/ui-grid-demo' },
                    ]
                },
            ],
        },
    ]
}

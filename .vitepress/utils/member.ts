import members from '../data/members.json'

  /**
   * Represents a member of the club.
   *
   * @property {string} name - The member's name.
   * @property {string} grade - The member's grade, e.g. "2006".
   * @property {string} title - The member's title, e.g. "xx".
   * @property {string} [qq] - The member's QQ number, optional.
   * @property {string} [github] - The member's GitHub username, optional.
   * @property {string} linkText - The text to display for the member's custom link.
   * @property {string} link - The URL of the member's custom link.
   * @property {string} feed - The URL of the member's Atom/RSS feed.
   */
export interface Member {
    name: string
    grade: string
    title: string
    qq?: string
    github?: string
    /** 可选：成员标签或签名 */
    tags?: string
    linkText: string
    link: string
    feed: string
}

// 断言 JSON 为 Member[]，便于类型收敛（成员字段可能在不同记录中缺省）
const membersList = members as unknown as Member[]

// 支持的 authorId 格式：
// 1) Github 用户名，例如："octocat"
// 2) QQ 标识："-qq-123456" 或带昵称 "-qq-123456-Nick"
// 3) 兼容写法（你当前使用）："qq-Nick-123456"
export function getAuthor(authorId: string) {
    // 规范格式：-qq-<digits>[-<name>]
    const m1 = authorId.match(/^-qq-(\d+)(?:-(.+))?$/)
    // 兼容格式：qq-<name>-<digits>
    const m2 = authorId.match(/^qq-(.+)-(\d+)$/)

    let qq: string | undefined
    let nameFromId: string | undefined
    let github: string | undefined

    if (m1) {
        qq = m1[1]
        nameFromId = m1[2]
    } else if (m2) {
        nameFromId = m2[1]
        qq = m2[2]
    } else {
        github = authorId
    }

    const memberName = qq
        ? membersList.find(m => m.qq === qq)?.name ?? nameFromId
        : membersList.find(m => m.github === github)?.name ?? github

    const author = {
        name: memberName,
        avatar: getAvatar({ github, qq }),
        link: github ? `https://github.com/${github}` : undefined,
        qq,
        github,
    }

    return author
}

export function getAvatar(member: Pick<Member, 'qq' | 'github'>) {
    const { qq, github } = member

    if (github)
        return `https://wsrv.nl/?url=github.com/${github}.png%3fsize=92`
    if (qq)
        return `https://q1.qlogo.cn/g?b=qq&nk=${qq}&s=3`
    return '/favicon.ico'
}

export const grades = (() => {
    const gradeMap = new Map<string, number>()
    membersList.forEach((member) => {
        gradeMap.set(member.grade, (gradeMap.get(member.grade) || 0) + 1)
    })
    return Array.from(gradeMap, ([grade, length]) => ({ grade, length }))
})()

export function getMemberByFeed(feed: string) {
    return membersList.find(member => member.feed === feed) || {} as Member
}

const memberIndex = membersList.map(member => ({
    ...member,
    searchString: Object.values(member).join(' ').toLowerCase(),
}))

export function getMembers(search: string) {
    const lowerSearch = search.toLowerCase()
    return memberIndex.filter(member => member.searchString.includes(lowerSearch))
}

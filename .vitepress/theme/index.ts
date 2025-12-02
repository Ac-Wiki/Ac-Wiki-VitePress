import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { createPinia } from 'pinia'
import { h } from 'vue'
import VueTippy, { roundArrow } from 'vue-tippy'
import { Icon } from '@iconify/vue'

import './style.css'
import './theme-enhanced.css'
import 'tippy.js/dist/svg-arrow.css'

import Author from '../components/Author.vue'
import BlogIndex from '../components/BlogIndex.vue'
import ContributorList from '../components/ContributorList.vue'
import Dropdown from '../components/Dropdown.vue'
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import Logo from '../components/Logo.vue'
import MarkdownEditor from '../components/MarkdownEditor.vue'
import MemberList from '../components/MemberList.vue'
import NotFound from '../components/NotFound.vue'
import Timeline from '../components/Timeline.vue'
import Tip from '../components/Tip.vue'

const globalComponents = {
  BlogIndex,
  ContributorList,
  Dropdown,
  Icon,
  Logo,
  MarkdownEditor,
  MemberList,
  Timeline,
  Tip,
}

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => h(Header),
      'doc-footer-before': () => h(Author),
      'doc-after': () => h(Footer),
      'not-found': () => h(NotFound),
    })
  },
  enhanceApp({ app }) {
    Object.entries(globalComponents).forEach(([name, component]) => {
      app.component(name, component)
    })

    const pinia = createPinia()
    app.use(pinia)

    app.use(VueTippy, {
      component: 'Tooltip',
      directive: 'tip',
      defaultProps: {
        arrow: roundArrow,
      },
    })
  },
} satisfies Theme

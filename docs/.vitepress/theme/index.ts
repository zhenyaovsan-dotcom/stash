import { h } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import StashHome from './components/StashHome.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: {
    setup() {
      const route = useRoute()
      return () => route.path === '/' ? h(StashHome) : h(DefaultTheme.Layout)
    }
  }
}

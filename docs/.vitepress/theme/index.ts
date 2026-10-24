import DefaultTheme from 'vitepress/theme'
import KnowledgeMap from './KnowledgeMap.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('KnowledgeMap', KnowledgeMap)
  },
}

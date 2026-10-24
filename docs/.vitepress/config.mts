import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'STASH',
  description: 'Independent field archive for Solana memecoin research',
  appearance: 'dark',
  themeConfig: {
    siteTitle: 'STASH',
    nav: [
      { text: 'Карта знаний', link: '/' },
      { text: 'Энциклопедия', link: '/knowledge/' },
      { text: 'Исследования', link: '/research/' },
      { text: 'Инструменты', link: '/tools/' },
    ],
    sidebar: {
      '/knowledge/': [
        { text: 'База знаний', items: [
          { text: 'Обзор', link: '/knowledge/' },
          { text: 'On-chain исследование', link: '/knowledge/onchain' },
          { text: 'Словарь', link: '/knowledge/terms' },
        ] },
      ],
      '/tools/': [
        { text: 'Инструменты', items: [
          { text: 'Обзор', link: '/tools/' },
          { text: 'Терминалы', link: '/tools/terminals' },
          { text: 'Исследование', link: '/tools/research' },
          { text: 'Расширения', link: '/tools/extensions' },
        ] },
      ],
    },
    search: { provider: 'local' },
    outline: { level: [2, 3] },
    footer: {
      message: 'Независимый архив. Проверяй данные самостоятельно.',
      copyright: 'STASH / FIELD ARCHIVE',
    },
  },
})

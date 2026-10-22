import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'stash',
  description: 'The stuff you actually need.',
  appearance: 'dark',
  themeConfig: {
    nav: [
      { text: 'Tools', link: '/tools/' },
      { text: 'Knowledge', link: '/knowledge/' },
      { text: 'Research', link: '/research/' }
    ],
    search: {
      provider: 'local'
    },
    sidebar: {
      '/tools/': [
        {
          text: 'Tools',
          items: [
            { text: 'All tools', link: '/tools/' },
            { text: 'Terminals', link: '/tools/terminals' },
            { text: 'Research', link: '/tools/research' },
            { text: 'Extensions', link: '/tools/extensions' }
          ]
        }
      ],
      '/knowledge/': [
        {
          text: 'Knowledge',
          items: [
            { text: 'Overview', link: '/knowledge/' },
            { text: 'Trench glossary', link: '/knowledge/terms' },
            { text: 'On-chain basics', link: '/knowledge/onchain' }
          ]
        }
      ],
      '/research/': [
        {
          text: 'Research',
          items: [
            { text: 'Case studies', link: '/research/' }
          ]
        }
      ]
    },
    footer: {
      message: 'Independent community resource. Not financial advice.'
    }
  }
})

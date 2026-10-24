import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'STASH — The Memecoin Knowledge Archive',
  description: 'An independent field archive for Solana memecoin traders. Clear explanations, on-chain research, tools, and case studies.',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: 'Archive', link: '/' },
      { text: 'Knowledge', link: '/knowledge/' },
      { text: 'Research', link: '/research/' },
      { text: 'Tools', link: '/tools/' },
      { text: 'Security', link: '/security/' }
    ],
    search: {
      provider: 'local',
      options: {
        detailedView: true
      }
    },
    outline: {
      level: [2, 3],
      label: 'On this page'
    },
    sidebar: {
      '/knowledge/': [
        {
          text: '01 / FOUNDATIONS',
          collapsed: false,
          items: [
            { text: 'Knowledge index', link: '/knowledge/' },
            { text: 'Inside a Pump.fun launch', link: '/knowledge/pump-fun-launch' },
            { text: 'Bonding curve & migration', link: '/knowledge/bonding-curve-migration' },
            { text: 'Liquidity & price impact', link: '/knowledge/liquidity' }
          ]
        },
        {
          text: '02 / TRADING',
          collapsed: false,
          items: [
            { text: 'Fast flip mechanics', link: '/knowledge/fast-flip' },
            { text: 'FOMO & attention liquidity', link: '/knowledge/market-psychology' }
          ]
        }
      ],
      '/research/': [
        {
          text: 'ON-CHAIN RESEARCH',
          collapsed: false,
          items: [
            { text: 'Research index', link: '/research/' },
            { text: 'Follow funding wallets', link: '/research/funding-wallets' },
            { text: 'Analyze a dev wallet', link: '/research/dev-wallet-analysis' },
            { text: 'Bundle buys explained', link: '/research/bundle-buys' },
            { text: 'Facts vs. hypotheses', link: '/research/onchain-evidence' },
            { text: 'Worked example: wallet cluster', link: '/research/wallet-cluster-case' }
          ]
        }
      ],
      '/tools/': [
        {
          text: 'TOOLS & INFRASTRUCTURE',
          collapsed: false,
          items: [
            { text: 'Tool index', link: '/tools/' },
            { text: 'Read a transaction in Solscan', link: '/tools/solscan' },
            { text: 'Extensions & workflow', link: '/tools/extensions' },
            { text: 'Research terminals', link: '/tools/terminals' }
          ]
        }
      ],
      '/security/': [
        {
          text: 'SCAMS & SECURITY',
          collapsed: false,
          items: [
            { text: 'Common memecoin scams', link: '/security/scams' }
          ]
        }
      ]
    }
  }
})

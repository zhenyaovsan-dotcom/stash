<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

type Article = {
  id: string
  title: string
  section: string
  description: string
  path: string
  level: string
  minutes: number
  tag: string
  tags: string[]
}
const articles: Article[] = [
  { id: 'launch', title: 'Inside a Pump.fun launch', section: 'Fundamentals', description: 'Creation, first trades, curve state, and what to verify before calling a launch healthy.', path: '/knowledge/pump-fun-launch', level: 'Beginner', minutes: 7, tag: 'FIELD NOTE 001', tags: ['pump.fun', 'launch', 'bonding curve'] },
  { id: 'curve', title: 'Bonding curve & migration', section: 'Fundamentals', description: 'Virtual reserves, price movement, graduation, and the move into a pool.', path: '/knowledge/bonding-curve-migration', level: 'Intermediate', minutes: 8, tag: 'MECHANICS 002', tags: ['curve', 'AMM', 'PumpSwap'] },
  { id: 'liquidity', title: 'Liquidity & price impact', section: 'Fundamentals', description: 'Why displayed market cap is not the same thing as an exit you can execute.', path: '/knowledge/liquidity', level: 'Beginner', minutes: 6, tag: 'MECHANICS 003', tags: ['liquidity', 'slippage', 'price impact'] },
  { id: 'fastflip', title: 'Fast flip mechanics', section: 'Trading', description: 'Short-window execution, fees, failed fills, and the math behind a small edge.', path: '/knowledge/fast-flip', level: 'Intermediate', minutes: 9, tag: 'TRADING NOTE 004', tags: ['fast flip', 'slippage', 'risk'] },
  { id: 'psychology', title: 'FOMO & attention liquidity', section: 'Market psychology', description: 'How attention arrives, fragments, and disappears from a token.', path: '/knowledge/market-psychology', level: 'Beginner', minutes: 6, tag: 'FIELD NOTE 005', tags: ['FOMO', 'narrative', 'attention'] },
  { id: 'funding', title: 'Follow funding wallets', section: 'On-chain', description: 'Trace SOL flows without jumping from shared funding to a claim of shared ownership.', path: '/research/funding-wallets', level: 'Intermediate', minutes: 10, tag: 'RESEARCH 006', tags: ['wallet graph', 'funding', 'SOL'] },
  { id: 'dev', title: 'Analyze a dev wallet', section: 'Developers & launches', description: 'A repeatable checklist for creator history, token distribution, and sell pressure.', path: '/research/dev-wallet-analysis', level: 'Intermediate', minutes: 11, tag: 'RESEARCH 007', tags: ['dev wallet', 'creator', 'history'] },
  { id: 'bundle', title: 'Bundle buys explained', section: 'Developers & launches', description: 'What clustered launch buys can show—and what they cannot prove.', path: '/research/bundle-buys', level: 'Advanced', minutes: 8, tag: 'RESEARCH 008', tags: ['bundle', 'slots', 'insiders'] },
  { id: 'evidence', title: 'Facts vs. hypotheses', section: 'On-chain', description: 'Separate what the chain records from the story you build around it.', path: '/research/onchain-evidence', level: 'Beginner', minutes: 5, tag: 'METHOD 009', tags: ['evidence', 'heuristics', 'research'] },
  { id: 'case', title: 'Worked example: wallet cluster', section: 'Case studies', description: 'A fictional, clearly labelled walkthrough of funding paths and confidence levels.', path: '/research/wallet-cluster-case', level: 'Intermediate', minutes: 12, tag: 'CASE FILE 010', tags: ['case study', 'wallet graph', 'example'] },
  { id: 'solscan', title: 'Read a transaction in Solscan', section: 'Tools & infrastructure', description: 'A practical pass through signatures, instructions, token balance changes, and inner calls.', path: '/tools/solscan', level: 'Beginner', minutes: 8, tag: 'TOOL GUIDE 011', tags: ['Solscan', 'transaction', 'explorer'] },
  { id: 'scams', title: 'Common memecoin scams', section: 'Scams & security', description: 'Recognize fake front ends, malicious approvals, impersonation, and misleading claims.', path: '/security/scams', level: 'Beginner', minutes: 9, tag: 'SECURITY 012', tags: ['drainer', 'rug pull', 'security'] }
]
const categories = [
  { name: 'Fundamentals', code: '01', subtitle: 'The machinery underneath the ticker.', symbol: '⌁' },
  { name: 'Trading', code: '02', subtitle: 'Execution, timing, and risk under pressure.', symbol: '↗' },
  { name: 'On-chain', code: '03', subtitle: 'Follow assets, instructions, and wallet links.', symbol: '◎' },
  { name: 'Developers & launches', code: '04', subtitle: 'Launch patterns, creators, and clustered buys.', symbol: '⌘' },
  { name: 'Scams & security', code: '05', subtitle: 'Threat models before you sign or connect.', symbol: '×' },
  { name: 'Tools & infrastructure', code: '06', subtitle: 'Know what each tool shows—and misses.', symbol: '▤' },
  { name: 'Market psychology', code: '07', subtitle: 'Narratives, crowd attention, and FOMO.', symbol: '◌' },
  { name: 'Case studies', code: '08', subtitle: 'Walkthroughs that separate evidence from story.', symbol: '⊙' }
]
const query = ref('')
const searchOpen = ref(false)
const activeCategory = ref('')
const favorites = ref<string[]>([])
const learningDone = ref<number[]>([])
const activeNode = ref('curve')
const explainerStep = ref(0)
const showSavedOnly = ref(false)
const selectedGlossary = ref('')
const searchInput = ref<HTMLInputElement | null>(null)
const searchResults = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return articles.slice(0, 5)
  return articles.filter(a => [a.title, a.section, a.description, a.level, ...a.tags].join(' ').toLowerCase().includes(q)).slice(0, 7)
})
const archiveArticles = computed(() => {
  let list = articles
  if (activeCategory.value) list = list.filter(a => a.section === activeCategory.value)
  if (showSavedOnly.value) list = list.filter(a => favorites.value.includes(a.id))
  return list
})
const savedArticles = computed(() => articles.filter(a => favorites.value.includes(a.id)))
const activeNodeArticle = computed(() => articles.find(a => a.id === activeNode.value) || articles[1])
const pathSteps = [
  { title: 'Understand the launch', detail: 'Mint, curve, creator and first trades.', id: 'launch' },
  { title: 'Learn the curve', detail: 'Price movement and graduation.', id: 'curve' },
  { title: 'Read the chain', detail: 'Signatures, instructions and balance changes.', id: 'solscan' },
  { title: 'Trace a wallet', detail: 'Funding flows and confidence levels.', id: 'funding' }
]
const graphNodes = [
  { id: 'launch', title: 'Launch', x: 86, y: 84, section: 'Fundamentals' },
  { id: 'curve', title: 'Bonding curve', x: 248, y: 54, section: 'Fundamentals' },
  { id: 'liquidity', title: 'Liquidity', x: 423, y: 93, section: 'Fundamentals' },
  { id: 'fastflip', title: 'Fast flip', x: 548, y: 187, section: 'Trading' },
  { id: 'funding', title: 'Funding wallet', x: 258, y: 184, section: 'On-chain' },
  { id: 'bundle', title: 'Bundle buys', x: 404, y: 231, section: 'Developers & launches' },
  { id: 'evidence', title: 'Evidence', x: 95, y: 238, section: 'On-chain' },
  { id: 'dev', title: 'Dev wallet', x: 548, y: 53, section: 'Developers & launches' }
]
const graphEdges = [
  ['launch','curve'], ['curve','liquidity'], ['liquidity','fastflip'], ['launch','funding'],
  ['funding','evidence'], ['funding','bundle'], ['bundle','dev'], ['dev','liquidity'],
  ['curve','funding'], ['evidence','launch'], ['bundle','fastflip']
]
const glossary = [
  { term: 'Bonding curve', meaning: 'A pricing function that changes the quote as buys and sells alter reserves.' },
  { term: 'Slippage', meaning: 'The difference between the expected quote and the executed result.' },
  { term: 'Funding wallet', meaning: 'An address that supplied assets to another wallet; a link worth investigating, not proof of common control.' },
  { term: 'Bundle', meaning: 'A term used for tightly coordinated launch transactions; exact detection depends on the tool and chain evidence.' }
]
function go(path: string) { window.location.href = path }
function openArticle(article: Article) { go(article.path) }
function openFirstResult() { if (searchResults.value.length) openArticle(searchResults.value[0]) }
function openRandom() { openArticle(articles[Math.floor(Math.random() * articles.length)]) }
function toggleFavorite(id: string) {
  favorites.value = favorites.value.includes(id) ? favorites.value.filter(x => x !== id) : [...favorites.value, id]
  try { localStorage.setItem('stash-favorites', JSON.stringify(favorites.value)) } catch {}
}
function toggleStep(index: number) {
  learningDone.value = learningDone.value.includes(index) ? learningDone.value.filter(x => x !== index) : [...learningDone.value, index]
  try { localStorage.setItem('stash-learning-done', JSON.stringify(learningDone.value)) } catch {}
}
function resetLearning() {
  learningDone.value = []
  try { localStorage.removeItem('stash-learning-done') } catch {}
}
function scrollTo(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
function onKeys(event: KeyboardEvent) {
  if ((event.key === '/' || (event.key.toLowerCase() === 'k' && (event.ctrlKey || event.metaKey))) && !(event.target instanceof HTMLInputElement) && !(event.target instanceof HTMLTextAreaElement)) {
    event.preventDefault()
    searchInput.value?.focus()
    searchOpen.value = true
  }
  if (event.key === 'Escape') { searchOpen.value = false; query.value = ''; (document.activeElement as HTMLElement | null)?.blur?.() }
}
onMounted(() => {
  try {
    favorites.value = JSON.parse(localStorage.getItem('stash-favorites') || '[]')
    learningDone.value = JSON.parse(localStorage.getItem('stash-learning-done') || '[]')
  } catch {}
  window.addEventListener('keydown', onKeys)
})
onUnmounted(() => window.removeEventListener('keydown', onKeys))
</script>

<template>
  <div class="stash-shell">
    <aside class="stash-rail">
      <a class="brand-lockup" href="/" aria-label="STASH home">
        <span class="brand-mark">s.</span>
        <span class="brand-word">stash<span class="brand-period">.</span><small>THE KNOWLEDGE ARCHIVE</small></span>
      </a>
      <div class="rail-section-label">WORKSPACE <span>01</span></div>
      <nav class="rail-nav" aria-label="Main navigation">
        <button class="rail-link is-active" @click="scrollTo('top')"><span class="rail-glyph">▦</span> Overview <kbd>01</kbd></button>
        <button class="rail-link" @click="scrollTo('archive-grid')"><span class="rail-glyph">▤</span> Archive <kbd>02</kbd></button>
        <button class="rail-link" @click="scrollTo('knowledge-map')"><span class="rail-glyph">⌘</span> Knowledge map <kbd>03</kbd></button>
        <button class="rail-link" @click="scrollTo('learning-path')"><span class="rail-glyph">↗</span> Start here <kbd>04</kbd></button>
      </nav>
      <div class="rail-section-label rail-gap">COLLECTIONS <span>08</span></div>
      <nav class="rail-categories" aria-label="Archive categories">
        <button v-for="cat in categories" :key="cat.name" class="rail-category" :class="{ selected: activeCategory === cat.name }" @click="activeCategory = activeCategory === cat.name ? '' : cat.name; scrollTo('archive-grid')">
          <span class="category-dot">{{ cat.symbol }}</span><span>{{ cat.name }}</span><small>{{ String(articles.filter(a => a.section === cat.name).length).padStart(2,'0') }}</small>
        </button>
      </nav>
      <div class="rail-bottom">
        <div class="rail-status"><span class="status-dot"></span><div><strong>ARCHIVE ONLINE</strong><small>LOCAL KNOWLEDGE MODE</small></div></div>
        <div class="rail-caption">Independent research. No calls. No guarantees.</div>
        <div class="rail-version"><span>STASH / FIELD SYSTEM</span><span>v0.1.0</span></div>
      </div>
    </aside>

    <main id="top" class="stash-main">
      <header class="stash-topbar">
        <div class="crumb"><span>STASH</span><span class="crumb-slash">/</span><strong>THE ARCHIVE</strong></div>
        <div class="topbar-right">
          <span class="live-label"><i></i> CURATED KNOWLEDGE</span>
          <button class="saved-toggle" :class="{active: showSavedOnly}" @click="showSavedOnly = !showSavedOnly; scrollTo('archive-grid')"><span>☆</span> SAVED <b>{{ favorites.length }}</b></button>
          <button class="top-search" @click="searchInput?.focus(); searchOpen = true"><span>⌕</span> Search <kbd>/</kbd></button>
        </div>
      </header>

      <div class="stash-content">
        <section class="hero-panel">
          <div class="hero-main">
            <div class="eyebrow"><span class="eyebrow-line"></span> A FIELD ARCHIVE FOR SOLANA</div>
            <h1>UNDERSTAND<br>THE <em>TRENCHES.</em></h1>
            <p class="hero-copy">Everything behind the ticker. A living reference for the mechanics, people, tools and patterns behind Solana memecoins.</p>
            <div class="hero-actions">
              <button class="button-dark" @click="scrollTo('archive-grid')">EXPLORE THE ARCHIVE <span>↘</span></button>
              <button class="button-quiet" @click="openRandom">SURPRISE ME <span>↗</span></button>
            </div>
          </div>
          <div class="hero-specimen" aria-label="Archive index graphic">
            <div class="specimen-top"><span>STASH / INDEX PLATE</span><span>PL. 001—A</span></div>
            <div class="specimen-mark">
              <svg viewBox="0 0 240 240" role="img" aria-label="Abstract grayscale network diagram">
                <circle cx="120" cy="120" r="86" fill="none" stroke="currentColor" stroke-opacity=".22" stroke-width="1"/>
                <circle cx="120" cy="120" r="60" fill="none" stroke="currentColor" stroke-opacity=".34" stroke-width="1" stroke-dasharray="2 5"/>
                <path d="M40 142 L97 66 L165 91 L196 154 L126 190 L40 142 M97 66 L126 190 M40 142 L165 91 M120 33 L120 207 M33 120 L207 120" fill="none" stroke="currentColor" stroke-width="1.25"/>
                <circle cx="97" cy="66" r="5" fill="currentColor"/><circle cx="165" cy="91" r="4" fill="currentColor"/>
                <circle cx="40" cy="142" r="3" fill="currentColor"/><circle cx="196" cy="154" r="5" fill="currentColor"/>
                <circle cx="126" cy="190" r="3" fill="currentColor"/><circle cx="120" cy="120" r="11" fill="currentColor"/>
                <circle cx="120" cy="120" r="17" fill="none" stroke="currentColor" stroke-width="1"/>
              </svg>
              <span class="specimen-label label-a">FLOW / 03</span><span class="specimen-label label-b">NODE / 08</span>
              <span class="specimen-center">S.</span>
            </div>
            <div class="specimen-bottom"><span>TRACE WHAT MOVES</span><span>SEPARATE SIGNAL FROM STORY</span></div>
          </div>
          <div class="hero-foot">
            <div><span class="foot-number">012</span><span>STARTER ARTICLES</span></div>
            <div><span class="foot-number">08</span><span>KNOWLEDGE DOMAINS</span></div>
            <div><span class="foot-number">∞</span><span>LINKED CONCEPTS</span></div>
            <div class="foot-note">Built for curiosity.<br>Not a signal service.</div>
          </div>
        </section>

        <section class="search-section">
          <div class="section-overline"><span>FIND SOMETHING</span><span>SEARCH THE COLLECTION <b>↙</b></span></div>
          <div class="search-wrap" :class="{focused: searchOpen}">
            <span class="search-symbol">⌕</span>
            <input ref="searchInput" v-model="query" type="search" placeholder="Search concepts, mechanics, wallets, tools..." aria-label="Search the STASH archive" @focus="searchOpen = true" @keydown.enter="openFirstResult" @keydown.escape="searchOpen = false">
            <span class="search-hint" v-if="!query">12 ARTICLES <kbd>↵</kbd></span>
            <button v-else class="clear-search" @click="query = ''; searchOpen = true">CLEAR ×</button>
          </div>
          <div v-if="searchOpen" class="search-results">
            <div class="result-head"><span>{{ query ? 'MATCHING MATERIAL' : 'QUICK ACCESS' }}</span><button @click="searchOpen = false">CLOSE ×</button></div>
            <button v-for="(article, index) in searchResults" :key="article.id" class="search-result" @click="openArticle(article)">
              <span class="result-index">{{ String(index + 1).padStart(2,'0') }}</span>
              <span class="result-body"><strong>{{ article.title }}</strong><small>{{ article.section }} · {{ article.minutes }} MIN READ</small></span>
              <span class="result-arrow">↗</span>
            </button>
            <div v-if="searchResults.length === 0" class="no-results">No match in this starter collection. Try “curve”, “wallet”, or “slippage”.</div>
          </div>
        </section>

        <section id="archive-grid" class="archive-section">
          <div class="section-heading">
            <div><span class="section-kicker">01 / BROWSE BY DOMAIN</span><h2>Explore the archive<span class="heading-period">.</span></h2></div>
            <div class="heading-side">A map of the moving parts.<br>Pick a thread and follow it.</div>
          </div>
          <div v-if="activeCategory || showSavedOnly" class="filter-strip">
            <span>{{ showSavedOnly ? 'SAVED MATERIAL' : 'FILTERED COLLECTION' }}</span>
            <strong>{{ showSavedOnly ? 'Your saved articles' : activeCategory }}</strong>
            <button @click="activeCategory = ''; showSavedOnly = false">CLEAR FILTER ×</button>
          </div>
          <div v-if="!showSavedOnly" class="category-grid">
            <button v-for="cat in categories" :key="cat.name" class="archive-card" :class="{ chosen: activeCategory === cat.name }" @click="activeCategory = activeCategory === cat.name ? '' : cat.name">
              <div class="card-top"><span>{{ cat.code }} / DOMAIN</span><span class="card-symbol">{{ cat.symbol }}</span></div>
              <h3>{{ cat.name }}</h3>
              <p>{{ cat.subtitle }}</p>
              <div class="card-bottom"><span>{{ String(articles.filter(a => a.section === cat.name).length).padStart(2, '0') }} MATERIALS</span><span class="card-arrow">↗</span></div>
            </button>
          </div>
          <div class="article-list" :class="{ 'saved-mode': showSavedOnly }">
            <button v-for="(article, index) in archiveArticles" :key="article.id" class="article-row" @click="openArticle(article)">
              <span class="article-row-num">{{ String(index + 1).padStart(2,'0') }}</span>
              <span class="article-row-main"><strong>{{ article.title }}</strong><small>{{ article.description }}</small></span>
              <span class="article-row-meta"><span>{{ article.section }}</span><small>{{ article.minutes }} MIN</small></span>
              <span class="article-row-arrow">↗</span>
            </button>
            <div v-if="archiveArticles.length === 0" class="empty-archive">Nothing saved here yet. Use the star beside an article to keep it in this list.</div>
          </div>
          <div v-if="!showSavedOnly && !activeCategory" class="archive-footer"><span>COLLECTION / 001</span><span>CONTENT IS CURATED, NOT LIVE MARKET DATA.</span></div>
        </section>

        <section id="knowledge-map" class="map-section">
          <div class="section-heading">
            <div><span class="section-kicker">02 / CONNECTIONS, NOT JUST CATEGORIES</span><h2>Knowledge map<span class="heading-period">.</span></h2></div>
            <div class="heading-side">Select a node to open a topic.<br>Related concepts form the path.</div>
          </div>
          <div class="knowledge-map-card">
            <div class="map-canvas">
              <svg class="map-lines" viewBox="0 0 620 280" preserveAspectRatio="xMidYMid meet" aria-label="Interactive map of related memecoin concepts">
                <line v-for="edge in graphEdges" :key="edge.join('-')" :x1="graphNodes.find(n => n.id === edge[0])?.x" :y1="graphNodes.find(n => n.id === edge[0])?.y" :x2="graphNodes.find(n => n.id === edge[1])?.x" :y2="graphNodes.find(n => n.id === edge[1])?.y" :class="{ related: edge.includes(activeNode) }"/>
                <g v-for="node in graphNodes" :key="node.id" class="map-node" :class="{ active: activeNode === node.id }" role="button" tabindex="0" :aria-label="'Open ' + node.title" @click="activeNode = node.id" @keydown.enter="activeNode = node.id">
                  <circle :cx="node.x" :cy="node.y" :r="activeNode === node.id ? 8 : 5"/>
                  <circle class="node-ring" :cx="node.x" :cy="node.y" :r="activeNode === node.id ? 15 : 10"/>
                  <text :x="node.x" :y="node.y + 25" text-anchor="middle">{{ node.title }}</text>
                </g>
              </svg>
              <div class="map-legend"><span><i class="legend-dot"></i> CONCEPT</span><span><i class="legend-line"></i> RELATED IDEA</span><span>NOT LIVE WALLET DATA</span></div>
            </div>
            <aside class="map-detail">
              <div class="map-detail-label"><span>SELECTED NODE</span><span>↗ {{ activeNodeArticle.tag }}</span></div>
              <div class="map-node-number">{{ String(graphNodes.findIndex(n => n.id === activeNode) + 1).padStart(2, '0') }}</div>
              <h3>{{ activeNodeArticle.title }}</h3>
              <p>{{ activeNodeArticle.description }}</p>
              <div class="map-tags"><span>{{ activeNodeArticle.level }}</span><span>{{ activeNodeArticle.minutes }} MIN READ</span></div>
              <div class="map-actions"><button class="map-save" @click="toggleFavorite(activeNodeArticle.id)">{{ favorites.includes(activeNodeArticle.id) ? '★ SAVED' : '☆ SAVE' }}</button><button class="map-open" @click="openArticle(activeNodeArticle)">OPEN MATERIAL <span>↗</span></button></div>
            </aside>
          </div>
          <div class="map-note"><span>HOW TO READ THIS</span><p>The links are editorial relationships between topics, not claims that any particular wallets or tokens are connected.</p></div>
        </section>

        <section id="learning-path" class="learning-section">
          <div class="section-heading">
            <div><span class="section-kicker">03 / A SENSIBLE WAY IN</span><h2>Start here<span class="heading-period">.</span></h2></div>
            <div class="heading-side">Four steps from “what is this?”<br>to a repeatable research process.</div>
          </div>
          <div class="path-card">
            <div class="path-progress-head"><span>FOUNDATION ROUTE / 4 PARTS</span><span>{{ learningDone.length }} OF 4 COMPLETE</span></div>
            <div class="progress-track"><span :style="{ width: (learningDone.length / 4 * 100) + '%' }"></span></div>
            <div class="path-steps">
              <div v-for="(step,index) in pathSteps" :key="step.id" class="path-step" :class="{ done: learningDone.includes(index) }">
                <button class="step-check" :aria-label="learningDone.includes(index) ? 'Mark incomplete' : 'Mark complete'" @click="toggleStep(index)">{{ learningDone.includes(index) ? '✓' : String(index + 1).padStart(2,'0') }}</button>
                <div class="step-copy"><strong>{{ step.title }}</strong><p>{{ step.detail }}</p></div>
                <button class="step-open" @click="go(articles.find(a => a.id === step.id)?.path || '/')">READ ↗</button>
              </div>
            </div>
            <div class="path-bottom"><span>PROGRESS SAVES IN THIS BROWSER</span><button @click="resetLearning">RESET ROUTE ↺</button></div>
          </div>
        </section>

        <section class="explainer-section">
          <div class="section-heading">
            <div><span class="section-kicker">04 / VISUAL EXPLAINER</span><h2>Follow the flow<span class="heading-period">.</span></h2></div>
            <div class="heading-side">A simplified teaching model.<br>No live accounts or balances.</div>
          </div>
          <div class="flow-card">
            <div class="flow-head"><div><span class="section-kicker">EXAMPLE / TOKEN BUY</span><h3>Where does the SOL go?</h3></div><span class="demo-stamp">ILLUSTRATIVE ONLY</span></div>
            <div class="flow-steps">
              <button v-for="(step,index) in [
                {title:'Buyer wallet',detail:'A wallet signs a transaction with a specified spend and slippage limit.'},
                {title:'Launch program',detail:'The program processes instructions and checks the trade against current curve state.'},
                {title:'Curve reserves',detail:'Virtual and real reserves help determine the quote; the resulting token amount depends on state and fees.'},
                {title:'Token account',detail:'The buyer token account receives the purchased tokens if the transaction succeeds.'}
              ]" :key="step.title" class="flow-step" :class="{current: explainerStep === index, passed: explainerStep > index}" @click="explainerStep = index">
                <span class="flow-step-index">0{{ index + 1 }}</span>
                <span class="flow-icon">{{ ['◉','⌘','⇄','▣'][index] }}</span>
                <strong>{{ step.title }}</strong>
                <small>{{ index === 0 ? 'SIGN' : index === 1 ? 'EXECUTE' : index === 2 ? 'QUOTE' : 'SETTLE' }}</small>
                <span v-if="index < 3" class="flow-arrow">→</span>
              </button>
            </div>
            <div class="flow-explanation"><span>STEP 0{{ explainerStep + 1 }}</span><p>{{ [
              'A wallet signs a transaction with a specified spend and slippage limit.',
              'The program processes instructions and checks the trade against current curve state.',
              'Virtual and real reserves help determine the quote; the resulting token amount depends on state and fees.',
              'The buyer token account receives the purchased tokens if the transaction succeeds.'
            ][explainerStep] }}</p><button @click="explainerStep = (explainerStep + 1) % 4">NEXT STEP ↗</button></div>
            <div class="flow-warning">The exact instructions and account flow depend on the token, program version and route. This diagram is not a transaction trace.</div>
          </div>
        </section>

        <section class="deepdives-section">
          <div class="section-heading">
            <div><span class="section-kicker">05 / LOOK CLOSER</span><h2>Deep dives<span class="heading-period">.</span></h2></div>
            <div class="heading-side">Questions worth more than a green candle.</div>
          </div>
          <div class="deepdives-grid">
            <button v-for="article in articles.filter(a => ['funding','bundle','evidence'].includes(a.id))" :key="article.id" class="deep-card" @click="openArticle(article)">
              <div class="deep-card-top"><span>{{ article.tag }}</span><span>↗</span></div>
              <div class="deep-glyph">{{ article.id === 'funding' ? '◉' : article.id === 'bundle' ? '⫶' : '≠' }}</div>
              <h3>{{ article.title }}</h3>
              <p>{{ article.description }}</p>
              <div class="deep-card-bottom"><span>{{ article.minutes }} MIN</span><span>{{ article.level.toUpperCase() }}</span></div>
            </button>
          </div>
        </section>

        <section class="recent-section">
          <div class="section-heading">
            <div><span class="section-kicker">06 / ARCHIVE LOG</span><h2>Recently indexed<span class="heading-period">.</span></h2></div>
            <div class="heading-side">A starter collection built to grow.<br>Entries have editorial dates, not live-feed timestamps.</div>
          </div>
          <div class="recent-table">
            <div class="recent-table-head"><span>ENTRY</span><span>DOMAIN</span><span>READ TIME</span><span>OPEN</span></div>
            <button v-for="article in articles.slice(-5).reverse()" :key="article.id" class="recent-row" @click="openArticle(article)">
              <span class="recent-title"><i>{{ article.tag.split(' ')[0] }}</i><strong>{{ article.title }}</strong></span><span class="recent-domain">{{ article.section }}</span><span class="recent-time">{{ article.minutes }} MIN</span><span class="recent-arrow">↗</span>
            </button>
          </div>
        </section>

        <section class="glossary-section">
          <div class="glossary-heading"><div><span class="section-kicker">QUICK REFERENCE / GLOSSARY</span><h2>Terms without the noise<span class="heading-period">.</span></h2></div><p>Tap a term for a short definition. Full context lives in the linked materials.</p></div>
          <div class="glossary-list">
            <button v-for="item in glossary" :key="item.term" class="glossary-item" :class="{open: selectedGlossary === item.term}" @click="selectedGlossary = selectedGlossary === item.term ? '' : item.term">
              <span class="glossary-term">{{ item.term }}</span><span class="glossary-definition" v-if="selectedGlossary === item.term">{{ item.meaning }}</span><span class="glossary-open">{{ selectedGlossary === item.term ? '−' : '+' }}</span>
            </button>
          </div>
        </section>

        <footer class="stash-footer">
          <div class="footer-brand">stash<span>.</span></div>
          <p>A knowledge archive, not a signal service.<br>Verify the chain. Keep your own risk limits.</p>
          <div class="footer-meta"><span>STASH / INDEPENDENT FIELD ARCHIVE</span><span>NO LIVE API CONNECTED · DEMO INTERACTIONS ONLY</span><a href="/knowledge/">ENTER THE WIKI ↗</a></div>
        </footer>
      </div>
    </main>
  </div>
</template>

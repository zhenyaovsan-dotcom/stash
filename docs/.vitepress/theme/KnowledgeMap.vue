<script setup lang="ts">
import { computed, ref } from 'vue'

type Topic = { id:string; title:string; kicker:string; x:number; y:number; r:number; intro:string; items:string[]; links:string[]; path:string }
const topics: Topic[] = [
 {id:'launch',title:'Запуск токена',kicker:'01 / LAUNCH',x:19,y:24,r:7.3,intro:'От создания токена до первых торгов: распределение, механика запуска и переход к пулу ликвидности.',items:['Launchpad и fair launch','Распределение токенов','Миграция и пул ликвидности'],links:['market','wallets','risk'],path:'/knowledge/launch'},
 {id:'market',title:'Механика рынка',kicker:'02 / MARKET',x:76,y:23,r:8.2,intro:'Как формируются цена и ликвидность, почему капитализация не показывает всю картину и что меняется при крупных сделках.',items:['Бондинг-кривые','Ликвидность и проскальзывание','Рыночная структура'],links:['launch','trading','risk'],path:'/knowledge/market'},
 {id:'wallets',title:'Кошельки',kicker:'03 / ON-CHAIN',x:19,y:67,r:7.1,intro:'Чтение ончейн-следов: связи адресов, движение средств и то, что транзакции действительно позволяют утверждать.',items:['Связанные адреса','Потоки SOL и токенов','Ограничения ончейн-анализа'],links:['launch','risk','tools'],path:'/knowledge/onchain'},
 {id:'trading',title:'Трейдинг',kicker:'04 / EXECUTION',x:76,y:66,r:7.3,intro:'Исполнение сделок в быстром рынке: вход, выход, проскальзывание и оценка результата без иллюзий.',items:['Вход и выход','Скорость исполнения','Размер позиции'],links:['market','risk','tools'],path:'/knowledge/trading'},
 {id:'risk',title:'Риски',kicker:'05 / RISK',x:48,y:82,r:6.4,intro:'Условия, из-за которых сделка может закончиться не так, как ожидалось: от концентрации токенов до невозможности выйти.',items:['Концентрация токенов','Ликвидность выхода','Риски создателя токена'],links:['launch','wallets','trading'],path:'/knowledge/risk'},
 {id:'tools',title:'Инструменты',kicker:'06 / TOOLS',x:48,y:48,r:5.7,intro:'Эксплореры, терминалы и аналитические сервисы — с практическими сценариями и честным описанием ограничений.',items:['Эксплореры','Терминалы и трекеры','Проверка источников'],links:['wallets','trading'],path:'/tools/'},
]
const activeId = ref('launch')
const active = computed(() => topics.find(t => t.id === activeId.value) || topics[0])
const lines = computed(() => topics.flatMap(t => t.links.map(id => { const target=topics.find(x=>x.id===id); return target && t.id<target.id ? {a:t,b:target} : null }).filter(Boolean) as {a:Topic;b:Topic}[]))
function choose(id:string){ activeId.value=id }
</script>

<template>
  <section class="map-shell">
    <div class="map-heading">
      <div><div class="overline">FIELD MAP / 001</div><h2>Исследуй связи.</h2><p>Не знаешь, с чего начать? Выбери узел и двигайся от темы к теме.</p></div>
      <span class="map-count">06 ОБЛАСТЕЙ · 20+ НАПРАВЛЕНИЙ</span>
    </div>
    <div class="map-layout">
      <div class="map-canvas" aria-label="Интерактивная карта знаний">
        <div class="canvas-label">STASH KNOWLEDGE SYSTEM <span>● LIVE MAP</span></div>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <line v-for="(line,i) in lines" :key="i" :x1="line.a.x" :y1="line.a.y" :x2="line.b.x" :y2="line.b.y" />
        </svg>
        <button v-for="topic in topics" :key="topic.id" class="map-node" :class="{ selected: activeId===topic.id }" :style="{left:topic.x+'%',top:topic.y+'%','--node-size':(topic.r*2)+'%'}" @click="choose(topic.id)">
          <span class="node-dot"></span><span class="node-title">{{topic.title}}</span><span class="node-kicker">{{topic.kicker}}</span>
        </button>
        <div class="canvas-foot">SELECT NODE / FOLLOW THE CONNECTION</div>
      </div>
      <aside class="topic-panel">
        <div class="overline">{{active.kicker}} <span> / TOPIC FILE</span></div>
        <h3>{{active.title}}</h3>
        <p class="topic-intro">{{active.intro}}</p>
        <div class="panel-rule"></div>
        <div class="overline">ЧТО РАЗБЕРЁМ</div>
        <ul><li v-for="item in active.items" :key="item">{{item}}</li></ul>
        <div class="overline related-label">СВЯЗАННЫЕ ТЕМЫ</div>
        <div class="related">
          <button v-for="id in active.links" :key="id" @click="choose(id)">{{topics.find(t=>t.id===id)?.title}} ↗</button>
        </div>
        <a class="read-link" :href="active.path">Открыть материалы <span>↗</span></a>
      </aside>
    </div>
    <div class="map-note"><span>01 — EXPLORE</span><p>Каждый узел ведёт к объяснениям, примерам и исследованиям. Связи показывают, что стоит изучить дальше.</p></div>
  </section>
</template>

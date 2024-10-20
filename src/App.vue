<script lang="ts">

import TodoList from './components/TodoList.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Hero from './components/Hero.vue'
import Statistics from './components/Statistics.vue'
import { Separator } from './components/ui/separator'
import { defineComponent, provide, reactive } from 'vue'
import { SharedData } from './lib/types/types'
import { STATISTICS_PROVIDER_KEY } from './lib/constants/globals'

export default defineComponent({
  setup() {

    const sharedData = reactive<SharedData>({ total: 0, todo: 0, done: 0})
    console.log(STATISTICS_PROVIDER_KEY)
    provide(STATISTICS_PROVIDER_KEY, sharedData)

    return {
      sharedData
    }
  },
  components: {
    TodoList,
    Header,
    Footer,
    Hero,
    Statistics,
    Separator,
  }
})

</script>

<template>
  <Header />
  <div class="flex flex-col">
    <Hero />
    <Statistics />
    <main>
      <TodoList />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">

import TodoList from './components/TodoList.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Hero from './components/Hero.vue'
import Statistics from './components/Statistics.vue'
import { Separator } from './components/ui/separator'
import { ref } from 'vue'

export default {
  data() {
    return {
      hero: true,
      sharedData: {
        total: ref(0),
        todo: ref(0),
        done: ref(0),
      }
    }
  },
  provide() {
    return {
      globalData: this
    }
  },
  methods: {
    handleTotalChange(num: number) {
      this.sharedData.total = num;
    },
    handleTodoChange(num: number) {
      this.sharedData.todo = num;
    },
    handleDoneChange(num: number) {
      this.sharedData.done = num;
    },
  },
  components: {
    TodoList,
    Header,
    Footer,
    Hero,
    Statistics,
    Separator,
  }
}

</script>

<template>
  <Header />
  <div class="flex flex-col">
    <Hero />
    <Statistics :total="sharedData.total" :todo="sharedData.todo" :done="sharedData.done" />
    <main>
      <TodoList />
    </main>
    <Footer />
  </div>
</template>

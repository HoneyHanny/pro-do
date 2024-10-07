<template>
  <div class="top-0 left-0 flex justify-between items-center py-4 px-8 md:px-64 border-b mb-6 fixed w-full bg-zinc-50/70 [backdrop-filter:blur(10px)] z-[99]">
    <div class="flex flex-row items-center gap-2">
      <img src="/favicon.svg" width="28" height="28"/>
      <p class="font-bold text-2xl">Pro Do</p>
    </div>
    <div class="rounded-full border p-2 bg-zinc-100 shadow">
      <!-- TODO: Github repo link -->
      <a href="https://github.com/HoneyHanny/pro-do">
        <span><Github width="16" height="16"/></span>
      </a>
    </div>
  </div>
</template>

<script>
import { Github } from 'lucide-vue-next'
import { ListTodo } from 'lucide-vue-next'
export default {
  components: {
    Github,
    ListTodo,
  }
}
</script>

<style>

</style>
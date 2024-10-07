<template>
  <div class="mt-20 mb-8 flex justify-center items-center flex-col">
    <Logo />
    <h2 class="mt-4">Do it like a pro</h2>
  </div>
  <div class="mb-8 flex justify-center items-center flex-row font-bold text-2xl text-[#2c3e50]">
    <p class="hidden md:block">Powered By</p>
    <div class="ml-4 hover:[filter:drop-shadow(0_0_2em_#42b883)] [transition:filter_300ms]">
    <a href="https://vuejs.org">
      <span><img src="../assets/vue.svg" alt="Vue logo" width="60" height="60"/></span>
    </a>
    </div>
    <div class="px-4">
      <Plus/>
    </div>
    <div class="hover:[filter:drop-shadow(0_0_2em_#2b2b2b)] [transition:filter_300ms]">
    <a href="https://www.shadcn-vue.com">
      <span><img src='../assets/shadcn.svg' alt='Shadcn logo' width='60' height='60' /></span>
    </a>
    </div>
  </div>
</template>

<script>
  import { Plus } from 'lucide-vue-next'
  import Logo from './Logo.vue'

  export default {
    components: {
      Plus,
      Logo,
    },
  }

</script>
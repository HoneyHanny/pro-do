<script lang="ts">
import { STATISTICS_PROVIDER_KEY } from '@/lib/constants/globals';
import { SharedData } from '@/lib/types/types';
import { defineComponent, inject } from 'vue';

export default defineComponent({
  setup() {
    const sharedData = inject(STATISTICS_PROVIDER_KEY) as SharedData

    return {
      sharedData
    }
  }
})
</script>

<template>
  <div class="mt-8 mb-8 flex justify-center items-center flex-col">
    <div class="flex justify-center items-center gap-8">
      <div class="flex flex-col gap-4 justify-center items-center">
        <h3>Todo</h3>
        {{ sharedData.todo }}
      </div>
      <div class="flex flex-col gap-4 justify-center items-center">
        <h3>Done</h3>
        {{ sharedData.done }}
      </div>
      <div class="flex flex-col gap-4 justify-center items-center">
        <h3>Total</h3>
        {{ sharedData.total }}
      </div>
    </div>
  </div>
</template>

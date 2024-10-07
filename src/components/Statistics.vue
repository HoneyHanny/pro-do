<template>
  <div class="mt-8 mb-8 flex justify-center items-center flex-col">
    <div class="flex justify-center items-center gap-8">
      <div class="flex flex-col gap-4 justify-center items-center">
        <h3>Todo</h3>
        {{ globalData.sharedData.todo }}
      </div>
      <div class="flex flex-col gap-4 justify-center items-center">
        <h3>Done</h3>
        {{ globalData.sharedData.done }}
      </div>
      <div class="flex flex-col gap-4 justify-center items-center">
        <h3>Total</h3>
        {{ globalData.sharedData.total }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['globalData']
}
</script>
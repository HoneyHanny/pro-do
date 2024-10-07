<template>
  <Card class="font-500 flex justify-start items-center gap-[16px] py-4 px-8">
    <Checkbox :checked="done" @update:checked="(done) => $emit('done', done)" /> 
    <p :class="{ 'line-through': done }">
      {{ title }}
    </p>
    <div class="flex flex-1 justify-end">
      <Trash width="16" height="16" @click="() => { console.log('>>> remove: ', title); $emit('remove') }" class="hover:cursor-pointer"/>
    </div>
  </Card>
</template>

<script>
import { Checkbox } from './ui/checkbox'
import { Card } from './ui/card'
import { Trash } from 'lucide-vue-next'

export default {
  props: ['title', 'done'],
  components: {
    Trash,
    Checkbox,
    Card,
  }
}
</script>
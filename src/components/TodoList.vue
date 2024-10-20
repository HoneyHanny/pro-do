<script lang="ts">

import { Button } from "./ui/button"
import { Input } from './ui/input'
import { Plus } from "lucide-vue-next"

import Todo from './Todo.vue'

import { SharedData, TodoInterface } from '@/lib/types/types'
import { TooltipProvider } from "./ui/tooltip/index"
import { TooltipTrigger } from "./ui/tooltip/index"
import { Tooltip } from "./ui/tooltip/index"
import { TooltipContent } from "./ui/tooltip/index"
import { computed, defineComponent, inject, reactive, ref } from "vue"
import { STATISTICS_PROVIDER_KEY } from "@/lib/constants/globals"

const LOCAL_STORAGE_KEY: string = 'vue-shadcn-todos'

const localTodos: TodoInterface[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]') || []

const setLocal = (todos: TodoInterface[]) => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))

export default defineComponent({
  setup() {

    const title = ref<string>('')

    const sharedData = inject(STATISTICS_PROVIDER_KEY) as SharedData
    const todos = reactive(localTodos)

    const numberOfTasks = computed(() => {
      return todos.length  
    })
    const numberOfNotDone = computed(() => {
      const filtered = todos.filter((t: TodoInterface) => !t.done)
      return filtered.length
    })
    const numberOfDone = computed(() => {
      const filtered = todos.filter((t: TodoInterface) => t.done)
      return filtered.length
    })
    const done = computed(() => {
      return todos.filter((t: TodoInterface) => t.done)
    })
    const notDone = computed(() => {
      return todos.filter((t: TodoInterface) => !t.done)
    })
    const sortByDone = computed(() => {
      return todos.sort((a: TodoInterface, b: TodoInterface) => (a.done === b.done) ? 0 : a.done ? -1 : 1)
    })

    const updateStats = () => {
      if (sharedData) {
        sharedData.total = numberOfTasks.value
        sharedData.todo = numberOfNotDone.value
        sharedData.done = numberOfDone.value
      }
    }
    const handleChange = (e: any) => {
      title.value = e.currentTarget.value
    }

    // TODO: Read back ChatGPT (How to update array states in Vue)
    // todos.values = sortByDone.value
    updateStats()

    return {
      // states
      title,
      todos,
      sharedData,

      // functions
      updateStats,
      handleChange,

      // computed
      numberOfTasks,
      numberOfNotDone,
      numberOfDone,
      done,
      notDone,
      sortByDone
    }
  },
  created() {
    // const globalData: { hero: boolean, sharedData: { total: number, todo: number, done: number } } | undefined = inject('globalData')
    this.todos.sort((a: TodoInterface, b: TodoInterface) => (a.done === b.done) ? 0 : a.done ? 1 : -1)
    this.updateStats()
  },
  data() {
    return {
      title: '',
      todos: localTodos as TodoInterface[],
    }
  },
  methods: {
    handleChange(e: any) {
      this.title = e.currentTarget.value
    },
    keyDownAddTask(e: any) {
      if (e.currentTarget.value === '' || !e.currentTarget.value)
        return
      this.todos.push({ done: false, title: e.currentTarget.value })
      this.updateStats()
      setLocal(this.todos)
    },
    clickAddTask(title: string) {
      if (title === '' || !title)
        return
      this.todos.push({done: false, title: title})
      this.updateStats()
      setLocal(this.todos)
    },
    remove(todo: TodoInterface) {
      const index = this.todos.indexOf(todo)
      if (index !== -1)
        this.todos.splice(index, 1)
      this.updateStats()
      setLocal(this.todos)
    },
    toggleDone(done: boolean, todo: TodoInterface) {
      done ? todo.done = true : todo.done = false
      this.updateStats()
      setLocal(this.todos)
    },
  },
  components: {
    Plus,
    Todo,
    Button,
    Input,
    TooltipProvider,
    Tooltip,
    TooltipTrigger,
    TooltipContent
  },
})
</script>

<template>
  <div class="pb-[24px] md:px-24 lg:px-40 gap-[24px] flex items-center justify-center">
    <Input @keydown.enter="keyDownAddTask" :modelvalue="title" @change="handleChange"/>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button @click="clickAddTask(title)" size="icon"><Plus /></Button>
        </TooltipTrigger>
        <TooltipContent><p>Add task</p></TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
  <div class="md:px-16 mb-12">
    <Todo v-for="(todo, index) in todos"
      :key="index" :title="todo.title" :done="todo.done" class="mb-4"
      @remove="remove(todo)" @done="toggleDone($event, todo)" />
  </div>
</template>

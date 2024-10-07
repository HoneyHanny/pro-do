<script lang="ts">

import { Button } from "./ui/button"
import { Input } from './ui/input'
import { Plus } from "lucide-vue-next"

import Todo from './Todo.vue'

import { TodoInterface } from '@/lib/types/types'
import TooltipProvider from "./ui/tooltip/TooltipProvider.vue"
import TooltipTrigger from "./ui/tooltip/TooltipTrigger.vue"
import Tooltip from "./ui/tooltip/Tooltip.vue"
import TooltipContent from "./ui/tooltip/TooltipContent.vue"

const LOCAL_STORAGE_KEY: string = 'vue-shadcn-todos'

const localTodos: TodoInterface[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]') || []

const setLocal = (todos: TodoInterface[]) => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))

export default {
  inject: ['globalData'],
  created() {
    // const globalData: { hero: boolean, sharedData: { total: number, todo: number, done: number } } | undefined = inject('globalData')
    this.todos.sort((a, b) => (a.done === b.done) ? 0 : a.done ? 1 : -1)
    this.updateStats()
  },
  data() {
    return {
      title: '',
      todos: localTodos as TodoInterface[],
    }
  },
  methods: {
    updateStats() {
      // @ts-ignore
      if (this.globalData && this.globalData.sharedData) {
        // @ts-ignore
        this.globalData.sharedData.total = this.numberOfTasks
        // @ts-ignore
        this.globalData.sharedData.todo = this.numberNotOfDone
        // @ts-ignore
        this.globalData.sharedData.done = this.numberOfDone
      }
    },
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
  computed: {
    numberOfDone() {
      const filtered = this.todos.filter((t: TodoInterface) => t.done)
      return filtered.length
    },
    numberNotOfDone() {
      const filtered = this.todos.filter((t: TodoInterface) => !t.done)
      return filtered.length
    },
    numberOfTasks() {
      return this.todos.length
    },
    done() {
      return this.todos.filter((t: TodoInterface) => t.done)
    },
    notDone() {
      return this.todos.filter((t: TodoInterface) => !t.done)
    },
    sortByDone() {
      return this.todos.sort((a: TodoInterface, b: TodoInterface) => (a.done === b.done) ? 0 : a.done ? -1 : 1)
    },
  }
}
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

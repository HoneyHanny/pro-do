import { Ref } from "vue"
export interface TodoInterface {
  title: string
  done: boolean
}

export interface SharedData {
  total: number,
  todo: number,
  done: number,
}
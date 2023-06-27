import { getTodosGroupedByColumn } from '@/utilities/getTodosGroupedByColumn'
import { create } from 'zustand'

export const useBoardStore = create((set) => ({
  board:{
    columns:new Map()
  },
  getBoard: async () => {
    const board = await getTodosGroupedByColumn()
    set({board:board})
  }
}))
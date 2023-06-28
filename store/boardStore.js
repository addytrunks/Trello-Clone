import { databases } from '@/appwrite'
import { getTodosGroupedByColumn } from '@/utilities/getTodosGroupedByColumn'
import { create } from 'zustand'

export const useBoardStore = create((set) => ({
  board:{
    columns:new Map()
  },
  getBoard: async () => {
    const board = await getTodosGroupedByColumn()
    set({board:board})
  },
  setBoardState:(board)=>set({board}),
  updateTodoinDB:async(todo,columnId) => {
    await databases.updateDocument(process.env.NEXT_PUBLIC_DATABASE_ID,process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID,todo.$id,{
      title:todo.title,
      status:columnId
    })
  }
}))
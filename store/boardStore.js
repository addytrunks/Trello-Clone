import { databases, storage } from '@/appwrite'
import { getTodosGroupedByColumn } from '@/utilities/getTodosGroupedByColumn'
import { create } from 'zustand'

export const useBoardStore = create((set,get) => ({
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
  },
  searchString:"",
  setSearchString:(searchString) => set({searchString}),
  deleteTask:async(todo,id,taskIndex) => {
    const newColumns = new Map(get().board.columns)
    newColumns.get(id)?.todos.splice(taskIndex,1);
    set({board:{columns:newColumns}});

    // if(todo.image){
    //   await storage.deleteFile(todo.image.bucketId,todo.image.fileId)
    // }

    await databases.deleteDocument(process.env.NEXT_PUBLIC_DATABASE_ID,process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID,todo.$id)
  }
}))
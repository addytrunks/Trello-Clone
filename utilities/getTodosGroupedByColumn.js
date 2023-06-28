import { databases } from "@/appwrite"

export const getTodosGroupedByColumn = async () => {
    const datas = await databases.listDocuments(process.env.NEXT_PUBLIC_DATABASE_ID,process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID)
    
    const todos = datas.documents;

    return groupedTodosByColumn
}
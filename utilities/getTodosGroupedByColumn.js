import { databases } from "@/appwrite"

export const getTodosGroupedByColumn = async () => {
    const datas = await databases.listDocuments(process.env.NEXT_PUBLIC_DATABASE_ID,process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID)
    
    const todos = datas.documents;
    const groupedTodosByColumn = {
        "todo":[],
        "inprogress":[],
        "done":[]
    }
    
    todos.forEach((todo) => {
        groupedTodosByColumn[`${todo.status}`].push({
            "id":todo.$id,
            "createdAt":todo.$createdAt,
            "status":todo.status,
            "title":todo.title,
            "image":todo?.image ? todo.image : null
        })
    })

    return groupedTodosByColumn
}
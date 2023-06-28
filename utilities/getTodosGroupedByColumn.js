import { databases } from "@/appwrite"

export const getTodosGroupedByColumn = async () => {
    const datas = await databases.listDocuments(process.env.NEXT_PUBLIC_DATABASE_ID,process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID)
    
    const todos = datas.documents;

    const columns = todos.reduce((acc,todo)=>{
        if(!acc.get(todo.status)){
            acc.set(todo.status,{
                id:todo.status,
                todos:[]
            })
        }

        acc.get(todo.status).todos.push({
            $id:todo.$id,
            $createdAt:todo.$createdAt,
            status:todo.status,
            title:todo.title,
            ...(todo.image && {image:todo.image})
        })

        return acc
    },new Map())

    const columnTypes = ['todo','inprogress','done']
    for(const columnType of columnTypes){
        if(!columns.get(columnType)){
            columns.set(columnType,{
                id:columnType,
                todos:[]
            })
        }
    }

    const sortedColumns = new Map(Array.from(columns.entries()).sort((a,b)=>(
        columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
    )))

    const board = {
        columns:sortedColumns
    }
    return board
}
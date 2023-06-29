'use client'

import { useBoardStore } from "@/store/boardStore"
import { XCircleIcon } from "@heroicons/react/24/solid"

const TodoCard = ({todo,index,draggableProps,dragHandleProps,innerRef,id}) => {

  const deleteTask = useBoardStore((state) => state.deleteTask)

  return (
    <div className='bg-white rounded-md space-y-2 drop-shadow-md' {...draggableProps} {...dragHandleProps} ref={innerRef}>
      <div className="flex justify-between items-center p-3 mt-2">
        <p>{todo.title}</p>
        <button onClick={() => deleteTask(todo,id,index)} className="text-red-500 hover:text-red-600"><XCircleIcon className="ml-5 h-8 w-8"/></button>
      </div>

      {/* Add Image Here */}
    </div>
  )
}

export default TodoCard
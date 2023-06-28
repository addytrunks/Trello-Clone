'use client'

import { XCircleIcon } from "@heroicons/react/24/solid"

const TodoCard = ({todo,index,draggableProps,dragHandleProps,innerRef,id}) => {
  return (
    <div className='bg-white rounded-md space-y-2 drop-shadow-md' {...draggableProps} {...dragHandleProps} ref={innerRef}>
      <div className="flex justify-between items-center p-3 mt-2">
        <p>{todo.title}</p>
        <button className="text-red-500 hover:text-red-600"><XCircleIcon className="ml-5 h-8 w-8"/></button>
      </div>
    </div>
  )
}

export default TodoCard
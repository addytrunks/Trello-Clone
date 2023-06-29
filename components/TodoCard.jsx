'use client'

import { useBoardStore } from "@/store/boardStore"
import { getUrl } from "@/utilities/getUrl"
import { XCircleIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import { useEffect, useState } from "react"

const TodoCard = ({todo,index,draggableProps,dragHandleProps,innerRef,id}) => {

  const deleteTask = useBoardStore((state) => state.deleteTask)
  const [image,setImage] = useState()

  useEffect(() => {
    if(todo.image){
      const fetchImage = async () => {
        const url = await getUrl(todo.image);
        if(url){
          setImage(url.toString())
        }
      }
      fetchImage()
    }
  },[todo])

  return (
    <div className='bg-white rounded-md space-y-2 drop-shadow-md' {...draggableProps} {...dragHandleProps} ref={innerRef}>
      <div className="flex justify-between items-center p-3 mt-2">
        <p>{todo.title}</p>
        <button onClick={() => deleteTask(todo,id,index)} className="text-red-500 hover:text-red-600"><XCircleIcon className="ml-5 h-8 w-8"/></button>
      </div>

      {/* Add Image Here */}
      {image && (
      <div className="relative h-full w-full rounded-b-md">
        <Image
          src={image}
          alt="Task image"
          width={400}
          height={200}
          className="w-full object-contain rounded-b-md"
        />
      </div>
    )}
    </div>
  )
}

export default TodoCard
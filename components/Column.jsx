'use client'

import { Draggable, Droppable } from 'react-beautiful-dnd'
import TodoCard from './TodoCard'
import { PlusCircleIcon } from '@heroicons/react/24/solid'

const Column = ({status,todos,id,index}) => {

    const idToColumnName = {
      'todo':"To Do",
      'inprogress':"In Progress",
      'done':"Done"
    }

    return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <Droppable droppableId={index.toString()} type='card'>
            {(provided,snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className={`p-3 rounded-xl shadow-sm ${snapshot.isDraggingOver ? 'bg-green-200' : 'bg-white/50'}`}>
                <h2 className='flex items-center'>
                  <span className='flex-1 font-bold'>{idToColumnName[status]}</span>
                  <span className='text-gray-500 bg-gray-200 rounded-full font-normal px-2 py-1 text-sm'>{todos?.length}</span>
                </h2>

                <div className='space-y-2'>
                  {todos?.map((todo,numIndex) => (
                    <Draggable key={todo.$id} draggableId={index} index={index}>
                      {(provided) => (
                        <TodoCard
                          key={id}
                          todo={todo}
                          index={numIndex}
                          id={id}
                          innerRef={provided.innerRef}
                          draggableProps={provided.draggableProps}
                          dragHandleProps={provided.dragHandleProps}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}

                  <div className='flex items-end justify-end'>
                    <button className='text-green-400 hover:text-green-500'><PlusCircleIcon className='h-10 w-10'/></button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
    )}
    </Draggable>
  )
}

export default Column
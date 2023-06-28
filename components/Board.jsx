'use client'

import { useBoardStore } from '@/store/boardStore';
import { useEffect } from 'react';
import { DragDropContext,Droppable } from 'react-beautiful-dnd';
import Column from './Column';

const Board = () => {

    const [board,getBoard] = useBoardStore((state) =>[state.board,state.getBoard])

    useEffect(() => {
        getBoard()
    },[getBoard])

    const handleDragEnd = (result) => {}

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId='board' direction='horizontal' type='column'>
            {(provided,snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className='grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl'>
                    <Column
                    key={'todo'}
                    id={'todo'}
                    status={'todo'}
                    todos={board["todo"]} 
                    index={'1'}   
                    />

                    <Column
                    key={'inprogress'}
                    id={'inprogress'}
                    status={'inprogress'}
                    todos={board["inprogress"]} 
                    index={'2'}   
                    />

                    <Column
                    key={'done'}
                    id={'done'}
                    status={'done'}
                    todos={board["done"]}  
                    index={'3'}  
                    />

                </div>
            )}
        </Droppable>
    </DragDropContext>
  )
}

export default Board
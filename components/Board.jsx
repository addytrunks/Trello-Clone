'use client'

import { useBoardStore } from '@/store/boardStore';
import { useEffect, useState } from 'react';
import { DragDropContext,Droppable } from 'react-beautiful-dnd';
import Column from './Column';

const Board = () => {

    const [board,getBoard] = useBoardStore((state) =>[state.board,state.getBoard])
    useEffect(() => {
        getBoard()
    },[getBoard])

    console.log(board)

    const handleDragEnd = (result) => {
        const {destination,source,type}  = result;
        
        if(!destination) return;

        // Handle Column Drag
        if(type === 'column'){

        }
    }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId='board' direction='horizontal' type='column'>
            {(provided,snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className='grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl'>
                   {Array.from(board.columns.entries()).map(([id,column],index) => (
                    <Column
                        key={id}
                        id={id}
                        todos={column.todos}
                        index={index}
                    />))
                }
                </div>
            )}
        </Droppable>
    </DragDropContext>
  )
}

export default Board
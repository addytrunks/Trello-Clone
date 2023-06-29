'use client'

import { useBoardStore } from '@/store/boardStore';
import { useEffect} from 'react';
import { DragDropContext,Droppable } from 'react-beautiful-dnd';
import Column from './Column';

const Board = () => {

    const [board,getBoard,setBoardState,updateTodoinDB] = useBoardStore((state) =>[state.board,state.getBoard,state.setBoardState,state.updateTodoinDB])
    useEffect(() => {
        getBoard()
    },[getBoard])

    const handleDragEnd = (result) => {
        const {destination,source,type}  = result;
        
        if(!destination) return;

        // Handle Column Drag
        if(type === 'column'){
            const entries = Array.from(board.columns.entries())
            const [removed] = entries.splice(source.index,1)
            entries.splice(destination.index,0,removed)

            const rearrangedColumns = new Map(entries)
            setBoardState({...board,columns:rearrangedColumns})
        }else{
            const columns = Array.from(board.columns)
            const startColIndex = columns[Number(source.droppableId)]
            const finishColIndex = columns[Number(destination.droppableId)]

            const startCol = {
                id:startColIndex[0],
                todos:startColIndex[1].todos
            }

            const finishCol = {
                id:finishColIndex[0],
                todos:finishColIndex[1].todos
            }

            if(!startCol || !finishCol) return;
            if(source.index === destination.index && startCol === finishCol) return;

            const newTodos = startCol.todos;
            const [todoMoved] = newTodos.splice(source.index,1)

            if(startCol.id == finishCol.id){
                // Dragging through same column
                newTodos.splice(destination.index,0,todoMoved)
                
                const newCol = {
                    id:startCol.id,
                    todos:newTodos
                }
                const newColumns = new Map(board.columns)

                newColumns.set(startCol.id,newCol)
                setBoardState({...board,columns:newColumns})
            }else{
                // Dragging through another column
                const finishTodos = Array.from(finishCol.todos)
                finishTodos.splice(destination.index,0,todoMoved)

                const newCol = {
                    id:startCol.id,
                    todos:newTodos
                }
                const newColumns = new Map(board.columns)

                newColumns.set(startCol.id,newCol)
                newColumns.set(finishCol.id,{
                    id:finishCol.id,
                    todos:finishTodos
                })
                updateTodoinDB(todoMoved,finishCol.id)
                setBoardState({...board,columns:newColumns})
                
            }
        }
    }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId='board' direction='horizontal' type='column'>
            {(provided,snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className='grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto'>
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
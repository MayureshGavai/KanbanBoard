import React, { useContext, useState } from 'react'
import Column from './components/Column'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import AddTask from './components/AddTask'
import { TaskContext } from './context/TaskContext'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'


const App = () => {
  
  
  const  {taskData, dragEnd, setTaskData} = useContext(TaskContext)

  // console.log(taskData)

  

  return (
    <>
      <div className='flex px-8 py-2 justify-between items-center font-Inter border-b shadow-sm'>
        <h1 className='font-semibold text-xl md:text-xl'>Kanban Board</h1>
      <AddTask setData={setTaskData}/>
      </div>
    <div className='mx-6 my-2'>
      <DragDropContext
        onDragEnd={dragEnd}
      >
      <Droppable droppableId='all-columns' direction='horizontal' type='column'>
        {(provided)=>(
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4' {...provided.droppableProps} ref={provided.innerRef}>
          {
            taskData.columnOrder.map((columnId,index) => {
              const column = taskData.columns[columnId]
              const tasks = column.taskIds.map(taskId => taskData.tasks[taskId])
              
              return <Column key={column.id} column={column} tasks={tasks} index={index}/>
            })
          }
          </div>
        )}
      </Droppable>
    </DragDropContext>
    </div>
    <ToastContainer />

    </>
  )
}

export default App
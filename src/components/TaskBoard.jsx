import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";


const TaskBoard = ({initialTasks}) => {

    const [tasks, setTasks] = useState(initialTasks);


    const onDragEnd = (result) => {
        if (!result.destination) return;
    
        const items = Array.from(tasks);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
    
        setTasks(items);
      };

  return (
    <div className='p-2 border rounded-md  border-black'>
        <h1 className='px-2 text-2xl'>Tasks</h1>
        <div className=''>
        <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="noselect w-1/3 mx-auto border p-2 rounded-lg mt-4"
            >
              {tasks.map((task, index) => (
                <Draggable
                  key={task.id}
                  draggableId={task.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <div className="my-1 p-2 border rounded-md">
                        <h1 className="text-base font-medium mt-2">{task.task}</h1>
                        <h1 className="w-fit text-white text-sm bg-black mt-4 px-3 py-1 rounded-full">{task.priority}</h1>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
        
        </div>
    </div>
  )
}

export default TaskBoard
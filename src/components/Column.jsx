import React from "react";
import Task from "./Task";
import { Draggable, Droppable } from "react-beautiful-dnd";

const Column = ({ column, tasks, index }) => {
  return (
    <Draggable draggableId={column.id} index={index}>
        { provided =>(
        <div {...provided.draggableProps} ref={provided.innerRef} 
            className=" rounded-md  font-Inter bg-slate-100 flex flex-col" >
                <div className="flex justify-between items-center px-4 py-1">
      <h1 {...provided.dragHandleProps} className="text-lg font-medium ">{column.title}</h1>
                    <h1 className="bg-slate-950 rounded-full px-2 py-1 text-white text-xs">{column?.taskIds?.length}</h1>
                </div>
      <Droppable droppableId={column.id} type="task">
        {(provided,snapshot) => {
          return (
            <div ref={provided.innerRef} {...provided.droppableProps}
                className={`px-4 py-1 grow ${snapshot.isDraggingOver ? 'bg-sky-200' : 'bg-slate-100'}`}
            >
              <Task tasks={tasks} />
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
    )}
    </Draggable>
  );
};

export default Column;

import React, { useContext } from "react";
import { Draggable } from "react-beautiful-dnd";
import { AiFillDelete } from "react-icons/ai";
import { TaskContext } from "../context/TaskContext";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";


const Task = ({ tasks }) => {

    const getPriorityColor = (priority) => {
        switch (priority.toLowerCase()) {
          case "high":
            return "bg-rose-500";
          case "medium":
            return "bg-amber-500";
          case "low":
            return "bg-teal-400";
          default:
            return "bg-gray-500";
        }
      };


  return (
    <div>
      {tasks.map((task, index) => {
        return (
          <Draggable
            key={task.id.toString()}
            draggableId={task.id.toString()}
            index={index}
          >
            {(provided,snapshot) => {
              return (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <div className={`my-1 p-2  shadow-xl rounded-md ${snapshot.isDragging ? 'bg-green-300' : 'bg-white'} `} >
                    <h1 className="text-base font-semibold leading-none">{task.content}</h1>
                    <h1 className="text-sm my-2 leading-snug text-black/[0.9]">{task.description}</h1>
                    <div className="flex justify-between items-center mt-2">
                    <h1 className={`w-fit text-xs capitalize rounded-full  px-2 py-0.5 text-white ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </h1>
                    <div className="flex justify-between gap-2 items-center">
                    {/* <EditTask task={task}/> */}
                    {/* <button onClick={()=>onDeleteTask(task.id)} className=""> */}
                      <DeleteTask task={task}/>
                    {/* </button> */}
                    </div>
                    </div>
                  </div>
                </div>
              );
            }}
          </Draggable>
        );
      })}
    </div>
  );
};

export default Task;

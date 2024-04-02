import { createContext, useState } from "react";
import initialData from "../initial-data";
import { toast } from "react-toastify";


export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  

  const [taskData, setTaskData] = useState(initialData);

  const addTask = (task) => {
    // const columnId = 'column-1'; // Assume you're adding tasks to a specific column
    let columnId;
    switch (task.taskStatus) {
      case "todo":
        columnId = "column-1";
        break;
      case "inprogress":
        columnId = "column-2";
        break;
      case "pending":
        columnId = "column-3";
        break;
      case "complete":
        columnId = "column-4";
        break;
      default:
        columnId = "column-1"; // Default to "Todo" column if status is not recognized
    }

    const newTaskId = `task-${Date.now()}`; // Generate a unique task id
    const newTask = {
      id: newTaskId,
      content: task.taskName,
      priority: task.taskPriority,
      description: task.taskDescription,
      title: task.taskStatus, // Assuming the new task has a default status
    };

    // Update the state to add the new task to the appropriate column
    setTaskData((prevData) => {
      const newtaskData = { ...prevData };
      newtaskData.tasks[newTaskId] = newTask;
      newtaskData.columns[columnId].taskIds.push(newTaskId);
      return newtaskData;
    });
    toast.success("New Task Added", { position: "top-center" });

  };

  const onDeleteTask = (taskId) => {
    const newtaskData = { ...taskData };
    delete newtaskData.tasks[taskId];

    for (const columnId in newtaskData.columns) {
      const columnIndex = newtaskData.columns[columnId].taskIds.indexOf(taskId);
      if (columnIndex !== -1) {
        newtaskData.columns[columnId].taskIds.splice(columnIndex, 1);
        break;
      }
    }

    setTaskData(newtaskData);
    toast.success("Task Deleted", { position: "top-center" });
  };

  const dragEnd = (result) => {
    // console.log(result);
    const { draggableId, destination, source, type } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (type === "column") {
      // Dragging a column
      const newColumnOrder = Array.from(taskData.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newData = {
        ...taskData,
        columnOrder: newColumnOrder,
      };

      setTaskData(newData);
    } else {
      const startColumn = taskData.columns[source.droppableId];
      const finishColumn = taskData.columns[destination.droppableId];

      if (startColumn === finishColumn) {
        const newTaskIds = Array.from(startColumn.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
          ...startColumn,
          taskIds: newTaskIds,
        };

        const newData = {
          ...taskData,
          columns: {
            ...taskData.columns,
            [newColumn.id]: newColumn,
          },
        };
        setTaskData(newData);
      } else {
        const startTaskIds = Array.from(startColumn.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStartColumn = {
          ...startColumn,
          taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finishColumn.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);

        const newFinishColumn = {
          ...finishColumn,
          taskIds: finishTaskIds,
        };

        const newData = {
          ...taskData,
          columns: {
            ...taskData.columns,
            [newStartColumn.id]: newStartColumn,
            [newFinishColumn.id]: newFinishColumn,
          },
        };
        setTaskData(newData);
      }
    }
  };


  const editTask = (task, updatedTask) => {
    // Find the column where the task is currently located
    let columnId;
    for (const colId in taskData.columns) {
      if (taskData.columns[colId].taskIds.includes(task.id)) {
        columnId = colId;
        break;
      }
    }
  
    // If the task's status has changed, update the column
    if (updatedTask.task.status !== taskData.columns[columnId].title) {
      // Remove the task from the current column
      const newColumnOrder = taskData.columns[columnId].taskIds.filter((id) => id !== task.id);
  
      // Update the task's status and add it to the appropriate column
      columnId = getColumnIdByStatus(updatedTask.task.status);
      const updatedColumn = {
        ...taskData.columns[columnId],
        taskIds: [...taskData.columns[columnId].taskIds, taskId],
      };
  
      // Update the task data
      const updatedTaskData = {
        ...taskData,
        tasks: {
          ...taskData.tasks,
          [taskId]: {
            ...taskData.tasks[taskId],
            content: updatedTask.taskName,
            priority: updatedTask.taskPriority,
            description: updatedTask.taskDescription,
          },
        },
        columns: {
          ...taskData.columns,
          [columnId]: updatedColumn,
        },
      };
  
      // Set the updated task data
      setTaskData(updatedTaskData);
    } else {
      // If only the task details are updated, update the task data directly
      const updatedTaskData = {
        ...taskData,
        tasks: {
          ...taskData.tasks,
          [taskId]: {
            ...taskData.tasks[taskId],
            content: updatedTask.taskName,
            priority: updatedTask.taskPriority,
            description: updatedTask.taskDescription,
          },
        },
      };
  
      // Set the updated task data
      setTaskData(updatedTaskData);
    }
  };
  
  // Helper function to get the column ID based on task status
  const getColumnIdByStatus = (status) => {
    switch (status) {
      case 'todo':
        return 'column-1';
      case 'inprogress':
        return 'column-2';
      case 'pending':
        return 'column-3';
      case 'complete':
        return 'column-4';
      default:
        return 'column-1'; // Default to "Todo" column if status is not recognized
    }
  };


  return (
    <TaskContext.Provider
      value={{ taskData, setTaskData, addTask, onDeleteTask, dragEnd, editTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

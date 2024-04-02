import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useContext, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { TaskContext } from "../context/TaskContext";

const DeleteTask = ({ task }) => {
  let [isOpen, setIsOpen] = useState(false);
  const { onDeleteTask } = useContext(TaskContext);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="flex items-center justify-center font-Archivo">
        <button type="button" onClick={openModal}>
          <AiFillDelete className="text-red-500 text-xl" />
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto font-Archivo">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h1"
                    className="text-2xl font-medium leading-6 text-gray-900"
                  >
                    Delete Task
                  </Dialog.Title>
                  <h1 className="my-2 text-base">
                    Are you sure you want to delete this task?
                  </h1>
                  <div className="mt-2 mb-4 flex items-start ">
                    <h1 className="w-1/6">Task : </h1>
                    <h1 className="w-5/6 font-medium underline">{task.content}</h1>
                  </div>
                  <button onClick={()=>onDeleteTask(task.id)} className="w-full justify-center rounded-md  bg-red-500 px-4 py-2 text-sm font-medium text-white focus:outline-none  focus-visible:ring-red-500 focus-visible:ring-offset-2">
                    Delete Task
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DeleteTask;

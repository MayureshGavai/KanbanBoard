import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { TaskContext } from '../context/TaskContext';
import { MdEdit } from "react-icons/md";


const EditTask = ({task}) => {
    let [isOpen, setIsOpen] = useState(false);
    const { editTask, taskData } = useContext(TaskContext);
  
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm();
  
    const taskStatus = ["todo", "inprogress", "pending", "complete"];
  
    function closeModal() {
      setIsOpen(false);
    }
  
    function openModal() {
      setIsOpen(true);
    }
  
    const onSubmit = (data) => {
      console.log(data);
      editTask(data)
      reset();
      closeModal();
    };
  
    return (
      <>
        <div className="flex items-center justify-center font-Archivo">
          <button
            type="button"
            onClick={openModal}
          >
            <MdEdit className='text-blue-600 text-xl' />
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
                      Edit Task
                    </Dialog.Title>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      encType="multipart/form-data"
                      autoComplete="off"
                      className="mt-4"
                    >
                      <div className="flex justify-between items-center my-2">
                        <label htmlFor="" className="w-1/3">
                          Task Name
                        </label>
                        <div className="w-2/3">
                          <input
                            type="text"
                            {...register("taskName", { required: true, maxLength: 50 })}
                            placeholder="Task Name"
                            className="w-full px-2 py-1 border border-black rounded-md "
                            defaultValue={task.content}
                          />
                          {errors?.taskName?.type === "required" && (
                            <p style={{ color: "red" }}>This field is required</p>
                          )}
                          {errors?.taskName?.type === "maxLength" && (
                            <p style={{ color: "red" }}>
                              Maximum length is 50 characters
                            </p>
                          )}
                        </div>
                      </div>
  
                      <div className="flex justify-between items-start my-2">
                        <label htmlFor="" className="w-1/3">
                          Task Description
                        </label>
                        <div className="w-2/3">
                          <textarea
                            rows="3"
                            {...register("taskDescription", {
                              required: true,
                              minLength: 10,
                              maxLength: 200,
                            })}
                            className="w-full px-2 py-1 border border-black rounded-md"
                            placeholder="Task Description"
                            defaultValue={task.description}
                          ></textarea>
                          {errors?.taskDescription?.type === "required" && (
                            <p style={{ color: "red" }}>This field is required</p>
                          )}
                          {errors?.taskDescription?.type === "minLength" && (
                            <p style={{ color: "red" }}>
                              Minimum length is 10 characters
                            </p>
                          )}
                          {errors?.taskDescription?.type === "maxLength" && (
                            <p style={{ color: "red" }}>
                              Maximum length is 60 characters
                            </p>
                          )}
                        </div>
                      </div>
  
                      <div className="flex justify-between items-center my-2">
                        <label htmlFor="" className="w-1/3">
                          Task Priority
                        </label>
                        <select
                          {...register("taskPriority", { required: true })}
                          className="w-2/3 px-2 py-2 border border-black rounded-md capitalize"
                          defaultValue={task.priority}
                        >
                          {taskData.priority.map((priority) => (
                            <option
                              key={priority}
                              className="p-2"
                              value={priority}
                            >
                              {priority}
                            </option>
                          ))}
                        </select>
                      </div>
  
                      <div className="flex justify-between items-center my-2">
                        <label htmlFor="" className="w-1/3">
                          Task Status
                        </label>
                        <select
                          {...register("taskStatus", { required: true })}
                          className="w-2/3 px-2 py-2 border border-black rounded-md capitalize"
                          defaultValue={task.status}
                        >
                          {taskStatus.map((status, idx) => (
                            <option key={idx} className="p-2" value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </div>
  
                      <div className="mt-4">
                        <button
                          type="submit"
                          className="w-full justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white "
                          // onClick={closeModal}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
}

export default EditTask
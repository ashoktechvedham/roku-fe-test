import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function CategoryModal({isOpen, setIsOpen, categories}) {
    const [categoryName, setCategoryName] = useState("");
    const [isError, setIsError] = useState(false);

    const handleCategoryName = (e) => {
      setCategoryName(e.target.value)
    }

    const onSubmit = async (e) => {
      e.preventDefault();

      if (!categoryName || categoryName === "" || categories.includes(categoryName)) {
        setIsError(true);
        return;
      }

      try {
        await addDoc(collection(db, "categories"), {
          category: categoryName
        });

        setIsOpen(false);
      } catch (error) {
        setIsError(true);
        console.log("Error adding the category", error)
      }
    }

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                    <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-md sm:w-full sm:p-6">
                        <div>
                        <div className="mt-3 text-center sm:mt-5">
                            <Dialog.Title as="h3" className="text-2xl leading-6 font-medium text-gray-900">
                              Category Form
                            </Dialog.Title>
                            <div className="mt-2">
                                <div className='mt-4 border rounded-md border-gray-600 p-4'>
                                    <div className='flex items-center gap-2'>
                                      <div>Category name : </div>
                                      <input className='flex flex-1 border-2 border-gray-300 py-1 px-2' type='text' onChange={(e) => {
                                        setIsError(false);
                                        handleCategoryName(e);
                                      }} />
                                    </div>
                                    {
                                      isError ? <div className='text-red-500 text-left mt-2'>Please enter new category name</div> : <div></div>
                                    }

                                    <div className="mt-5 sm:mt-6">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center w-[200px] rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-500 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                            onClick={onSubmit}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>      
                            </div>
                        </div>
                        </div>
                    
                    </Dialog.Panel>
                    </Transition.Child>
                </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
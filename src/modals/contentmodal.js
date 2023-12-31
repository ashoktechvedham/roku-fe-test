import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { collection, addDoc } from 'firebase/firestore';
import Dropdown from '../components/dropdown';
import { db } from '../firebase';

export default function ContentModal({isOpen, setIsOpen, categories}) {

    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [isTitleError, setIsTitleError] = useState(false);
    const [isUrlError, setIsUrlError] = useState(false);
    const [isImageError, setIsImageError] = useState(false);
    const [isDescError, setIsDescError] = useState(false);
    const [videoQuality, setVideoQuality] = useState("");
    const [videoType, setVideoType] = useState("");

    const handleTitle = (e) => {
        setIsTitleError(false);
        setTitle(e.target.value);
    }

    const handleUrl = (e) => {
        setIsUrlError(false);
        setUrl(e.target.value);
    }

    const handleImageUrl = (e) => {
        setIsImageError(false);
        setImageUrl(e.target.value);
    }

    const handleDesc = (e) => {
        setIsDescError(false);
        setDescription(e.target.value);
    }

    const handleVideoQuality = (e) => {
        setIsDescError(false)
        setVideoQuality(e.target.value);
    }

    const handleVideoType = (e) => {
        setIsDescError(false)
        setVideoType(e.target.value);
    }

    const onSubmit = async (e) => {

        e.preventDefault();

        if (!title || title === "") {
            setIsTitleError(true);
            return;
        }

        if (!url || url === "") {
            setIsUrlError(true);
            return;
        }

        if (!imageUrl || imageUrl === "") {
            setIsImageError(true);
            return;
        }

        if (!description || description === "") {
            setIsDescError(true)
            return;
        }

        if (!videoQuality || videoQuality === ""){
            setIsDescError(true)
            return;
        }

        if (!videoType || videoType === "") {
            setIsDescError(true)
            return;
        }

        try {
            await addDoc(collection(db, `content/${category}/list`), {
                title: title,
                url: url,
                imageUrl: imageUrl,
                description: description,
                videoQuality: videoQuality,
                videoType: videoType
            });

            setIsOpen(false);
            console.log(videoQuality);
        } catch (error) {
            console.log("Error adding the category", error)
        }

        setIsOpen(false);
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
                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                            Content Form
                            </Dialog.Title>
                            <div className="mt-2">
                                <div className='mt-4 border rounded-md border-gray-600 p-4'>
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex items-center gap-2'>
                                            <div className='w-[80px] text-left'>Title : </div>
                                            <input className='flex flex-1 border-2 border-gray-300 py-1 px-2' type='text' onChange={(e) => handleTitle(e)} />
                                        </div>
                                        {
                                            isTitleError ? <div className='text-red-500 text-left pl-[88px]'>Please enter the title</div> : <div></div>
                                        }
                                        <div className='flex items-center gap-2'>
                                            <div className='w-[80px] text-left' >Url : </div>
                                            <input className='flex flex-1 border-2 border-gray-300 py-1 px-2' type='text' onChange={(e) => handleUrl(e)} />
                                        </div>
                                        {
                                            isUrlError ? <div className='text-red-500 text-left pl-[88px]'>Please enter the URL</div> : <div></div>
                                        }
                                        <div className='flex items-center gap-2'>
                                            <div className='w-[80px] text-left' >Image Url : </div>
                                            <input className='flex flex-1 border-2 border-gray-300 py-1 px-2' type='text' onChange={(e) => handleImageUrl(e)} />
                                        </div>
                                        {
                                            isImageError ? <div className='text-red-500 text-left pl-[88px]'>Please enter the Image URL</div> : <div></div>
                                        }
                                        <div className='flex items-center gap-2'>
                                            <div className='w-[80px] text-left' >Description:</div>
                                            <input className='flex flex-1 border-2 border-gray-300 py-1 px-2' type='text' onChange={(e) => handleDesc(e)} />
                                        </div>
                                        {
                                            isDescError ? <div className='text-red-500 text-left pl-[88px]'>Please enter the Description</div> : <div></div>
                                        }
                                        <div className='flex'>
                                            <div className='w-[80px] text-left'>Category : </div>
                                            <div className='flex-1'><Dropdown value={category === "" ? categories[0] : category} setValue={setCategory} categories={categories} /></div>
                                        </div>
                                        <div className='flex'>
                                            <div className='w-[80px] text-left'>Quality : </div>                   
                                            <input type="radio" name="videoQuality" value="SD" id="SD" checked={videoQuality === "SD"} onChange={handleVideoQuality}/>
                                            <label htmlFor="SD" style={{marginRight: 20}}>SD</label>
                                            <input type="radio" name="videoQuality" value="HD" id="HD" checked={videoQuality === "HD"} onChange={handleVideoQuality} />
                                            <label htmlFor="HD" style={{marginRight: 20}}>HD</label>
                                        </div>
                                        <div className='flex'>
                                            <div className='w-[80px] text-left'>Formar : </div>                   
                                            <input type="radio" name="videoType" value="MP4" id="MP4" checked={videoType === "MP4"} onChange={handleVideoType}/>
                                            <label htmlFor="MP4" style={{marginRight: 20}}>MP4</label>
                                            <input type="radio" name="videoType" value="HLS" id="HLS" checked={videoType === "HLS"} onChange={handleVideoType} />
                                            <label htmlFor="HLS" style={{marginRight: 20}}>HLS</label>
                                            <input type="radio" name="videoType" value="MKV" id="MKV" checked={videoType === "MKV"} onChange={handleVideoType} />
                                            <label htmlFor="MKV" style={{marginRight: 20}}>MKV</label>
                                        </div>
                                    </div>

                                    <div className="mt-5 sm:mt-12">
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
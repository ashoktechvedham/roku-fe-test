import React, {useEffect, useState} from 'react';
import { collection, deleteDoc, setDoc, getDocs, doc } from 'firebase/firestore';
import CategoryModal from '../modals/categorymodal';
import ContentModal from '../modals/contentmodal';
import { db } from '../firebase';
import ContentList from '../components/contentlist';
import DeleteModal from '../modals/deletemodal';
import EditModal from '../modals/editmodal';

function Home() {

    const [isContent, setIsContent] = useState(false);
    const [isCategory, setIsCategory] = useState(false);
    const [contentList, setContentList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isDelete, setIsDelete] = useState(false);
    const [deleteContent, setDeleteContent] = useState({id: "", category: "", title: "", url: "", imageUrl: "", description: ""});
    const [isEdit, setIsEdit] = useState(false);
    const [editContent, setEditContent] = useState({id: "", category: "", title: "", url: "", imageUrl: "", description: ""});

    const onCategory = () => {
        setIsCategory(true);
    }

    const onContent = () => {
        setIsContent(true);
    }

    const fetchCategory = async () => {
        await getDocs(collection(db, "categories")).then((querySnapshot) => {
            const queryCategory = querySnapshot.docs.map((doc) => doc.data().category);
            setCategories(queryCategory);
        })
    }

    const fetchContent = async () => {
        const contentArr = [];
        for (let index = 0; index < categories.length; index++) {
            try {
                const querySnapshot = await getDocs(collection(db, "content", categories[index], "list"));
                const contentData = querySnapshot.docs.map((doc) => ({
                    ...doc.data(), id:doc.id, category: categories[index]
                }));
                contentArr.push(...contentData);
            } catch (error) {
                
            }
        }
        setContentList(contentArr);
    }

    useEffect(() => {
        fetchCategory();
    }, [isCategory]);

    useEffect(() => {
        fetchContent();
    },[JSON.stringify(categories), isDelete, isEdit]);

    const handleFetchData = () => {
        fetchCategory();
        fetchContent();
    }

    const handleDelete = (deleteData) => {
        setIsDelete(true);
        setDeleteContent(deleteData);
    }

    const handleEdit = (editData) => {
        setIsEdit(true);
        setEditContent(editData);
    }


    return (
        <div className='flex justify-center'>
            <div className='flex w-[768px] h-[640px] border border-gray-600 rounded-sm my-8'>
                <div className='flex flex-col w-full px-8 py-6'>
                    <div className='flex gap-2 justify-end items-center'>
                        <div className='border-2 rounded-md px-4 py-2 border-gray-400' onClick={onCategory}>Add Category</div>
                        <div className='border-2 rounded-md px-4 py-2 border-gray-400' onClick={onContent}>Add Content</div>
                    </div>
                    <button className='w-[300px] mt-6 px-4 py-2 text-center bg-indigo-400 text-white font-medium border-2 rounded-md border-indigo-300' onClick={handleFetchData}>Fetch data from firebase Database</button>
                    <div>
                        <ContentList contents={contentList} onDelete={handleDelete} onEdit={handleEdit} />
                    </div>
                </div>

                <CategoryModal isOpen={isCategory} setIsOpen={setIsCategory} categories={categories} />
                <ContentModal isOpen={isContent} setIsOpen={setIsContent} categories={categories} />
                <DeleteModal isOpen={isDelete} setIsOpen={setIsDelete} deleteData={deleteContent} />
                <EditModal isOpen={isEdit} setIsOpen={setIsEdit} editData={editContent} categories={categories} />
            </div>
        </div>
        
    )
}

export default Home
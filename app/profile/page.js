"use client"
import React, { useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Page = () => {
    const { user, updateTestField } = UserAuth();
    const [loading, setLoading] = useState(null);
    const [testfield, setTestfield] = useState(user ? user.testfield : '');

    let setUser = false;

    const [newItem, setNewItem] = useState({
        testfield: ''
    });

    //update test field
    const handleTestFieldChange = (e) => {
        const newValue = e.target.value;
        setTestfield(newValue);
    };

    const handleEnterKey = async (e) => {
        if (e.key === 'Enter') {
            // Call the function to update the database
            try{
                await updateTestField(testfield)
                setTestfield(testfield)
            }
            catch(error){
                console.error(error)
            }
        }
    };

    useEffect(()=>{
        const fetchTestField = async ()=>{
            if (user){
                const docRef = doc(db, 'users', user.uid)
                const docSnapshot = await getDoc(docRef)

                if (docSnapshot.exists()){
                    const userData = docSnapshot.data();
                    setTestfield(userData.testfield || '')
                }
            }
            setLoading(false)
        }
        if (user) {
            fetchTestField();
        }
    }, [user])

    useEffect(() => {
        if (user) {
            setTestfield(user.testfield || '');
        }
    }, [user]);

    //adding items
    const addItem = async (e) => {
        e.preventDefault();
        if (newItem.name !== "") {
            await addDoc(collection(db, 'items'), {
                testfield: newItem.testfield.trim(),
            });
            setNewItem({ testfield: '' });
        }
    };

    useEffect(() => {
        const checkAuthentication = async () => {
            await new Promise((resolve) => setTimeout(resolve, 50));
            setLoading(false);
        };
        checkAuthentication();
    }, [user]);

    return (
        <div className='p-4 h-screen bg-green-100'>
            {user ? (
                <main>
                    <div>
                        <button className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4">Change Username:</button>
                        <input
                            value={testfield}
                            onChange={handleTestFieldChange}
                            onKeyDown={handleEnterKey}
                            className='bg-green-200 appearance-none border-2 border-green-400 rounded w-30 h-10 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500 ml-2'
                            type="text"
                        />
                    </div>
                    <div>
                        <p>{user.testfield}</p>
                        <p>daida</p>
                    </div>
                </main>
            ) : (
                <p>You must be logged in to view this page</p>
            )}
        </div>
    );  
};

export default Page;

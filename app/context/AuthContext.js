import { useContext,createContext, useState, useEffect } from "react";
import {doc, setDoc, updateDoc} from 'firebase/firestore'
import {signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider} from 'firebase/auth'
import { auth } from "../firebase";
import { db } from "../firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) =>{
    const [user, setUser] = useState(null)
    
    const googleSignIn =() =>{
        const provider = new GoogleAuthProvider()

        signInWithPopup(auth, provider).then((userCredential)=>{
            const userData = userCredential.user;
            const userRef = doc(db, 'users', userData.uid);
            setDoc(userRef, {
                name: userData.displayName,
                email: userData.email,
                testfield: '',
            });

        setUser(userData);
        });
    }

    const logOut = () =>{
        signOut(auth)
    }

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser)
        })
        return () => unsubscribe()
    }, [user])

    const updateTestField = async (newValue) =>{
        if (user){
            const userRef= doc(db, 'users', user.uid)
        
        await updateDoc(userRef, {
            testfield: newValue,
        });
        setUser({...user, testfield: newValue})
        }
    }
    //must pass all the functions in your context handler into your provider value
    return (
        <AuthContext.Provider value = {{user, googleSignIn, logOut, updateTestField}}>{children}</AuthContext.Provider>
    )
}

export const UserAuth = () =>{
    return useContext(AuthContext)
}
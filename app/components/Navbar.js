import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import { UserAuth } from '../context/AuthContext'

const Navbar = () => {
    //stuff wrapped in the provider is accessible through other classes by calling this VVVVV
    const {user, googleSignIn, logOut} = UserAuth();
    const [loading, setLoading] = useState(true)
    
    const handleSignIn = async () =>{
        try{
            await googleSignIn()
        }   
        catch(error){
            console.log(error)
        }
    }

    const handleSignOut = async()=> {
        try{
            await logOut()
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(() =>{
        const checkAuthentication = async ()=>{
            await new Promise((resolve) => setTimeout(resolve, 50))
            setLoading(false);
        }
        checkAuthentication();
    }, [user])

  return (
    <div className='h-20 w-full border-b-2 flex items-center justify-between p-2 bg-green-300'>
        <ul className='flex'>
            <li className='p-2 cursor-pointer'>
                <Link href ='/'>Home</Link>
            </li>
            <li className='p-2 cursor-pointer'>
                <Link href ='/about'>About</Link>
            </li>
            <li className='p-2 cursor-pointer'>
                <Link href ='/profile'>Profile</Link>
            </li>
            <li className='p-2 cursor-pointer'>
                <Link href ='/courts'>Courts</Link>
            </li>
        </ul>
        <div className="flex items-center"> {/* Create a flex container */}
            <img
                src="https://static.vecteezy.com/system/resources/previews/013/362/731/original/tennis-ball-transparent-free-png.png"
                alt=""
                className="h-10 w-10 mr-3" // Set the width and height of the image
            />
            <h1 className='font-bold text-2xl'>Tennis Hub</h1>
        </div>
        
        {loading ? null : !user ? (<ul className='flex'>
            <li onClick= {handleSignIn} className='p-2 cursor-pointer'>
                Login
            </li>
            <li onClick = {handleSignIn} className='p-2 cursor-pointer'>
                Sign Up
            </li>
        </ul>) : (
            <div>
                <p>Welcome, {user.displayName}</p>
                <p className='cursor-pointer' onClick = {handleSignOut}>Sign Out</p>
            </div>
        )}

    </div>
  )
}

export default Navbar
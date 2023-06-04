import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../Actions/User';
import { Link} from 'react-router-dom';



export default function Login() {
   
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const dispatch = useDispatch();
    

    function onSubmit(e){
        e.preventDefault()
        dispatch(loginUser(email,password))
       
        
        
    }

  return (
    <div className='w-full'>
    <div className='max-w-[1240px] mx-auto flex justify-center'>
      <form  className='p-4 flex flex-col mt-56 shadow-xl' onSubmit={onSubmit}>                      
        <label className='text-3xl font-bold mb-10 flex justify-center'>Login</label>
     
        <input
        className="rounded-sm border-black border w-80 p-2 mt-4"
        placeholder='Enter Email'
         type="text" 
        name='emal'
        onChange = {(e)=>setEmail(e.target.value)}
        value={email}

        />
      
        <input 
        className="rounded-sm border-black border w-80 p-2 mt-4 "
        placeholder='Enter Password'
        type="text"
        name='pass' 
        onChange = {(e)=>setPassword(e.target.value)}
        value={password}
        />
 
    
      <button 
      type='submit' 
      className=' mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ' 
      >Submit</button>
    
     <Link to="/">
      <label>New user?</label>
     </Link>


      </form> 
 
      </div>
    </div>
  )
}

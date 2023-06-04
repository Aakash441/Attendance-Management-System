import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../Actions/User';


export default function SignUp() {

    const[name,setName] = useState('');
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const dispatch = useDispatch();
    
    const loginHandler=(e)=>{
      e.preventDefault()
      dispatch(registerUser(name,email,password));
    }

  return (
    <div>
         <div className='h-[100vh] flex justify-center items-center'>
                <form className='flex flex-col p-4 shadow-xl'>
                    <label  className='mx-auto p-2 font-bold text-3xl'>Signup</label>
                    <input 
                    type='text' 
                    className="rounded-sm border-black border w-80 p-2 mt-4 "
                    onChange={(e)=>setName(e.target.value)} value={name} placeholder='Enter name' />
                    <input type='text' 
                    className="rounded-sm border-black border w-80 p-2 mt-4 "
                    onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='Enter email'  />
                    <input type='text' 
                    className="rounded-sm border-black border w-80 p-2 mt-4 "
                    onChange={(e)=>setPassword(e.target.value)} value={password} placeholder='Enter password' />  
                    <button type='submit' onClick={loginHandler} className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-2 text-black'>Submit</button>
                </form>
            
         </div>   
       
    </div>
  )
}

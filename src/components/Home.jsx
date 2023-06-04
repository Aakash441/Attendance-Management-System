import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { form, logOutUser } from '../Actions/User';

export default function Home() {
  const dispatch = useDispatch();
  const[branch,setBranch] = useState('');
  const[name,setName]=useState('');
  const[file,setFile]=useState(null);
  const[classes,setClasses]=useState([]);
  const token ="token";

  const logoutHandler=()=>{
    dispatch(logOutUser());
  }

  const handleAddClass=()=>{
  
    const newClass= {branch:branch,name:name};
    setClasses([...classes,newClass]);

  const storedClasses=JSON.parse(localStorage.getItem(token))||[];
  localStorage.setItem(token,JSON.stringify([...storedClasses,newClass]))

  const formData = new FormData()
  formData.append('csvFile',file)
  formData.append('name',name)
  formData.append('branch',branch)
  dispatch(form(formData))

    setBranch("");
    setName("");
  }

  useEffect(()=>{
    const storedClasses=JSON.parse(localStorage.getItem(token)||[]);
    setClasses(storedClasses);
  },[token]);

  function onfilechange(e){
    console.log(e.target.files)
    setFile(e.target.files[0])
 }

//  const submitfiledata=(e)=>{
//   const formData = new FormData()
//   formData.append('csvFile',file)
//   formData.append('div',divison)
//   formData.append('branch',branch)
//   dispatch(form(formData))
// }
  
  const handleDeleteClass = (index) => {
    const newClasses = [...classes];
    newClasses.splice(index, 1);
    setClasses(newClasses);
    localStorage.setItem(token, JSON.stringify(newClasses));
  }
 


  return (
    <div className='w-full'>
      <nav className='flex justify-between bg-slate-500 items-center'>
        <h1 className='p-4 font-bold text-2xl uppercase'>Attendance</h1>
        <ul className='flex p-6 gap-8 text-lg mr-12'>
          <li><a className='p-4 hover:text-slate-300' href='/'>Take Attendance</a></li>
          <li><a className='p-4 hover:text-slate-300' href='/'>View Attendance</a></li>
          <li><a className='p-4 hover:text-slate-300' href='/' onClick={logoutHandler}>Logout</a></li>
        </ul>
      </nav>

      <div className='flex flex-col w-[600px] mt-8 m-auto'>
        <input 
        className="rounded-sm border-black border mx-auto w-80 p-2 mt-4"
        type='text'
        onChange={(e)=>setBranch(e.target.value)}
        placeholder='Branch Name e.g. CSE,IT'
        value={branch}  
        />
        <input className="rounded-sm border-black border mx-auto w-80 p-2 mt-4" 
        type='text'
        onChange={(e)=>setName(e.target.value)}
        placeholder='Semester/Divison e.g. 5A,6B' 
        value={name}
        />
        <label className='mx-auto mt-4'>Add .csv file, with name of students</label>
        <input className='mx-auto mt-2' type='file' name='file_upload' onChange={onfilechange} />
        <p className='mx-auto'>(Note that column name must be Name)</p>
        <button
        onClick={handleAddClass} 
        className=' w-[180px] bg-slate-400 rounded-md font-medium my-6 mx-auto py-2 text-black'>
        Add class</button>
      </div>
    
      <div className='flex mx-12'>

        {classes.map((item,index)=>(
          <div>
          {/* <Link key={index} to={`/class/${item.name}`}> */}
          <div
          className="bg-gray-300 w-[250px] h-[125px] p-4 mt-4 ml-4 rounded-md flex flex-col cursor-pointer ">
          <p className='p-2 font-semibold text-lg'>BRANCH-{item.branch}</p>
          <p className='p-2 font-semibold text-lg'>DIVISION-{item.name}</p> 

          </div>
        
          {/* </Link> */}
          <div className='flex flex-col'>
          
            <Link  to={`/viewattendance/${item.name}`}>
            <button  className="mt-2 mx-auto px-2 py-1 flex justify-center w-[150px] rounded-sm bg-red-600 text-white hover:bg-red-800">
              View Attendance
            </button>
            </Link>
            <Link  to={`/takeattendance/${item.name}`}>
            <button  className="mt-2 flex justify-center mx-auto px-2 py-1 w-[150px] rounded-sm bg-red-600 text-white hover:bg-red-800">
              Take Attendance
            </button>
            </Link>
            <button onClick={() => handleDeleteClass(index)} className="mt-2 mx-auto px-2 w-[150px] py-1 rounded-sm bg-red-600 text-white hover:bg-red-800">
              Delete
            </button>
          </div>
          </div>
          
  
        ))
        }
      </div>
        
    </div>
  )
}

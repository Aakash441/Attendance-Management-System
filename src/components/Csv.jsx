import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { form } from '../Actions/User';
import axios from 'axios';

export default function Csv() {

   const dispatch = useDispatch();
   const[file,setFile]=useState(null);
   const [name, setName] = useState("");
   const [branch, setBranch] = useState("");
  //  const[data,setData]=useState([]);
   const [students, setStudents] = useState([]);

  //  useEffect(()=>{
  //     fetch('/api/v1/getdata') 
  //     .then(response => response.json())
  //     .then(data => setData(data));
  //  },[])
  useEffect(() => {
    axios.get('/api/v1/getdata')
      .then(res => {
        const updatedStudents = res.data.map(student => {
          return {
            ...student,
            attendance: 'Present'
          };
        });
        setStudents(updatedStudents);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

   function onfilechange(e){
      console.log(e.target.files)
      setFile(e.target.files[0])
   }


   const submitfiledata=(e)=>{
      const formData = new FormData()
      formData.append('csvFile',file)
      formData.append('name',name)
      formData.append('branch',branch)
      dispatch(form(formData))
   }

  //  const handleMarkAttendance = (index, value) => {
  //     const newData = [...data];
  //     newData[index].attendance = value;
  //     setData(newData);
  //   }

  
  const handleAttendanceChange = (event, student) => {
    const newAttendance = event.target.value;
    setStudents(students.map(s => {
      if (s._id === student._id) {
        return { ...s, attendance: newAttendance };
      } else {
        return s;
      }
    }));
  };

  const handleSaveAttendance = () => {

    const currentDate = new Date().toISOString().slice(0, 10);
    const currentTime = new Date().toLocaleTimeString();
    console.log(currentDate);
    const updatedStudents = students.map(student => ({
      ...student,
      attendance: student.attendance || 'absent',
      date: currentDate,
      time: currentTime
    }));

    axios.put('/api/v1/attendance', {  students: updatedStudents, date: currentDate, time: currentTime })
      .then(res => {
        console.log('Attendance updated successfully');
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div>
    <div className='flex  justify-center mt-8'>
         <input type='file' name='file_upload' onChange={onfilechange} />
         <input  className="rounded-sm border-black border w-80 p-2 "  
         type="text"
         placeholder='Enter SEMESTER AND DIV e.g 6A/6B'
          onChange={(e) => setName(e.target.value)} value={name} />
            <input  className="rounded-sm border-black border w-80 p-2 "  
         type="text"
         placeholder='Enter Branch'
          onChange={(e) => setBranch(e.target.value)} value={branch} />
         <button
         className='ml-4 bg-blue-500 hover:bg-blue-700 text-white w-[300px] font-bold py-2 px-4 rounded'
      
         onClick={submitfiledata} 
         >Submit</button>
    </div>

    {/* <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Attendance Sheet</h1>
      <table className="table-auto border w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Divison</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Attendance</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border">{item.name}</td>
              <td className="py-2 px-4 border">{item.Name}</td>
              <td className="py-2 px-4 border">
                <select className="border rounded-md py-1 px-2" onChange={(e) => handleMarkAttendance(index, e.target.value)}>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div> */}

    <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Division</th>
            <th className="px-4 py-2">Branch</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Attendance</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              <td className="border px-4 py-2">{student.div}</td>
              <td className="border px-4 py-2">{student.branch}</td>
              <td className="border px-4 py-2">{student.Name}</td>
              <td className="border px-4 py-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-4 w-4 text-gray-600"
                    name={`attendance-${student._id}`}
                    value="Present"
                    checked={student.attendance === 'Present'}
                    onChange={(e) => handleAttendanceChange(e, student)}
                  />
                  <span className="ml-2">Present</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    className="form-radio h-4 w-4 text-gray-600"
                    name={`attendance-${student._id}`}
                    value="Absent"
                    checked={student.attendance === 'Absent'}
                    onChange={(e) => handleAttendanceChange(e, student)}
                  />
                  <span className="ml-2">Absent</span>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSaveAttendance}>
          Save Attendance
        </button>
      </div>
     
    </div>
  )
}

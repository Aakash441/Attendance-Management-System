
import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'

export default function TakeAttendance() {
  const{name} = useParams();
  const [students, setStudents] = useState([]);

 useEffect(() => {
   axios.get(`/api/v1/takeattendance?div=${name}`)
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
      <div className="mt-4 flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSaveAttendance}>
          Save Attendance
        </button>
      </div>
    </div>
  )
}

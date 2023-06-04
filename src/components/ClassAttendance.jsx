// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'

// export default function ClassAttendance() {
//     const{name} = useParams();
//     const[students,setStudents]=useState([]);
//     const [isAttendanceLoaded, setIsAttendanceLoaded] = useState(false);
   
//          // Fetch attendance data for the selected class
//   useEffect(() => {
//     const fetchData = async () => {
//       console.log(name)
//       const response = await fetch(`/api/v1/getdata?div=${name}`);
//       const data = await response.json();
//       setStudents(data);
//       setIsAttendanceLoaded(true);
//     };

//     fetchData(); // call the fetchData function to fetch the data
//   }, [name]); // include name in the dependency array
       

//   return (
//     <div>
//         <div className='flex '>
//           {/* <button onClick={fetchData} className="mt-2 mx-auto px-2 py-1 w-[150px] rounded-sm bg-red-600 text-white hover:bg-red-800">
//               View Attendance
//             </button>
//             <button  className="mt-2 mx-auto px-2 py-1 w-[150px] rounded-sm bg-red-600 text-white hover:bg-red-800">
//               Take Attendance
//             </button> */}

//           </div>

//           {isAttendanceLoaded && (
//         <table className="table-auto w-full m-4">
//           <thead>
//             <tr>
//               <th className="px-4 py-2">Division</th>
//               <th className="px-4 py-2">Branch</th>
//               <th className="px-4 py-2">Name</th>
//               <th className="px-4 py-2">Attendance</th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.map(student => (
//               <tr key={student._id}>
//                 <td className="border px-4 py-2 flex justify-center">{student.div}</td>
//                 <td className="border px-4 py-2">{student.branch}</td>
//                 <td className="border px-4 py-2">{student.Name}</td>
//                 <td className="border px-4 py-2">
                 
                
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
    
//     </div>
//   )
// }

// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'

// export default function ClassAttendance() {
//   const { name } = useParams();
//   const [students, setStudents] = useState([]);
//   const [isAttendanceLoaded, setIsAttendanceLoaded] = useState(false);
//   const [selectedDate, setSelectedDate] = useState('');
  
//   // Fetch attendance data for the selected class
//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch(`/api/v1/getdata?div=${name}`);
//       const data = await response.json();
//       setStudents(data);
//       setIsAttendanceLoaded(true);
//     };
//     fetchData();
//   }, [name]);

//   // Get the unique dates from the students' attendance records
//   const uniqueDates = [...new Set(students.map(student => student.date))];

//   // Event handler for when the date is changed
//   const handleDateChange = (event) => {
//     setSelectedDate(event.target.value);
//   }

//   return (
//     <div>
//       <div className='flex'>
//         <select
//           className="mt-2 mx-auto px-2 py-1 w-[150px] rounded-sm bg-red-600 text-white hover:bg-red-800"
//           value={selectedDate}
//           onChange={handleDateChange}
//         >
//           <option value="">Select date</option>
//           {uniqueDates.map((date) => (
//             <option key={date} value={date}>{date}</option>
//           ))}
//         </select>
//       </div>

//       {isAttendanceLoaded && (
//         <table className="table-auto w-full m-4">
//           <thead>
//             <tr>
//               <th className="px-4 py-2">Division</th>
//               <th className="px-4 py-2">Branch</th>
//               <th className="px-4 py-2">Name</th>
//               <th className="px-4 py-2">Attendance</th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.map((student) => (
//               selectedDate === student.date &&
//               <tr key={student._id}>
//                 <td className="border px-4 py-2 flex justify-center">{student.div}</td>
//                 <td className="border px-4 py-2">{student.branch}</td>
//                 <td className="border px-4 py-2">{student.Name}</td>
//                 <td className="border px-4 py-2">
//                   {student.attendance === 'P' ? 'Present' : 'Absent'}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { saveAs } from 'file-saver';

export default function ViewAttendance() {
  const { name } = useParams();
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    axios.get(`/api/v1/getdata?div=${name}`)
      .then(res => {
        setDates(res.data);
        setSelectedDate(res.data[0]);
      })
      .catch(err => {
        console.error(err);
      });
  }, [name]);

  useEffect(() => {
    if (selectedDate) {
      axios.get(`/api/v1/showattendance?div=${name}&date=${selectedDate}`)
        .then(res => {
          setAttendance(res.data);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [name, selectedDate]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleDownloadClick = () => {
    let csvContent = "Name,Attendance\n";
    attendance.forEach(a => {
      csvContent += `${a.Name},${a.attendance}\n`;
    });
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${name}-${selectedDate}-attendance.csv`);
  };

  return (
<div class="p-4">
  <form class="mb-4">
    <label class="mr-2">
      Select Date:
      <select class="ml-2 p-2 border border-gray-300 rounded-md" value={selectedDate} onChange={handleDateChange}>
        {dates.map(date => (
          <option key={date} value={date}>{date}</option>
        ))}
      </select>
    </label>
    <button class="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md" type="button" onClick={() => setSelectedDate('')}>Clear</button>
    {attendance.length > 0 && <button class="ml-2 px-4 py-2 bg-green-500 text-white rounded-md" type="button" onClick={handleDownloadClick}>Download</button>}
  </form>
  <table class="w-full">
    <thead>
      <tr>
        <th class="px-4 py-2 bg-gray-200">Name</th>
        <th class="px-4 py-2 bg-gray-200">Attendance</th>
      </tr>
    </thead>
    <tbody>
      {attendance.map(a => (
        <tr key={a._id}>
          <td class="px-4 py-2 border">{a.Name}</td>
          <td class="px-4 py-2 border">{a.attendance}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
}
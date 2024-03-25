import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Test() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:9000/student/get-all-students', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMTY0MUE2Nko0IiwiaWF0IjoxNzA5OTAyNDg0LCJleHAiOjE3MDk5ODg4ODR9._cWopwB7nhSnBaSSvVsJEZrrHATx1Bj87aDr-75vaCTOscpQoa3BioSPVMNvsTqQ37PBRGE8_9LRsDBQi6_h2g'
        }
      });
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  

  return (
    <div>
      <h1>All Students</h1>
      <ul>
        {students.map(student => (
          <li key={student.studentId}>
            {student.studentId} - {student.studentName}
          </li>
        ))}
      </ul>
    </div>
  );
}
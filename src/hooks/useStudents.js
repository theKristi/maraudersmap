import seedStudents from '../data/students'
import { useState, useEffect } from 'react'

function useStudents(){
    const [students, setStudents] = useState(() => {
        const saved = localStorage.getItem('students')
        return saved ? JSON.parse(saved): seedStudents
    });
         //saving
    useEffect(() => {
     localStorage.setItem('students', JSON.stringify(students))
    }, [students])
  function addStudent(student){
    setStudents([...students, student])  
  }
  function deleteStudent(id){
    setStudents(students.filter(s => s.id !== id))

  }
return { students, addStudent, deleteStudent }
}
export default useStudents
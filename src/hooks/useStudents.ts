import seedStudents from '../data/students'
import { useState, useEffect } from 'react'
import type { Student } from '../types';

function useStudents(){
    const [students, setStudents] = useState<Student[]>(() => {
        const saved = localStorage.getItem('students')
        return saved ? JSON.parse(saved): seedStudents
    });
         //saving
    useEffect(() => {
     localStorage.setItem('students', JSON.stringify(students))
    }, [students])
  function addStudent(student: Student){
    setStudents([...students, student])  
  }
  function deleteStudent(id:number){
    setStudents(students.filter(s => s.id !== id))

  }
return { students, addStudent, deleteStudent }
}
export default useStudents
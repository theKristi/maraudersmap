import seedStudents from '../data/students'
import { useState, useEffect } from 'react'
import type { Student } from '../types';

function useStudents(){
    const [students, setStudents] = useState<Student[]>(() => {
        const saved = localStorage.getItem('students')
        // ignore cached data saved before students had a schedule
        const parsed: Student[] | null = saved ? JSON.parse(saved) : null
        return parsed?.every(s => Array.isArray(s.schedule)) ? parsed : seedStudents
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
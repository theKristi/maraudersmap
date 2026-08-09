import { useState } from 'react'
import type { Student } from '../../types'
import { CharmsClassroom } from './Charms_class'
import { TransfigurationClassroom } from './Transfiguration_class'
import './Classrooms.css'

const CLASSROOMS = ["Charms", "Transfiguration"]

export function Classrooms({ students }: { students: Student[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const classroomComponents = [
    <CharmsClassroom students={students} />,
    <TransfigurationClassroom students={students} />,
  ]

  return (
    <div className="classrooms-container"
     onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1)
                const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1)
                console.log(`left: "${x}%", top: "${y}%"`)
            }}
    >
      <div className="classroom-nav">
        <button onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}>←</button>
        <span>{CLASSROOMS[currentIndex]}</span>
        <button onClick={() => setCurrentIndex(i => Math.min(CLASSROOMS.length - 1, i + 1))}>→</button>
      </div>
      {classroomComponents[currentIndex]}
    </div>
  )
}
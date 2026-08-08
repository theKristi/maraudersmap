
import './App.css'
import { GreatHall } from './components/GreatHall'
import { Library } from './components/Library'
import { useState, type JSX} from 'react'
import useStudents from './hooks/useStudents'
import getLocation from './utils/getLocation'
import getCurrentRoom from './utils/getCurrentRoom'
import type {Room} from './types'


function App() {
  const [currentRoom, setCurrentRoom]= useState(() => getCurrentRoom())
  const { students } = useStudents()
  const studentsInGreatHall = students.filter(s => getLocation(s.house) === "great-hall")
  const studentsInLibrary = students.filter(s => getLocation(s.house) === "library").slice(0,20);
  const roomComponents: Record<Room, JSX.Element> = {
    "great-hall": <GreatHall students={studentsInGreatHall} />,
    "library": <Library students={studentsInLibrary} />,
    //"Gryffindor-common-room": 
  }
  return (

    <div className="app-layout">
      <div className="map-panel">
        {roomComponents[currentRoom]}
      </div>
      <div className="admin-panel">
        <div className="nav-buttons">
          <button onClick={() => setCurrentRoom("great-hall")}>Great Hall</button>
          <button onClick={() => setCurrentRoom("library")}>Library</button>
        </div>
      </div>
    </div>
  )
}

export default App

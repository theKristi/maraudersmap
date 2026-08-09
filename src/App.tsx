
import './App.css'
import { GreatHall } from './components/GreatHall'
import { Library } from './components/Library'
import { useState, type JSX } from 'react'
import useStudents from './hooks/useStudents'
import getLocation from './utils/getLocation'
import getCurrentRoom from './utils/getCurrentRoom'
import type { Room } from './types'
import { Classrooms } from './components/Classrooms/Classrooms'


function App() {

  const { students } = useStudents()
  const studentsInGreatHall = students.filter(s => getLocation(s.house) === "great-hall")
  const studentsInLibrary = students.filter(s => getLocation(s.house) === "library").slice(0, 20);
  const studentsInClass = students.filter(s => getLocation(s.house) === "classrooms").slice(0, 15);
  const roomComponents: Record<Room, JSX.Element> = {
    "great-hall": <GreatHall students={studentsInGreatHall} />,
    "library": <Library students={studentsInLibrary} />,
    "classrooms": <Classrooms students={studentsInClass} />
    //"Gryffindor-common-room": 
  }
  const [currentRoom, setCurrentRoom] = useState<Room>(() => getCurrentRoom())
  const [displayedRoom, setDisplayedRoom] = useState<Room>(currentRoom)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const navigateTo = (room: Room) => {
    if (room === displayedRoom || isTransitioning) return
    setCurrentRoom(room)      // store where we're going
    setIsTransitioning(true)  // trigger fold-out
  }

  const handleFoldOut = () => {
    setDisplayedRoom(currentRoom)  // swap the room
    setIsTransitioning(false)       // trigger fold-in
  }
  return (

    <div className="app-layout">
      <div 
        className={`map-panel ${isTransitioning ? 'fold-out' : 'fold-in'}`} 
        onAnimationEnd={isTransitioning ? handleFoldOut : undefined}
      >
        {roomComponents[displayedRoom]}
      </div>
      <div className="admin-panel">
        <div className="nav-buttons">
          <button onClick={() => navigateTo("great-hall")}>Great Hall</button>
<button onClick={() => navigateTo("library")}>Library</button>
<button onClick={() => navigateTo("classrooms")}>Classrooms</button>
        </div>
      </div>
    </div>
  )
}

export default App

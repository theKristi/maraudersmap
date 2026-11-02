
import './App.css'
import { GreatHall } from './components/GreatHall/GreatHall'
import { Library } from './components/Library'
import { useState, type JSX } from 'react'
import useStudents from './hooks/useStudents'
import getLocation from './utils/getLocation'
import type { Room } from './types'
import { CharmsClassroom } from './components/Classrooms/Charms_class'
import MasterMap from './components/MasterMap/MasterMap'
import { TransfigurationClassroom } from './components/Classrooms/Transfiguration_class'



function App() {

  const { students } = useStudents()
  const studentsInGreatHall = students.filter(s => getLocation(s) === "Great-Hall")
  const studentsInLibrary = students.filter(s => getLocation(s) === "Library")
  const studentsInCharms = students.filter(s => getLocation(s) === "Charms-Classroom")
  const studentsInTransfiguration = students.filter(s => getLocation(s) === "Transfiguration-Classroom")
  const roomComponents: Partial<Record<Room, JSX.Element>> = {
    "Great-Hall": <GreatHall students={studentsInGreatHall} />,
    "Library": <Library students={studentsInLibrary} />,
    "Charms-Classroom": <CharmsClassroom students={studentsInCharms} />,
    "Transfiguration-Classroom":<TransfigurationClassroom students={studentsInTransfiguration} />,
    //"Gryffindor-common-room": 
  }
  const [currentRoom, setCurrentRoom] = useState<Room>("Great-Hall")
  const [displayedRoom, setDisplayedRoom] = useState<Room>(currentRoom)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [isAdminOpen, setIsAdminOpen] = useState(false)

  const navigateTo = (room: Room) => {
    setShowMap(false)
    if (room === displayedRoom || isTransitioning) return
    setCurrentRoom(room)      // store where we're going
    setIsTransitioning(true)  // trigger fold-out
  }

  const handleFoldOut = () => {
    setDisplayedRoom(currentRoom)  // swap the room
    setIsTransitioning(false)       // trigger fold-in
  }
  return (

    <div className="app-shell">
      <nav className="ribbon-nav">
        <div className="ribbon-tabs">
          <button
            className={`ribbon-tab ${showMap ? "active" : ""}`}
            onClick={() => setShowMap(true)}
          >Master Map</button>
          <button
            className={`ribbon-tab ${!showMap && currentRoom === "Great-Hall" ? "active" : ""}`}
            onClick={() => navigateTo("Great-Hall")}
          >Great Hall</button>
          <button
            className={`ribbon-tab ${!showMap && currentRoom === "Library" ? "active" : ""}`}
            onClick={() => navigateTo("Library")}
          >Library</button>
        </div>
      </nav>
      <div className="app-layout">
        <div
          className={`map-panel ${isTransitioning ? 'fold-out' : 'fold-in'}`}
          onAnimationEnd={(e) => {
            if (isTransitioning && e.target === e.currentTarget) handleFoldOut()
          }}
        >
          {showMap
            ? <MasterMap students={students} onNavigate={navigateTo} />
            : roomComponents[displayedRoom] ?? null}
        </div>
      </div>
      <button
        className={`admin-tab ${isAdminOpen ? 'open' : ''}`}
        onClick={() => setIsAdminOpen(open => !open)}
      >
        {isAdminOpen ? 'Close' : 'Admin'}
      </button>
      <div className="admin-drawer-wrap">
        <div className={`admin-drawer ${isAdminOpen ? 'open' : ''}`}>
          <h2>Admin</h2>
          <p>Student management controls go here.</p>
        </div>
      </div>
    </div>
  )
}

export default App

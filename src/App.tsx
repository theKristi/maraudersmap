
import './App.css'
import { GreatHall } from './components/GreatHall/GreatHall'
import { Library } from './components/Library'
import { useState, type JSX } from 'react'
import useStudents from './hooks/useStudents'
import getLocation from './utils/getLocation'
import type { Room } from './types'
import { CharmsClassroom } from './components/Classrooms/Charms_class'
import maraudersMap from './assets/master/marauders_map.svg'
import AdminFold from './components/AdminFold/AdminFold'
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
      {!showMap && (
        <button
          type="button"
          className="home-button"
          onClick={() => setShowMap(true)}
          aria-label="Master Map"
        >
          <svg viewBox="800 372 300 336" aria-hidden="true">
            <image href={maraudersMap} width={1920} height={1080} />
          </svg>
        </button>
      )}
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
      <AdminFold open={isAdminOpen} onOpen={() => setIsAdminOpen(true)} onClose={() => setIsAdminOpen(false)}>
        <button
          type="button"
          className="admin-fold__close"
          onClick={() => setIsAdminOpen(false)}
          aria-label="Close admin panel"
        >×</button>
        <h2>Admin</h2>
        <p>Student management controls go here.</p>
      </AdminFold>
    </div>
  )
}

export default App

import { useState } from "react"
import type { Room, Student } from "../../types"
import getLocation from "../../utils/getLocation"

type MasterMapProps = {
  students: Student[]
  onNavigate: (room: Room) => void
}

function MasterMap({ students, onNavigate }: MasterMapProps) {
  const [hoveredZone, setHoveredZone] = useState<Room | null>(null)
  
  return (
    <div className="master-map">
      {zones.map(zone => {
        const here = students.filter(s => getLocation(s) === zone.room)
        return (
          <Zone
            key={zone.room}
            config={zone}
            students={here}
            isHovered={hoveredZone === zone.room}
            onHover={() => setHoveredZone(zone.room)}
            onLeave={() => setHoveredZone(null)}
            onClick={() => onNavigate(zone.room)}
          />
        )
      })}
    </div>
  )
}
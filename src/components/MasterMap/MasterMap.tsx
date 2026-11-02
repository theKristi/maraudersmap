import { useState } from "react"
import type { Room, Student, ZoneConfig } from "../../types"
import getLocation from "../../utils/getLocation"
import Zone from "./Zone"
import "./MasterMap.css"
import greatHall from "../../assets/master/great_hall_master.png"
import library from "../../assets/master/library_master.png"
import transfiguration from "../../assets/master/transfiguration_classroom_master.svg"
import charms from "../../assets/master/charms_classroom_master.svg"
import gryffindor from "../../assets/master/gryffindor_common_room_master.png"
import ravenclaw from "../../assets/master/ravenclaw_common_room_master.png"
import hufflepuff from "../../assets/master/hufflepuff_common_room_master.png"
import slytherin from "../../assets/master/slytherin_common_room_master.svg"

const zones: ZoneConfig[] = [
  { room: "Great-Hall", label: "Great Hall", asset: greatHall, gridArea: "hall" },
  { room: "Library", label: "Library", asset: library, gridArea: "library" },
  { room: "Transfiguration-Classroom", label: "Transfiguration", asset: transfiguration, gridArea: "transfig" },
  { room: "Charms-Classroom", label: "Charms", asset: charms, gridArea: "charms" },
  { room: "Gryffindor-Common-Room", label: "Gryffindor Common Room", asset: gryffindor, gridArea: "gryffindor" },
  { room: "Ravenclaw-Common-Room", label: "Ravenclaw Common Room", asset: ravenclaw, gridArea: "ravenclaw" },
  { room: "Hufflepuff-Common-Room", label: "Hufflepuff Common Room", asset: hufflepuff, gridArea: "hufflepuff" },
  { room: "Slytherin-Common-Room", label: "Slytherin Common Room", asset: slytherin, gridArea: "slytherin" },
]

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

export default MasterMap
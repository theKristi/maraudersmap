import { useState } from "react"
import type { Room, Student, ZoneConfig } from "../../types"
import getLocation from "../../utils/getLocation"
import Zone from "./Zone"
import "./MasterMap.css"
import greatHall from "../../assets/master/great_hall_master.svg"
import library from "../../assets/master/library_master.svg"
import transfiguration from "../../assets/master/transfiguration_classroom_master.svg"
import charms from "../../assets/master/charms_classroom_master.svg"
import gryffindor from "../../assets/master/gryffindor_common_room_master.svg"
import ravenclaw from "../../assets/master/ravenclaw_common_room_master.svg"
import hufflepuff from "../../assets/master/hufflepuff_common_room_master.svg"
import slytherin from "../../assets/master/slytherin_common_room_master.svg"
import logo from "../../assets/master/marauders_map.svg"

// Targets are in 1920x1080 units, taken from master_map_mock. Each asset is cropped to
// the bounds of its artwork, then fitted into its target box.
type Box = [x: number, y: number, w: number, h: number]

const area = ([x, y, w, h]: Box) => `${y + 1} / ${x + 1} / ${y + h + 1} / ${x + w + 1}`
const crop = ([x, y, w, h]: Box) => `${x} ${y} ${w} ${h}`

const logoTarget: Box = [800, 372, 300, 336]
const logoBounds = logoTarget // marauders_map.svg is already positioned as in the mock

const zone = (
  room: Room, label: string, asset: string, bounds: Box, target: Box, canvas?: [number, number],
): ZoneConfig => ({ room, label, asset, gridArea: area(target), viewBox: crop(bounds), canvas })

const zones: ZoneConfig[] = [
  zone("Great-Hall", "Great Hall", greatHall, [651, 141, 602, 741], [700, 5, 450, 360]),
  zone("Library", "Library", library, [333, 346, 1126, 533], [750, 710, 525, 355]),
  zone("Transfiguration-Classroom", "Transfiguration", transfiguration, [765, 325, 687, 612], [1310, 405, 500, 390]),
  zone("Charms-Classroom", "Charms", charms, [506, 197, 1010, 618], [1230, 15, 560, 350]),
  zone("Gryffindor-Common-Room", "Gryffindor Common Room", gryffindor, [805, 291, 236, 295], [40, 40, 265, 400]),
  zone("Ravenclaw-Common-Room", "Ravenclaw Common Room", ravenclaw, [672, 173, 495, 501], [355, 90, 330, 405]),
  zone("Hufflepuff-Common-Room", "Hufflepuff Common Room", hufflepuff, [12, 117, 577, 474], [10, 690, 350, 370], [596, 768]),
  zone("Slytherin-Common-Room", "Slytherin Common Room", slytherin, [687, 217, 512, 612], [375, 555, 265, 345]),
]

type MasterMapProps = {
  students: Student[]
  onNavigate: (room: Room) => void
}

function MasterMap({ students, onNavigate }: MasterMapProps) {
  const [hoveredZone, setHoveredZone] = useState<Room | null>(null)
  
  return (
    <div className="master-map">
      <svg className="master-map__logo" viewBox={crop(logoBounds)} style={{ gridArea: area(logoTarget) }} aria-hidden="true">
        <image href={logo} width={1920} height={1080} />
      </svg>
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
export type Position = {
  top: number
  left: number
};
export type House = "Gryffindor" | "Ravenclaw" | "Hufflepuff" | "Slytherin"

export type Student = {
  id: number
  firstName: string
  lastName: string
  house: House,
  schedule: ScheduleBlock[]
};
export type Path = {
  minX: number
  maxX: number
  minY: number
  maxY: number
};
export type StudentDotProps = {
  position: Position
  student: Student
  paths: Path[]
};
export type Room = "Great-Hall"  |
                   "Library" | 
                   "Transfiguration-Classroom" | 
                   "Charms-Classroom" | 
                   "Gryffindor-Dormitory" | 
                   "Ravenclaw-Dormitory" | 
                   "Hufflepuff-Dormitory" | 
                   "Slytherin-Dormitory" | 
                   "Gryffindor-Common-Room" | 
                   "Ravenclaw-Common-Room" | 
                   "Hufflepuff-Common-Room" | 
                   "Slytherin-Common-Room"

export type ScheduleBlock = {
    room: Room
    start: number
    end: number
}
export type ZoneConfig = {
  room: Room
  label: string
  asset: string        // import path or imported SVG
  gridArea: string     // "row-start / col-start / row-end / col-end" on the 1920x1080 grid
  viewBox: string      // region of the asset canvas to show
  canvas?: [number, number]  // asset canvas size, defaults to 1920x1080
}
export type ZoneProps = {
  config: ZoneConfig
  students: Student[]
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
  onClick: () => void
}
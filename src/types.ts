export type Position = {
  top: number
  left: number
};
export type House = "Gryffindor" | "Ravenclaw" | "Hufflepuff" | "Slytherin"

export type Student = {
  id: number
  firstName: string
  lastName: string
  house: House
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
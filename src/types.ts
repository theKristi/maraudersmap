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
export type Room = "great-hall"  | "library"//| "classrooms" | "Gryffindor-dormitory" | "Ravenclaw-dormitory" | "Hufflepuff-dormitory" | "Slytherin-dormitory" | "Gryffindor-common-room" | "Ravenclaw-common-room" | "Hufflepuff-common-room" | "Slytherin-common-room"
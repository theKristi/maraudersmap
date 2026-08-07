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
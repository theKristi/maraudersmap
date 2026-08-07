type Position = {
  top: number
  left: number
};
type Student = {
  id: number
  firstName: string
  lastName: string
  house: string
};
type Path = {
  minX: number
  maxX: number
  minY: number
  maxY: number
};
type StudentDotProps = {
  position: Position
  student: Student
  paths?: Path[]
};
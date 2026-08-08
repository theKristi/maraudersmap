import type { Student, Position, Path } from "../../types"
import charmsClassSvg from '../../assets/charms_class.svg'
import { StudentDot } from '../StudentDot'


export function CharmsClassroom({ students }: { students: Student[] }) {
    const TABLE_SEATS: Position[] = []
    const PATHS: Path[] = []
    return (
            <div
                className="room-container"
                onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1)
                    const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1)
                    console.log(`left: "${x}%", top: "${y}%"`)
                }}
            >

                <img src={charmsClassSvg} className="room-map" alt="Charms Classroom" />
               
            </div>

        )
    
}
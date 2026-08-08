import type { Student, Position, Path } from "../../types";
import transfigurationClassSvg from '../../assets/transfiguration_class.svg'
import { StudentDot } from '../StudentDot'


export function TransfigurationClassroom({ students }: { students: Student[] }) {
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

                <img src={transfigurationClassSvg} className="room-map" alt="Transfiguration Classroom" />
                {PATHS.map((path, i) => (
                    <div key={i} style={{
                        position: "absolute",
                        left: `${path.minX}%`,
                        top: `${path.minY}%`,
                        width: `${path.maxX - path.minX}%`,
                        height: `${path.maxY - path.minY}%`,
                        background: "rgba(0, 255, 0, 0.3)",
                        zIndex: 998
                    }} />
                ))}
             
            </div>

        )
    
}

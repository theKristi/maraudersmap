import type { Student, Position, Path } from "../../types";
import transfigurationClassSvg from '../../assets/transfiguration_class.svg'
import { StudentDot } from '../StudentDot'


export function TransfigurationClassroom({ students }: { students: Student[] }) {
    // Clicked in from the actual room art: a grid of paired seats across
    // 4 columns and roughly 5 rows.
    const TABLE_SEATS: Position[] = [
        { left: 37.5, top: 38.6 },
        { left: 46.1, top: 38.3 },
        { left: 62.6, top: 38.6 },
        { left: 70.9, top: 38.2 },
        { left: 38.2, top: 45.0 },
        { left: 46.1, top: 44.7 },
        { left: 62.4, top: 45.0 },
        { left: 70.3, top: 44.7 },
        { left: 37.7, top: 58.3 },
        { left: 62.7, top: 58.4 },
        { left: 70.0, top: 58.0 },
        { left: 37.8, top: 65.4 },
        { left: 46.8, top: 65.2 },
        { left: 63.1, top: 64.9 },
        { left: 70.3, top: 65.1 },
        { left: 37.0, top: 71.7 },
        { left: 45.8, top: 71.7 },
        { left: 63.4, top: 71.7 },
        { left: 69.9, top: 71.7}
    ]
    // Center aisle between the two blocks of tables, for wandering students.
    const PATHS: Path[] = [
        { minX: 51, maxX: 58, minY: 16, maxY: 74 },
    ]
    return (
            <div
                className="room-container"
                style={{ aspectRatio: "609 / 817" }}
                onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1)
                    const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1)
                    console.log(`left: "${x}%", top: "${y}%"`)
                }}
            >

                <img src={transfigurationClassSvg} className="room-map" alt="Transfiguration Classroom" />
                <div className="dots-container">
                    {students.map((s, index) => {
                        const position = TABLE_SEATS[index % TABLE_SEATS.length]
                        return <StudentDot key={s.id} student={s} position={position} paths={PATHS} />
                    })}
                </div>
            </div>

        )
    
}

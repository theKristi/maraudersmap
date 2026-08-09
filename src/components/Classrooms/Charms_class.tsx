import type { Student, Position, Path } from "../../types"
import charmsClassSvg from '../../assets/charms_class.svg'
import { StudentDot } from '../StudentDot'


export function CharmsClassroom({ students }: { students: Student[] }) {
    // Clicked in from the actual room art, tracing the stadium ring seats
    // clockwise from the top-right.
    const TABLE_SEATS: Position[] = [
        { left: 63.8, top: 23.4 },
        { left: 63.8, top: 28.9 },
        { left: 70.3, top: 34.6 },
        { left: 73.6, top: 34.5 },
        { left: 70.3, top: 43.0 },
        { left: 74.0, top: 43.2 },
        { left: 69.7, top: 54.1 },
        { left: 73.8, top: 59.1 },
        { left: 63.8, top: 72.3 },
        { left: 58.3, top: 73.9 },
        { left: 49.4, top: 73.9 },
        { left: 49.3, top: 71.7 },
        { left: 40.2, top: 71.6 },
        { left: 38.1, top: 62.9 },
        { left: 34.9, top: 54.8 },
        { left: 34.3, top: 43.5 },
        { left: 37.8, top: 43.2 },
        { left: 33.9, top: 36.5 },
        { left: 38.8, top: 35.8 },
        // filling in the top gap + lower-right side
        { left: 44.5, top: 23.3 },
        { left: 45.8, top: 28.5 },
        { left: 70.9, top: 69.6 },
        { left: 70.5, top: 25.6 },
        { left: 36.8, top: 25.4 },
    ]
    // Open central floor, for "wandering" students to roam.
    const PATHS: Path[] = [
        { minX: 42, maxX: 69, minY: 31, maxY: 69 },
    ]
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
                {TABLE_SEATS.map((seat, i) => (
                    <div key={i} style={{
                        position: "absolute",
                        left: `${seat.left}%`,
                        top: `${seat.top}%`,
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background: "red",
                        transform: "translate(-50%, -50%)",
                        zIndex: 999
                    }} />
                ))}
                <div className="dots-container">
                    {students.map((s, index) => {
                        const position = TABLE_SEATS[index % TABLE_SEATS.length]
                        return <StudentDot key={s.id} student={s} position={position} paths={PATHS} />
                    })}
                </div>
            </div>

        )

}
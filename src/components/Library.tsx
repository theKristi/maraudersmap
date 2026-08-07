import { StudentDot } from './StudentDot'
import librarySvg from '../assets/library.svg'
import type { Student, Position } from '../types'

export function Library({ students }: {students:Student[]}) {
    const TABLE_SEATS:Position[] = [
        // Table 1
        { left: 46, top: 27 },
        { left: 46, top: 31},
        // Table 2
        { left: 57.5, top: 27 },
        { left: 57.5, top: 31 },
        // Table 3
        { left: 46, top: 37.5 },
        { left: 46, top: 41.5 },
        // Table 4
        { left: 57.5, top: 37.5 },
        { left: 57.5, top: 41.5 },
        // Table 5
        { left: 46, top: 43 },
        { left: 46, top: 47 },
        // Table 6
        { left: 57.5, top: 43 },
        { left: 57.5, top: 47 },
        { left: 82.5, top: 58.2 },
        { left: 87.7, top: 58.2},
        { left: 93.2, top: 58.4 },
        { left: 82.2, top: 46.7},
        { left: 93.6, top: 47.0 },
    ]
    const PATHS = [
        { minX: 49, maxX: 55.3, minY: 4.4, maxY: 95.6 }, // center vertical aisle
        { minX: 32, maxX: 70.1, minY: 23.9, maxY: 27.3 }, // top horizontal aisle
        { minX: 70, maxX: 74.6, minY: 23.8, maxY: 74.4 }, // right vertical aisle
        { minX: 28.2, maxX: 32.7, minY: 24.0, maxY: 75.5 }, // left vertical aisle
        { minX: 36.0, maxX: 66.2, minY: 31.5, maxY: 38.7 }, // horizontal aisle between table rows 1 and 2
        { minX: 36.0, maxX: 66.2, minY: 40.4, maxY: 44.0 }, // horizontal aisle between table rows 2 and 3
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

            <img src={librarySvg} className="room-map" alt="Library" />
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
            <div className="dots-container">
                {students.map((s, index) => {
                    const position = TABLE_SEATS[index % TABLE_SEATS.length]
                    return <StudentDot key={s.id} student={s} position={position} paths={PATHS} />
                })}
            </div>
        </div>

    )
}
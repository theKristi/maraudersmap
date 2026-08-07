import greatHallSvg from '../assets/great-hall.svg'
import { StudentDot } from './StudentDot'
import type { Student, Path, House, Position } from '../types'



export function GreatHall({students}: {students: Student[]}) {
      
    const TABLE_POSITIONS: Record<House, Position> = {
        Gryffindor: { left: 39, top: 26 },
        Ravenclaw: { left: 60.4, top: 26 },
        Hufflepuff: { left: 39, top: 53 },
        Slytherin: { left: 60.4, top: 53 },
    }
    const PATHS: Path[] = [
        { minX: 48.8, maxX: 58.9, minY: 20.4, maxY: 96.5 }, // center vertical aisle
        { minX: 35.1, maxX: 74.6, minY: 43.9, maxY: 50.9 }, // middle horizontal aisle
       /* { minX: 35.1, maxX: 75.7, minY: 16.6, maxY: 23.5 }, // top horizontal aisle
        { minX: 38.3, maxX: 52.3, minY: 71.5, maxY: 74.8 }, // bottom aisle*/
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

            <img src={greatHallSvg} className="room-map" alt="Great Hall" />
            <div className="dots-container">
                {(["Gryffindor", "Ravenclaw", "Hufflepuff", "Slytherin"] as House[]).map(house =>
                    students
                        .filter(s => s.house === house)
                        .map((s, houseIndex) => {
                            const col:number = houseIndex % 2
                            const row:number = Math.floor(houseIndex / 2)
                            const finalPosition:Position = {
                                left: TABLE_POSITIONS[house].left + col * 10,
                                top: TABLE_POSITIONS[house].top + row * 1.3
                            }
                            return <StudentDot key={s.id} student={s} position={finalPosition} paths={PATHS} />
                        })
                )}
            </div>
        </div>
    )
}
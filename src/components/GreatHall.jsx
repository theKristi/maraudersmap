import greatHallSvg from '../assets/great-hall.svg'
import { StudentDot } from './StudentDot'



export function GreatHall({students}) {
      
    const TABLE_POSITIONS = {
        Gryffindor: { left: "39%", top: "26%" },
        Ravenclaw: { left: "60.4%", top: "26%" },
        Hufflepuff: { left: "39%", top: "53%" },
        Slytherin: { left: "60.4%", top: "53%" },
    }
    const PATHS = [
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
                {["Gryffindor", "Ravenclaw", "Hufflepuff", "Slytherin"].map(house =>
                    students
                        .filter(s => s.house === house)
                        .map((s, houseIndex) => {
                            const col = houseIndex % 2
                            const row = Math.floor(houseIndex / 2)
                            const finalPosition = {
                                left: `calc(${TABLE_POSITIONS[house].left} + ${col * 10}%)`,
                                top: `calc(${TABLE_POSITIONS[house].top} + ${row * 1.3}%)`
                            }
                            return <StudentDot key={s.id} student={s} position={finalPosition} paths={PATHS} />
                        })
                )}
            </div>
        </div>
    )
}
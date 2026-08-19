import type { House, Room } from "../types"

export type ScheduleBlock = {
    room: Room
    start: number
    end: number
}
export function generateSchedule(house:House):ScheduleBlock[] {
    const blocks: ScheduleBlock[]=[
        { room: `${house}-Dormitory`, start:0, end:5}, 
                { room: "Great-Hall", start:6, end:7}, 
                { room: "Library", start:15, end:16},
                { room: "Great-Hall", start:17, end:18},
                { room: `${house}-Common-Room`, start:19, end:22},
                { room: `${house}-Dormitory`, start:23, end:23}, 
    ]
  
    if(house =="Gryffindor" || house == "Slytherin")
    {
         blocks.push({ room: "Transfiguration-Classroom", start:8, end:14})
        
    }
    if(house =="Ravenclaw" || house == "Hufflepuff")
    {
        blocks.push({ room: "Charms-Classroom", start:8, end:14})

    }
    return blocks;
}
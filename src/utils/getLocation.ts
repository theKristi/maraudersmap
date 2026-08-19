import type { Room, Student } from "../types";

function getLocation(student:Student): Room{
    let room:Room= `${student.house}-Dormitory`;
    const hour=new Date().getHours();
    for( const block of student.schedule)
    {
        if(block.start <= hour && hour <= block.end)
            return block.room

    }
    return room 
 
}
export default getLocation;
function getLocation(house){
   
   /* const hour=new Date().getHours();
     if(hour >=0 && hour<6 || hour===23)
        return `${house}-dormitory`;
     if(hour >=6 && hour<=7 || hour>=17 && hour<=18)
        return "great-hall";
    if(hour >=8 && hour<=14)
        return "classrooms";
    if(hour>=15 && hour<=16)
        return "library";
    if(hour>=19 && hour<=22)
        return `${house}-common-room`;*/
     return "library"//`${house}-dormitory`;
}
export default getLocation;
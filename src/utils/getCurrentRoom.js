function getCurrentRoom() {
  const hour = new Date().getHours()
  return "library"
  if (hour < 6 || hour === 23) return "dormitory"
  if (hour >= 6 && hour <= 7) return "great-hall"
  if (hour >= 8 && hour <= 14) return "classrooms"
  if (hour >= 15 && hour <= 16) return "library"
  if (hour >= 17 && hour <= 18) return "great-hall"
  if (hour >= 19 && hour <= 22) return "common-room"
  return "dormitory"
}

export default getCurrentRoom
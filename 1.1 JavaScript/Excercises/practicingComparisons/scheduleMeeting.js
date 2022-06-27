/*
console.log(scheduleMeeting(..)should take a start time (in 24-hour format as a string “hh:mm”) 
and a meeting duration (number of minutes). 
It should return true if the meeting falls entirely within the work day 
(according to the times specified in dayStart and dayEnd); 
return false if the meeting violates the work day bounds.
*/
const dayStart = "07:30";
const dayEnd = "17:45";

function scheduleMeetingSolutionA(startTime, durationMinutes) {
  const endTime = minutesToTime(timeToMin(startTime) + durationMinutes);
  startTime = minutesToTime(timeToMin(startTime));

  return startTime >= dayStart && endTime <= dayEnd;
}

function scheduleMeetingSolutionB(startTime, durationMinutes) {
  const endTime = timeToMin(startTime) + durationMinutes;

  return (
    timeToMin(startTime) >= timeToMin(dayStart) && endTime <= timeToMin(dayEnd)
  );
}

function timeToMin(time) {
  //time = "HH:MM";
  time = time.split(":");
  let hoursToMinutes = time[0] * 60;
  let minutes = +time[1];

  //return = number;
  return hoursToMinutes + minutes;
}

function minutesToTime(minutes) {
  //time = number;
  let hours = Math.floor(minutes / 60);
  hours = hours < 10 ? "0" + hours : hours;
  let remainingMinutes = minutes % 60;
  remainingMinutes =
    remainingMinutes < 10 ? "0" + remainingMinutes : remainingMinutes;

  //return = "HH:MM";
  return hours + ":" + remainingMinutes;
}

console.log("/---------scheduleMeetingSolutionA------------/");
console.log(scheduleMeetingSolutionA("7:00", 15)); // false
console.log(scheduleMeetingSolutionA("07:15", 30)); // false
console.log(scheduleMeetingSolutionA("7:30", 30)); // true
console.log(scheduleMeetingSolutionA("11:30", 60)); // true
console.log(scheduleMeetingSolutionA("17:00", 45)); // true
console.log(scheduleMeetingSolutionA("17:30", 30)); // false
console.log(scheduleMeetingSolutionA("18:00", 15)); // false
console.log("/---------------------------------------------/");

console.log("/---------scheduleMeetingSolutionB------------/");
console.log(scheduleMeetingSolutionB("7:00", 15)); // false
console.log(scheduleMeetingSolutionB("07:15", 30)); // false
console.log(scheduleMeetingSolutionB("7:30", 30)); // true
console.log(scheduleMeetingSolutionB("11:30", 60)); // true
console.log(scheduleMeetingSolutionB("17:00", 45)); // true
console.log(scheduleMeetingSolutionB("17:30", 30)); // false
console.log(scheduleMeetingSolutionB("18:00", 15)); // false
console.log("/---------------------------------------------/");

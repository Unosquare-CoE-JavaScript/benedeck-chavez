/*
You will pass one or more values (as arguments) into toggle(..), 
and get back a function. That returned function will alternate/rotate
between all the passed-in values in order, one at a time, 
as it’s called repeatedly.
*/

function toggle(...arr) {
  var values = arr;
  var index = 0;

  return function nextOne() {
    console.log(values[index]);
    index = (index + 1) % values.length;
  };
  // ..
}

var hello = toggle("hello");
hello(); // "hello"
hello(); // "hello"

var onOff = toggle("on", "off");
onOff(); // "on"
onOff(); // "off"
onOff(); // "on"

var speed = toggle("slow", "medium", "fast");
speed(); // "slow"
speed(); // "medium"
speed(); // "fast"
speed(); // "slow"

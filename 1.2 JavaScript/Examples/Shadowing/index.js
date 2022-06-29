//Shadowing variables
"use strict";

var special = 42;
function lookingFor(special) {
  // The identifier `special` (parameter) in this
  // scope is shadowed inside keepLooking(), and
  // is thus inaccessible from that scope.
  var another = {
    special: special, //Copying Is Not Accessing
  };
  function keepLooking() {
    var special = 3.141592;
    another.special = 123;
    console.log("keepLooking scope special value:", special);
    console.log("keepLooking scope another.special value:", another.special);
  }
  keepLooking();

  console.log("lookingFor scope another.special value:", another.special);
  console.log("lookingFor scope special value:", special);
}
lookingFor(112358132134);

console.log("Global scope special value:", special);
// 3.141592
// 42

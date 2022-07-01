function makeCounter() {
  var count = 0;
  return function getCurrent() {
    count = count + 1;
    return count;
  };
}
var hits = makeCounter(); // later
console.log("hits", hits()); // 1
// later
console.log("hits", hits()); // 2
console.log("hits", hits()); // 3

var studentName = "Frank";
var greeting = function hello() {
  // we are closing over `studentName`, // not "Frank"
  console.log(`Hello, ${studentName}!`);
};
// later
studentName = "Suzy";
// later
greeting();
// Hello, Suzy!

var keeps = [];
for (var i = 0; i < 3; i++) {
  keeps[i] = function keepI() {
    // closure over `i`
    console.log("keeps i = ", i);
  };
}
keeps[0]();
keeps[1]();
keeps[2]();
// 3 -- WHY!?
// 3 -- Because we are using var
// 3 -- the error don't occur with let

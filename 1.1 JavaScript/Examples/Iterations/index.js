//Iterations
"use strict";

var arr = [10, 20, 30];

for (let val of arr) {
  console.log(`Array value: ${val}`);
}
// Array value: 10
// Array value: 20
// Array value: 30

//Since arrays are iterables,
//we can shallow-copy an array using iterator
//consumption via the ... spread operator
var arrCopy = [...arr];
for (let val of arrCopy) {
  console.log(`arrCopy value: ${val}`);
}
// Array value: 10
// Array value: 20
// Array value: 30

//We can also iterate the characters in a string one at a time:
var greeting = "Hello world!";
var chars = [...greeting];

let result = "";
for (let [idx, val] of chars.entries()) {
  result += idx == 0 ? "[" : ",";
  result += val;
}
result += "]";
console.log(result);
// [ "H", "e", "l", "l", "o", " ",
//   "w", "o", "r", "l", "d", "!" ]

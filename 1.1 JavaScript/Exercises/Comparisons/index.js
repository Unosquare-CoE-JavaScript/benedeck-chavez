//Comparisons
"use strict";

//triple-equals ===
console.log("3 === 3.0", 3 === 3.0); // true
console.log('"yes" === "yes"', "yes" === "yes"); // true
console.log("null === null", null === null); // true
console.log("false === false", false === false); // true
console.log('42 === "42"', 42 === "42"); // false
console.log('"hello" === "Hello"', "hello" === "Hello"); // false
console.log("true === 1", true === 1); // false
console.log("0 === null", 0 === null); // false
console.log('"" === null', "" === null); // false
console.log("null === undefined", null === undefined); // false
console.log("NaN === NaN", NaN === NaN); // false
console.log("0 === -0", 0 === -0); // true

//Comparisons of object values (non-primitives)

var x = [1, 2, 3];
// assignment is by reference-copy, so
// y references the *same* array as x,
// not another copy of it.

var y = x;
console.log("y === x", y === x); // true
console.log("y === [1, 2, 3]", y === [1, 2, 3]); // false
console.log("x === [1, 2, 3]", x === [1, 2, 3]); // false

// Operators <,> ( and even <= and >=) allow coercion
var arr = ["1", "10", "100", "1000"];
for (let i = 0; i < arr.length && arr[i] < 500; i++) {
  console.log("Run times:", i + 1);
  // will run 3 times
}

//Precaution with string to string comparisons they use alphabetical (dictionary-like) comparison
var x = "10";
var y = "9";
console.log('x ="10" < y = "9"', x < y); // true, watch out!

//Functions
"use strict";

//function declaration
function greeting(myName) {
  console.log(`Hello,${myName}!`);
}
greeting("Kyle"); // Hello, Kyle!

function greeting2(myName) {
  return `Returned Hello,${myName}!`;
}

var msg = greeting2("Kyle");
console.log(msg); //Returned Hello, Kyle!

//Function expression
var whatToSay = {
  greeting() {
    console.log("Object Hello!");
  },
  question() {
    console.log("What's your name?");
  },
  answer() {
    console.log("My name is Kyle.");
  },
};
whatToSay.greeting(); //Object Hello!

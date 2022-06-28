//Closure
"use strict";

//Simple example
function greeting(msg) {
  return function who(name) {
    console.log(`${msg},${name}!`);
  };
}
var hello = greeting("Hello");
var howdy = greeting("Howdy");
hello("Kyle"); // Hello, Kyle!
hello("Sarah"); // Hello, Sarah!
howdy("Grant"); // Howdy, Grant!

//Update de values
function counter(step = 1) {
  var count = 0;
  return function increaseCount() {
    count = count + step;
    return count;
  };
}
var incBy1 = counter(1);
var incBy3 = counter(3);
console.log(`incBy1() = ${incBy1()}`); // 1
console.log(`incBy1() = ${incBy1()}`); // 2
console.log(`incBy3() = ${incBy3()}`); // 3
console.log(`incBy3() = ${incBy3()}`); // 6
console.log(`incBy3() = ${incBy3()}`); // 9

//outer scope not a function
var arrObjects = [
  {
    name: "Ernesto",
    lastName: "Chavez",
  },
  {
    name: "Luis",
    lastName: "Chavez",
  },
];

for (let [idx, person] of arrObjects.entries()) {
  person["getIdxAndFullName"] = function () {
    console.log(idx, person.name, person.lastName);
  };
}

arrObjects[0].getIdxAndFullName();
arrObjects[1].getIdxAndFullName();

//Async
//Mock ajax function
function ajax(url, callback) {
  console.log(`getting data from ${url}...`);
  setTimeout(() => {
    callback("data");
  }, 1000);
}

function getSomeData(url) {
  ajax(url, function onResponse(resp) {
    console.log(`Response (from ${url}):${resp}`);
  });
}
getSomeData("https://some.url/wherever"); // Response (from https://some.url/wherever): ...

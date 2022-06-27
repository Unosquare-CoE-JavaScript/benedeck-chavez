//Values asignation to variables
//var, let and const
"use strict";
try {
  var adult = true;

  if (adult) {
    var _name = "Kyle";
    let _age = 39;
    console.log("Shhh, this is a secret!");
  }

  console.log("_name = ", _name); // Kyle
  console.log("_age = ", _age); // Error! _age was block-scoped to the if
} catch (err) {
  console.log(err);
}

try {
  const myBirthday = true;
  let age = 39;

  if (myBirthday) {
    age = age + 1; // OK!
    console.log("age = ", age);
    myBirthday = false; // Error!
  }
} catch (err) {
  console.log(err);
}

function hello(name) {
  console.log(`Hello,${name}.`);
}

hello("Kyle"); // Hello, Kyle.

try {
  hello2();
} catch (err) {
  console.log(err);
}

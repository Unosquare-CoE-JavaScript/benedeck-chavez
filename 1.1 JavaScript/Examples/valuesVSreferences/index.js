//value vs references

//Simple example of value
var myName = "Kyle";
var yourName = myName;

myName = "Frank";

console.log(myName); // Frank
console.log(yourName); // Kyle

//Simple example of references
var myAddress = {
  street: "123 JS Blvd",
  city: "Austin",
  state: "TX",
};
var yourAddress = myAddress; // I've got to move to a new house!
myAddress.street = "456 TS Ave";

console.log(yourAddress.street); // 456 TS Ave

//this keyword

//Simple example
function classroom(teacher) {
  return function study() {
    console.log(`${teacher} says to study %c ${this.topic}`, "color:red");
  };
}
var assignment = classroom("Kyle");
assignment(); //Kyle says to study undefined

var homework = { topic: "JS", assignment };
homework.assignment(); // Kyle says to study JS

var otherHomework = { topic: "Math" };
assignment.call(otherHomework); // Kyle says to study Math

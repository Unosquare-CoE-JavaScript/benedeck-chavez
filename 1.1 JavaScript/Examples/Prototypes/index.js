//Prototypes

//Simple example
var homework = { topic: "JS" };
var otherHomework = Object.create(homework);
console.log("otherHomework.topic = ", otherHomework.topic); // "JS"

console.log("homework.topic = ", homework.topic); // "JS"
console.log("otherHomework.topic = ", otherHomework.topic); // "JS"

otherHomework.topic = "Math";
console.log("otherHomework.topic = ", otherHomework.topic); // "Math"
console.log("homework.topic = ", homework.topic); // "JS" -- not "Math"

//Prototype + this keyword
var homework = {
  study() {
    console.log(`Please study ${this.topic}`);
  },
};

var jsHomework = Object.create(homework);
jsHomework.topic = "JS";
jsHomework.study(); // Please study JS

var mathHomework = Object.create(homework);
mathHomework.topic = "Math";
mathHomework.study(); // Please study Math

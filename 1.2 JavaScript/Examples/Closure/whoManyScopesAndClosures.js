// outer/global scope: RED(1)
function lookupStudent(studentID) {
  // function scope: BLUE(2)
  var students = [
    { id: 14, name: "Kyle" },
    { id: 73, name: "Suzy" },
    { id: 112, name: "Frank" },
    { id: 6, name: "Sarah" },
  ];
  return function greetStudent(greeting) {
    // function scope: GREEN(3)
    var student = students.find(
      (
        student // function scope: ORANGE(4)
      ) => student.id == studentID
    );
    return `${greeting}, ${student.name}!`;
  };
}
var chosenStudents = [lookupStudent(6), lookupStudent(112)];

// accessing the function's name:
console.log(chosenStudents[0].name);
// greetStudent
console.log(chosenStudents[0]("Hello"));
// Hello, Sarah!
console.log(chosenStudents[1]("Howdy"));
// Howdy, Frank!

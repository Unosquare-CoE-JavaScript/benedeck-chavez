//global scope - 1

//function sortNamesByLength identifier - 1 , parameter names identifier - 2
function sortNamesByLength(names) {
  //function scope - 2

  var buckets = []; //buckets identifier - 3

  for (let firstName of names) {
    //firstName identifier - 4
    //for scope - 3
    if (buckets[firstName.length] == null) {
      buckets[firstName.length] = [];
    }
    buckets[firstName.length].push(firstName);
  }
  // a block to narrow the scope
  {
    //block scope - 4
    let sortedNames = []; //sortedNames identifier - 5
    for (let bucket of buckets) {
      //bucket identifier - 6
      //for scope - 5
      if (bucket) {
        // sort each bucket alphanumerically
        bucket.sort();
        // append the sorted names to our
        // running list
        sortedNames = [...sortedNames, ...bucket];
      }
    }
    return sortedNames;
  }
}

console.log(
  sortNamesByLength(["Sally", "Suzy", "Frank", "John", "Jennifer", "Scott"])
);
// [ "John", "Suzy", "Frank", "Sally", "Scott", "Jennifer" ]

//main hazards
// Naming Collisions

// outer/global scope
function hideTheCache() {
  // "middle scope", where we hide `cache`
  var cache = {};

  return factorial;
  // **********************
  function factorial(x) {
    // inner scope
    if (x < 2) return 1;
    if (!(x in cache)) {
      cache[x] = x * factorial(x - 1);
    }

    console.log(cache);

    return cache[x];
  }
}
var factorial = hideTheCache(); // <-- weird name

console.log(factorial(6));
// 720

cache = {};

console.log(factorial(7));
// 5040

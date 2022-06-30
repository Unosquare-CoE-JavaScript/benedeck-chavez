//main hazards
// Naming Collisions
// Unexpected Behavior
// Unintended Dependency

var cache = {};
function factorial(x) {
  if (x < 2) return 1;
  if (!(x in cache)) {
    cache[x] = x * factorial(x - 1);
  }
  return cache[x];
}
factorial(6);
// 720
console.log(cache);

// {
// "2": 2,
// "3": 6,
// "4": 24,
// "5": 120,
//     "6": 720
// }
factorial(7);
// 5040

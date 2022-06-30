//main hazards
// Naming Collisions

// outer/global scope
function hideTheCache() {
  // "middle scope", where we hide `cache` var cache = {};
  return factorial;
  // **********************
  function factorial(x) {
    // inner scope
    if (x < 2) return 1;
    if (!(x in cache)) {
      cache[x] = x * factorial(x - 1);
    }
    return cache[x];
  }
}
var factorial = hideTheCache();
factorial(6);
// 720
factorial(7);
// 5040

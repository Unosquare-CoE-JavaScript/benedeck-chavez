// outer/global scope

var factorial = (function hideTheCache() {
  // "middle scope", where we hide `cache`
  var cache = {};
  function factorial(x) {
    if (x < 2) return 1;
    if (!(x in cache)) {
      cache[x] = x * factorial(x - 1);
    }
    console.log(cache);

    return cache[x];
  }

  return factorial;
})();

console.log(factorial(6));
// 720

cache = {};

console.log(factorial(7));
// 5040

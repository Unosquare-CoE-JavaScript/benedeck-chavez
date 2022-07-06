/*
 The first part of this exercise is to use closure to implement a cache to remember the results of isPrime(..),
 so that the primality (true or false) of a given number is only ever computed once. 

 The second part of the exercise is to use the same closure cache technique for factorize(..).

 Use separate closures for caching of isPrime(..) and factorize(..), rather than putting them inside a single scope.
*/

var isPrime = (function hideTheCache() {
  // "middle scope", where we hide `cache`
  var cache = {};
  function isPrime(v) {
    if (!(v in cache)) {
      if (v <= 3) {
        cache[v] = v > 1;
        return cache[v];
      }
      if (v % 2 == 0 || v % 3 == 0) {
        cache[v] = false;
        return cache[v];
      }
      var vSqrt = Math.sqrt(v);
      for (let i = 5; i <= vSqrt; i += 6) {
        if (v % i == 0 || v % (i + 2) == 0) {
          cache[v] = false;
          return cache[v];
        }
      }
      cache[v] = true;
      return cache[v];
    }

    return cache[v];
  }

  return isPrime;
})();

var factorize = (function hideTheCache() {
  // "middle scope", where we hide `cache`
  var cache = {};
  function factorize(v) {
    if (!(v in cache)) {
      if (!isPrime(v)) {
        let i = Math.floor(Math.sqrt(v));
        while (v % i != 0) {
          i--;
        }
        cache[v] = [...factorize(i), ...factorize(v / i)];
        return cache[v];
      }

      cache[v] = [v];
      return cache[v];
    }
    return cache[v];
  }

  return factorize;
})();

console.log(isPrime(12)); // false
console.log(isPrime(11)); // true

console.log(factorize(11)); // [ 11 ]
console.log(factorize(12)); // [ 3, 2, 2 ] --> 3*2*2=12

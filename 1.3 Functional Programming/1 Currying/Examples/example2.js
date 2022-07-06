//Curry example
const curry = (f) => (x) => (y) => f(x, y);

const modulo = curry((x, y) => y % x);

const isOdd = modulo(2); // (2, y) => 2 % y

const result = isOdd(3);

console.log(result); // 1

const filter = curry((f, xs) => xs.filter(f));

const getOdds = filter(isOdd);
const result2 = getOdds([1, 2, 3, 4, 5]);

console.log(result2); // [ 1, 3, 5 ]

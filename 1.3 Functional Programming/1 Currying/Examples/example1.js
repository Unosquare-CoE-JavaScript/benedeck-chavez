const add = (x, y) => x + y;

//Curry example
const curry = (f) => (x) => (y) => f(x, y);

const curriedAdd = curry(add);

const increment = curriedAdd(1);

const result = increment(4);

console.log(result); // 5

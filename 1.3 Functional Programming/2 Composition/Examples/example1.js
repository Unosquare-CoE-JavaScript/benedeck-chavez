const add = (x, y) => x + y;

const toUpper = (str) => str.toUpperCase();

const exclaim = (str) => str + "!";

const first = (xs) => xs[0];

//Important
const compose = (f, g) => (x) => f(g(x));
const pipe = (f, g) => (x) => g(f(x));

const loudFirst = compose(toUpper, first);
const shout = compose(exclaim, loudFirst);

console.log(shout("tears")); // T!

//Important
// const compose = (f, g) => (x) => f(g(x));
// const pipe = (f, g) => (x) => g(f(x));
const { curry, compose } = require("ramda");

const add = curry((x, y) => x + y);
const concat = curry((y, x) => x + y);

const toUpper = (str) => str.toUpperCase();

const first = (xs) => xs[0];

const log = curry((tag, x) => (console.log(tag, x), x));

const loudFirst = compose(log("toUpper"), toUpper, log("first"), first);
const shout = compose(log("concat"), concat("!"), loudFirst);

console.log(shout("tears")); // T!

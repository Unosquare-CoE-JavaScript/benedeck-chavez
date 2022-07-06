// Setup
//==============
const _ = require("ramda");

// Exercise 1
//==============
const split = _.curry((delimiter, string) => string.split(delimiter));

const words = split(" ");

// Exercise 1a
//==============
//use map to make a new words fn that not only works on 1 string, but on an array of strings.

const sentences = _.map(words);

// Exercise 2
//==============

//const filterQs = _.filter(_.test(/q/gi));

const filter = _.curry((fx, string) => _.filter(fx, string));

const filterQs = filter(function (x) {
  return _.test(/q/gi, x);
});

// Exercise 3
//==============
// Use the helper function _keepHighest to refactor max

const _keepHighest = (x, y) => (x >= y ? x : y); // <- leave be

// TODO: rewrite max in its "simplest" form
// const max = _.reduce(_keepHighest, 0);
const reduce = _.curry((f, initV, xs) =>
  _.reduce(
    function (acc, x) {
      return f(acc, x);
    },
    initV,
    xs
  )
);

const max = reduce(_keepHighest, 0);

// Bonus 1:
// ============
// wrap array's built in slice to be functional and curried like ramda fn's.
// //[1,2,3].slice(0, 2)

const slice = _.curry((init, end, array) => array.slice(init, end));

// Bonus 2:
// ============
// use slice to define a function take() that takes n elements from an array. make it curried
// const take = slice(0);
const take = _.curry((end, array) => array.slice(0, end));

Object.assign(module.exports, {
  words,
  sentences,
  filterQs,
  max,
  slice,
  take,
});

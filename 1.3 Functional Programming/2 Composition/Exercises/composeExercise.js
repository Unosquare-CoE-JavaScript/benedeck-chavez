// Setup
//==============
const _ = require("ramda");
const { formatMoney } = require("accounting");

// Exercise 1:
// ============
// use _.compose() to rewrite the function below. Hint: _.prop() is curried.
/*
const isLastInStock = (cars) => {
  var reversed_cars = _.last(cars);
  return _.prop("in_stock", reversed_cars);
};
*/

const isLastInStock = _.compose(_.prop("in_stock"), _.last);

// Exercise 2:
// ============
// use _.compose(), _.prop() and _.head() to retrieve the name of the first car

const nameOfFirstCar = _.compose(_.prop("name"), _.head);

// Exercise 3:
// ============
// Use the helper function _average to refactor averageDollarValue as a composition

const _average = function (xs) {
  return _.reduce(_.add, 0, xs) / xs.length;
}; // <- leave be
/*
const averageDollarValue_ = function (cars) {
  const dollar_values = _.map(_.prop("dollar_value"), cars);
  return _average(dollar_values);
};

var averageDollarValue = function (cars) {
  var dollar_values = _.map(function (c) {
    return c.dollar_value;
  }, cars);
  return _average(dollar_values);
};
*/

const averageDollarValue = _.compose(_average, _.map(_.prop("dollar_value")));

// Exercise 4:
// ============
// Write a function: sanitizeNames() using compose that returns a list of lowercase and underscored names: e.g: sanitizeNames(["Hello World"]) //=> ["hello_world"].

const _underscore = _.replace(/\W+/g, "_"); //<-- leave this alone and use to sanitize
const _toLowerCase = (str) => str.toLowerCase();

const sanitizeNames = _.compose(
  _.map(_toLowerCase),
  _.map(_underscore),
  _.map(_.prop("name"))
);
/* course solution 
_.map = _.curry((f ,x) => x.map(f));
compose(map(f), map(g)) == map(compose(f, g))
const sanitizeNames = _.map(_.compose(_.toLower, _underscore, _.prop("name")));
*/

// Bonus 1:
// ============
// Refactor availablePrices with compose.

/*
const availablePrices = function (cars) {
  const available_cars = _.filter(_.prop("in_stock"), cars);
  return available_cars.map((x) => formatMoney(x.dollar_value)).join(", ");
};
*/

const availablePrices = _.compose(
  _.join(", "),
  _.map(formatMoney),
  _.map(_.prop("dollar_value")),
  _.filter(_.prop("in_stock"))
);
/* course solution 
const formatDollarValue = _.compose(formatMoney, _.prop('dollar_value'))
const availablePricesArray = _.compose(_.map(formatDollarValue), _.filter(_.prop("in_stock")))
const availablePrices = _.compose( _.join(", "), availablePricesArray)
*/

// Bonus 2:
// ============
// Refactor to pointfree.
/*
const fastestCar = function (cars) {
  const sorted = _.sortBy((car) => car.horsepower, cars);
  const fastest = _.last(sorted);
  return fastest.name + " is the fastest";
};*/

const concat = _.curry((y, x) => x + y);
const fastestCar = _.compose(
  concat(" is the fastest"),
  _.prop("name"),
  _.last,
  _.sortBy(_.prop("horsepower"))
);

/* course solution 
const append = _.flip(_.concat);
const fastestCar = _.compose(
  append(" is the fastest"),
  _.prop("name"),
  _.last,
  _.sortBy(_.prop("horsepower"))
);
*/

Object.assign(module.exports, {
  isLastInStock,
  nameOfFirstCar,
  averageDollarValue,
  sanitizeNames,
  availablePrices,
  fastestCar,
});

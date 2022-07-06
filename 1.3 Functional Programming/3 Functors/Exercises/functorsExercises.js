const Box = (x) => ({
  map: (f) => Box(f(x)),
  fold: (f) => f(x),
  toString: () => `Box(${x})`,
});

// Exercise: Box
// Goal: Refactor each example using Box
// Keep these tests passing!
// Bonus points: no curly braces

// Ex1: Using Box, refactor moneyToFloat to be unnested.
// =========================
/*const moneyToFloat = str =>
  parseFloat(str.replace(/\$/, ''))*/

const moneyToFloat = (str) =>
  Box(str)
    .map((str) => str.replace(/\$/, ""))
    .map((str) => parseFloat(str))
    .fold((str) => str);

/*
Course solution    
const moneyToFloat = (str) =>
  Box(str)
    .map((str) => str.replace(/\$/, ""))
    .fold((str) => parseFloat(str))
*/

// Ex2: Using Box, refactor percentToFloat to remove assignment
// =========================
/*const percentToFloat = str => {
  const float = parseFloat(str.replace(/\%/, ''))
  return float * 0.0100
}*/

const percentToFloat = (str) =>
  Box(str)
    .map((str) => str.replace(/\%/, ""))
    .map((str) => parseFloat(str))
    .map((float) => float * 0.01)
    .fold((float) => float);
/*
Course solution    
const percentToFloat = (str) =>
  Box(str)
    .map((s) => s.replace(/\%/, ""))
    .map((s) => parseFloat(s))
    .fold((f) => f * 0.01)
*/

// Ex3: Using Box, refactor applyDiscount (hint: each variable introduces a new Box)
// =========================
/*const applyDiscount = (price, discount) => {
  const cents = moneyToFloat(price)
  const savings = percentToFloat(discount)
  return cents - (cents * savings)
}*/

const applyDiscount = (price, discount) =>
  Box(price)
    .map((price) => moneyToFloat(price))
    .map((cents) =>
      Box(discount)
        .map((discount) => percentToFloat(discount))
        .map((savings) => cents - cents * savings)
        .fold((discount) => discount)
    )
    .fold((result) => result);

/*
Course solution A   
const applyDiscount = (price, discount) =>
  Box(price)
    .map(p => Box(moneyToFloat(p))
        .map((cents) => cents - cents * percentToFloat(discount))
        .fold((discount) => discount)
    )
    .fold((result) => result);

Course solution B   
const applyDiscount = (price, discount) =>
  Box(moneyToFloat(price))
    .fold(cents => Box(percentToFloat(discount))
        .fold((savings) => cents - cents * savings)
    )
*/

/*
Another solution 
const applyDiscount = (price, discount) =>
  Box(price).fold((p) =>
    Box(moneyToFloat(p)).fold(
      (cents) => cents - cents * percentToFloat(discount)
    )
  );
*/

Object.assign(module.exports, {
  moneyToFloat,
  percentToFloat,
  applyDiscount,
});

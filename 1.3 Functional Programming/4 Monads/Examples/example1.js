// Definitions
// ====================
const Right = (x) => ({
  chain: (f) => f(x),
  map: (f) => Right(f(x)),
  fold: (f, g) => g(x),
  toString: `Right(${x})`,
});

const Left = (x) => ({
  chain: (f) => Left(x),
  map: (f) => Left(x),
  fold: (f, g) => f(x),
  toString: `Left(${x})`,
});

const fromNullable = (x) => (x == null ? Left(null) : Right(x));

const findColor_ = (name) => {
  const found = { red: "#ff4444", blue: "#3b5998", yellow: "#fff68f" }[name];
  return found ? Right(found) : Left("missing");
};

const findColor = (name) =>
  fromNullable({ red: "#ff4444", blue: "#3b5998", yellow: "#fff68f" }[name]);

const res = () =>
  findColor("red")
    .map((x) => x.toUpperCase())
    .map((x) => x.slice(1))
    .fold(
      (message) => message,
      (color) => color
    );

const _res = (num) =>
  fromNullable(num)
    .map((num) => num + 1)
    .fold(
      () => "err null", //<- Left function
      (add1) => add1 //<- Right function
    );

console.log(_res(null)); //"err null"
console.log(_res(1)); //2

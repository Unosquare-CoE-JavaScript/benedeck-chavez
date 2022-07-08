const Box = (x) => ({
  map: (f) => Box(f(x)),
  fold: (f) => f(x),
  inspect: `Box(${x})`,
});

let result = () =>
  ["a"].map((x) => x.toUpperCase()).map((x) => String.fromCharCode(x));

console.log(result());

result = () =>
  Box("a")
    .map((x) => x.toUpperCase())
    .map((x) => String.fromCharCode(x))
    .map((x) => x);

console.log(result());

const nextCharForNumberString_ = (str) => {
  const trimmed = str.trim();
  const number = parseInt(trimmed);
  const nextNumber = new Number(number + 1);
  return String.fromCharCode(nextNumber);
};

result = nextCharForNumberString_(" 64    ");

console.log(result);

const nextCharForNumberString = (str) =>
  Box(str)
    .map((x) => x.trim())
    .map((trimmed) => parseInt(trimmed, 10))
    .map((number) => new Number(number + 1))
    .fold(String.fromCharCode);

result = nextCharForNumberString(" 64    ");

console.log(result);

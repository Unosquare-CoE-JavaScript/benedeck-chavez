#

In order to run some exercises is necessary to run npm i
so you have the necessary dependencies

#

# Functional Programing

I will describe Functional Programing, like the art of make everything with functions and expressions.

Functional programming leads to a more transparent, cleaner code that helps the user in debugging and maintenance, and is fast becoming the go-to method for developers.

# Advantage of FP

- Functional programming are easier to debug.
  Pure functions always produce the same input -> output and have no external values affecting the end result.

- Functional programming is fully transparent
  The fact that an expression, in a program, may be replaced by its value (or anything having the same value) without changing the result of the program.

- Enhanced readability of values
  That is, the advantage of using pure values does not end at the changing of states. The value also ensures that the program is more readable.

- Validating Functional Signatures
  The pure variables of functional programming language make sure that the signature gives all the information about how the function works, including details on their arguments and other information.

#### The pure functions need to be

- Total

  For every input must be an output

```
const inc = i => {
return i + 1
}
```

- Deterministic

  Always receive the same output for a given input

```
const add = (x, y) => x + y;
```

- No Observable Side-Effects

No observable effects besides computing a value

#### Why we need pure functions?

- Reliable (they always return the same output for inputs)
- Portable (they're not, stuck in their environment)
- Reusable (they're not basically again, buried in their environment.)
- Testable (they always return the same output for inputs)
- Composable
- Properties/Contract

## 1. [Currying](./1%20Currying/)

Allows to take a function needs 2+ arguments and take one at a time (thanks closure!)

```
const add = (x, y) => x + y;

//What does curry
const curry = (f) => (x) => (y) => f(x, y);

const curriedAdd = curry(add);

const increment = curriedAdd(1);

const result = increment(4);

console.log(result); // 5
```

- [Examples](./1%20Currying/Examples/)
- [Exercises](./1%20Currying/Exercises/)

## 2. [Composition](./2%20Composition/)

Here we take 2+ functions a return 1, and that new unique function will do what the other 2+ functions do, running one and then next one until we run out of functions

```
const add = (x, y) => x + y;

const toUpper = (str) => str.toUpperCase();

const exclaim = (str) => str + "!";

const first = (xs) => xs[0];

//Important for this example we can only compose 2 functions at a time
const compose = (f, g) => (x) => f(g(x));

const loudFirst = compose(toUpper, first);
const shout = compose(exclaim, loudFirst);

console.log(shout("tears")); // T!

```

- [Examples](./2%20Composition/Examples/)
- [Exercises](./2%20Composition/Exercises/)

## 3. [Functors](./3%20Functors/)

Functor is a container that holds an object that is mapped over.
A functor is useful in functional programming because it abstracts function application.

```
const Box = (x) => ({
  map: (f) => Box(f(x)),
  fold: (f) => f(x),
  inspect: `Box(${x})`,
});

//The value is passing
let result = () =>
  ["a"]
  .map((x) => x.toUpperCase()) // ["A"] <- keeping in the array, so we can still mapping
  .map((x) => String.fromCharCode(x)); ["\x00"]

console.log(result());

result = () =>
  Box("a")
    .map((x) => x.toUpperCase()) //Box("A")<- keeping in the box, so we can still mapping
    .map((x) => String.fromCharCode(x))//Box("\x00")
    .map((x) => x);

console.log(result());
```

- [Examples](./3%20Functors/Examples/)
- [Exercises](./3%20Functors/Exercises/)

## 4. [Either Monads](./4%20Monads/)

Either is a functor and a monad, it has both a map, a chain method, and a fold method.
The Either type respects function purity and is effectively an if else statement, but inverted.

```
const Right = (x) => ({
  chain: (f) => f(x),
  map: (f) => Right(f(x)), // <- keeping in the box, run the function!
  fold: (f, g) => g(x),// <- run Right function ;)
  toString: `Right(${x})`,
});

const Left = (x) => ({
  chain: (f) => Left(x),
  map: (f) => Left(x),// <- keeping in the box, NOT run the function! only pass the argument
  fold: (f, g) => f(x),// <- run Left function ;)
  toString: `Left(${x})`,
});

const fromNullable = (x) => (x == null ? Left(null) : Right(x));

const _res = (num) =>
  fromNullable(num)
    .map((num) => num + 1)
    .fold(
      () => "err null",//  <- Left function
      (add1) => add1// <- Right function
    );

console.log(_res(null)); //"err null"
console.log(_res(1)); //2
```

- [Examples](./4%20Monads/Examples/)
- [Exercises](./4%20Monads/Exercises/)

## 5. [Tasks](./5%20Tasks/)

Task monad is the functional equivalent of promise.
Similarly to promise, Task takes resolve and reject functions, but in reversed order.
The reversed order is so you don't skip the definition of the rejected function
A Task monad only starts running once it reaches the fork method, and this way avoids race conditions.

```
const t1 = Task((rej, res) => res(2)) //<--  actively ignore rej callback.
  .map((two) => two + 1)
  .map((three) => three * 2);

const t2 = Task((rej, res) => res(2)) //<--  actively ignore rej callback.
  .chain((two) => Task.of(two + 1))
  .map((three) => three * 2);

t1.fork(console.error, console.log);
t2.fork(console.error, console.log);

```

- [Examples](./5%20Tasks/Examples/)
- [Exercises](./5%20Tasks/Exercises/)

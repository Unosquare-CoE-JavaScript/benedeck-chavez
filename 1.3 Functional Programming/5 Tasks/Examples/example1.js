const { Task } = require("../types");
const { compose } = require("ramda");

const Box = (f) => ({
  map: (g) => Box(compose(f, g)),
  fold: f,
});

console.log(
  Box(() => 2)
    .map((two) => two + 1)
    .fold()
);

const t1 = Task((rej, res) => res(2))
  .map((two) => two + 1)
  .map((three) => three * 2);

const t2 = Task((rej, res) => res(2))
  .chain((two) => Task.of(two + 1))
  .map((three) => three * 2);

t1.fork(console.error, console.log);
t2.fork(console.error, console.log);

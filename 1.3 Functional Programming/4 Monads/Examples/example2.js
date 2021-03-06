const Right = (x) => ({
  map: (f) => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`,
});

const Left = (x) => ({
  map: (f) => Left(x),
  fold: (f, g) => f(x),
  inspect: () => `Left(${x})`,
});

const tryCatch = (f) => {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
};

//=====================================

const fs = require("fs");
/*
const getPort_ = () => {
  try {
    const str = fs.readFileSync(__dirname + "/config.json");
    const config = JSON.parse(str);
    return config.port;
  } catch (e) {
    return e;
  }
};*/

const readFileSync = (path) =>
  tryCatch(() => fs.readFileSync(__dirname + path));

const getPort = () =>
  readFileSync("/config.json")
    .map((contents) => JSON.parse(contents))
    .map((config) => config.port)
    .fold(
      () => 8080,
      (x) => x
    );

const result = getPort();

console.log(result);

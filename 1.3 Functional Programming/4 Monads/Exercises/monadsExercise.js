// Definitions
// ====================
const Right = (x) => ({
  chain: (f) => f(x),
  map: (f) => Right(f(x)),
  fold: (f, g) => g(x),
  toString: () => `Right(${x})`,
});

const Left = (x) => ({
  chain: (f) => Left(x),
  map: (f) => Left(x),
  fold: (f, g) => f(x),
  toString: () => `Left(${x})`,
});

const fromNullable = (x) => (x != null ? Right(x) : Left(null));

const tryCatch = (f) => {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
};

const logIt = (x) => {
  console.log(x);
  return x;
};

const DB_REGEX = /postgres:\/\/([^:]+):([^@]+)@.*?\/(.+)$/i;
// Exercise: Either
// Goal: Refactor each example using Either
// Bonus: no curlies
// =========================

// Ex1: Refactor streetName to use Either instead of nested if's
// =========================
/*const street = user => {
 const address =  fromNullable({ red: "#ff4444", blue: "#3b5998", yellow: "#fff68f" }[name]);

 if(address) {
   return address.street
 } else {
   return 'no street'  
 }
}*/
const street = (user) =>
  fromNullable(user.address).fold(
    () => "no street",
    (address) => address.street
  );

/* 
Course Solution
const street = (user) =>
  fromNullable(user.address)
  .map(address => address.street)
  .fold(
    () => "no street",
    (x) => x
  );
*/

// Ex2: Refactor streetName to use Either instead of nested if's
// =========================
/*const streetName = user => {
 const address = user.address

 if(address) {
   const street = address.street

   if(street) {
     return street.name
   }
 }

 return 'no street'
}*/

const streetName = (user) =>
  fromNullable(street(user)).fold(
    () => "no street",
    (street) =>
      fromNullable(street.name).fold(
        () => "no street",
        (name) => name
      )
  );

/* 
Course Solution
const streetName = (user) =>
  fromNullable(user)
  .chain(user => fromNullable(user.address))
  .chain(address => fromNullable(address.street))
  .map(street => street.name)
  .fold(
        () => "no street",
        (x) => x
      )
  );
*/

// Ex3: Refactor parseDbUrl to return an Either instead of try/catch
// =========================
/*
const parseDbUrl = cfg => {
 try {
   const c = JSON.parse(cfg) // throws if it can't parse
   return c.url.match(DB_REGEX)
 } catch(e) {
    return null
 }
}*/

const parseJSON = (contents) => tryCatch(() => JSON.parse(contents));
const match = (contents) => tryCatch(() => contents.match(DB_REGEX));

const parseDbUrl = (cfg) =>
  parseJSON(cfg)
    .chain((cfg) => match(cfg.url))
    .map((res) => res)
    .fold(
      () => null,
      (url) => url
    );

/*
const parseDbUrl = cfg => 
tryCatch(() => JSON.parse(cfg))
.map(c =>  c.url.match(DB_REGEX))
.fold(
      (x) => null,
      (x) => x
);
*/

// Ex3: Using Either and the functions above, refactor startApp
// =========================
/*const startApp = cfg => {
 const parsed = parseDbUrl(cfg)

 if(parsed) {
   const [_, user, password, db] = parsed
   return `starting ${db}, ${user}, ${password}`
 } else {
   return "can't get config"
 }
}*/

const startApp = (cfg) =>
  fromNullable(parseDbUrl(cfg)).fold(
    () => "can't get config",
    ([_, user, password, db]) => `starting ${db}, ${user}, ${password}`
  );

/* 
Course Solution
const startApp = (cfg) =>
  parseDbUrl(cfg)
  .map(([_, user, password, db]) => `starting ${db}, ${user}, ${password}`)
  .fold(
    () => "can't get config",
    x => x,
  );
*/

Object.assign(module.exports, {
  street,
  streetName,
  parseDbUrl,
  startApp,
});

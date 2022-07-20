process.env.UV_THREADPOOL_SIZE = 4; //Here you can change the size of libuv thread pool

const crypto = require("crypto"); //crypto module use libuv thread pool
const start = Date.now();

function cryptoEnumConstruction(crypto, start) {
  return (num) =>
    crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
      console.log(num, ":", Date.now() - start);
    });
}

let cryptoEnum = cryptoEnumConstruction(crypto, start);

// First 4 in the libuv thread pool
// This 4 will have almost the same time when finish
cryptoEnum(1); // Ex. 434
cryptoEnum(2); // Ex. 444
cryptoEnum(3); // Ex. 444
cryptoEnum(4); // Ex. 444
// You will notice a pause before the other 4 complete
// Second 4 in the libuv thread pool
// This 4 will have almost the same time when finish
cryptoEnum(5); // Ex. 860
cryptoEnum(6); // Ex. 861
cryptoEnum(7); // Ex. 861
cryptoEnum(8); // Ex. 861

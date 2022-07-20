const crypto = require("crypto");
const big64arr = new BigUint64Array(1);
function random64() {
  crypto.randomFillSync(big64arr);
  return big64arr[0];
}

function sumDigitsSquared(num) {
  //This suffix tells JavaScript that these numbers are to be treated as bigint values,
  //rather than values of type number.
  let total = 0n;
  while (num > 0) {
    const numModBase = num % 10n;
    total += numModBase ** 2n;
    num = num / 10n;
  }
  return total;
}
function isHappy(num) {
  while (num != 1n && num != 4n) {
    num = sumDigitsSquared(num);
  }
  return num === 1n;
}
function isHappycoin(num) {
  return isHappy(num) && num % 10000n === 0n;
}

let count = 0;
console.time("Time to get happyCoins single thread");
for (let i = 1; i < 10_000_000; i++) {
  const randomNum = random64();
  if (isHappycoin(randomNum)) {
    process.stdout.write(randomNum.toString() + " ");
    count++;
  }
}
console.timeEnd("Time to get happyCoins single thread");
process.stdout.write("\ncount " + count + "\n");

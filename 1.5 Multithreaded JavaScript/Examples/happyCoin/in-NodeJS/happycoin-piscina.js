const Piscina = require("piscina");
const crypto = require("crypto");
/*We want to restrict the number of threads to be exactly four, 
to match our previous examples.*/
const THREAD_COUNT = 3;
if (!Piscina.isWorkerThread) {
  //We’ll use the isWorkerThread property to check that
  //we’re in the main thread.

  const piscina = new Piscina({
    filename: __filename, //We’re using the same technique as earlier to create worker threads using this same file.
    minThreads: THREAD_COUNT, //
    maxThreads: THREAD_COUNT,
  });
  let done = 0;
  let count = 0;
  console.time("Time to get happyCoins using piscina");
  //We know we have four threads, so we’ll enqueue our task four times.
  //Each one will complete once it has checked its chunk of random numbers for Happycoins.
  for (let i = 0; i < THREAD_COUNT; i++) {
    (async () => {
      //We submit the task to the queue in this async IIFE, so that they all get queued in the same event loop iteration.
      const { total, happycoins } = await piscina.run();
      //process.stdout.write(happycoins);
      count += total;
      //check that all threads have completed their tasks before outputting the grand total count of Happycoins that we’ve found.
      if (++done === THREAD_COUNT) {
        console.timeEnd("Time to get happyCoins using piscina");
        console.log("\ncount", count);
      }
    })();
  }
}

module.exports = () => {
  let happycoins = "";
  let total = 0;
  //we’re dividing our total search space by the number of threads.
  for (let i = 0; i < 10_000_000 / THREAD_COUNT; i++) {
    const randomNum = random64();
    if (isHappycoin(randomNum)) {
      happycoins += randomNum.toString() + " ";
      total++;
    }
  }
  //We’re passing the string of found Happycoins and the total count
  //of them back to the main thread by returning a value from this function.
  return { total, happycoins };
};

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

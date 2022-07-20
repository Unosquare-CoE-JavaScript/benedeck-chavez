//Adds artificial slowdown to methods.
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

//A basic wrapper to convert onmessage to an async function.
function asyncOnMessageWrap(fn) {
  return async function (msg) {
    postMessage(await fn(msg.data));
  };
}
const commands = {
  async square_sum(max) {
    //Artificial random slowdowns are added to the commands.
    await sleep(Math.random() * 100);
    let sum = 0;
    for (let i = 0; i < max; i++) sum += Math.sqrt(i);
    return sum;
  },
  async fibonacci(limit) {
    await sleep(Math.random() * 100);
    let prev = 1n,
      next = 0n,
      swap;
    while (limit) {
      swap = prev;
      prev = prev + next;
      next = swap;
      limit--;
    }
    return String(next); //The BigInt result is coerced into a JSON-friendly string value.
  },
  async bad() {
    await sleep(Math.random() * 10);
    throw new Error("oh no");
  },
};

//The onmessage wrapper is injected.
self.onmessage = asyncOnMessageWrap(async (rpc) => {
  const { method, params, id } = rpc;
  if (commands.hasOwnProperty(method)) {
    try {
      const result = await commands[method](...params);
      return { id, result }; //A successful JSON-RPC-like message is resolved on success.
    } catch (err) {
      return { id, error: { code: -32000, message: err.message } };
    }
  } else {
    return {
      //An erroneous JSON-RPC-like message is rejected if a method doesn’t exist.
      id,
      error: {
        code: -32601, //The -32601 value is a magic number defined by JSON-RPC to represent a method that doesn’t exist.
        message: `method ${method} not found`,
      },
    };
  }
});

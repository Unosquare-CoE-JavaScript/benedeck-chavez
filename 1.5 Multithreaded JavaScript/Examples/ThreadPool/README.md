# ThreadPool

This application used two environment variables to make it easy to experiment with. The first is named THREADS and will be used to set the number of threads in the thread pool. The second environment variable is STRATEGY, which can be used to set the thread pool dispatch strategy.

Each request calls the square_sum command defined in the workers while passing in a value between 0 and 100 million.

### getWorker()

This method considers the strategy that was defined for the class instance when determining which worker to use next. The bulk of the function is a large if statement where each branch correlates to a strategy.

- The first one, random, doesn’t require any additional state, making it the simplest. All the function does is to randomly choose one of the entries in the pool and then choose that as a candidate.

- The second branch, for roundrobin, is slightly more complicated. This one makes use of a class property named rr_index, incrementing the value and then returning the worker located at the new index. Once the index exceeds the number of workers, it then wraps back around to zero.

- The final branch, for leastbusy, has the most complexity. It works by looping through each one of the workers, noting the number of commands that it currently has in progress by looking at the size of the in_flight_commands map, and determining if it’s the smallest value that has been encountered so far. If so, it then decides that worker is the next to be used.

# Testing the program

Open up two terminal windows and navigate to the ch6-thread-pool/ directory in the first one. In this terminal window execute the following command:

```js
THREADS=3 STRATEGY=leastbusy node main.js
```

This starts a process with a thread pool containing three workers using the leastbusy strategy.

Next, run the following command in the second terminal window:

```js
npx autocannon -c 5 -a 20 http://localhost:1337
```

This executes the **autocannon** command, which is an npm package for performing benchmarks.

![Alt Text](../../../images/Multithreaded/NodeJS/ThreadPool.gif)

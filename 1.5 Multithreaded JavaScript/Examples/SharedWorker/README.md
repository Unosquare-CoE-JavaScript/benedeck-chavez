```
npx serve
```

A shared worker is “keyed” based on its location in the current origin. For example, the shared worker you’ll work with in this example is located somewhere like http://localhost:5000/shared-worker.js. Whether the worker is loaded from an HTML file located at /red.html, /blue.html, or even /foo/index.html, the shared worker instance will always remain the same.

![Alt Text](../../../images/Multithreaded/Workers/sharedWorker.gif)

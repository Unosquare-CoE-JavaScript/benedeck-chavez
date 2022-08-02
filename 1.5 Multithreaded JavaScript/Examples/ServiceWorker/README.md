```
npx serve
```

Intercepted an HTTP request from one JavaScript environment, performed some computation in another environment, and returned the result back to the main environment. Much like with the
other web workers, this calculation was done in a separate thread, running code in parallel. Had the service worker done some very heavy and slow calculations, the web page would have been free to perform other actions while it waited for the response.

![Alt Text](../../../images/Multithreaded/Workers/serviceWorker.gif)

After a dedicated worker is instantiated, an instance of a SharedArrayBuffer is also instantiated. The argument that follows, 1,024 in this case, is the number of bytes allocated to the buffer. Unlike other arrays or buffer objects you might be familiar with, these buffers cannot shrink or grow in size after they’ve been created.

A view to work with the buffer named view has also been created. This view into the buffer allows us to read from it using the array index syntax. In this case, we’re able to inspect the 0th byte in the buffer by logging a call to view[0].

Once the script (main.js) is finished with the setup work, it schedules a function to run in 500 ms. This script prints the 0th byte of the buffer again and also attempts to print a property attached to the buffer named .foo. Note that this file otherwise does not have a worker.onmessage handler defined.

worker.js attaches a handler for the onmessage event, which is run after the .postMessage() method in main.js is fired. Once called, the buffer argument is grabbed. The first thing that happens in the handler is that a .foo property is attached to the SharedArrayBuffer instance. Next, another view is created for the buffer. After that the buffer is updated through the view. Once that’s done, a message is printed so that you can see what has happened.

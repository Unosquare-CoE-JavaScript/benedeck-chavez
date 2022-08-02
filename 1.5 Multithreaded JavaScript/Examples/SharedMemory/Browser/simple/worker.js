self.onmessage = ({ data: buffer }) => {
  //A property on the buffer object is written.
  buffer.foo = 42;
  const view = new Uint8Array(buffer);
  //The 0th index is set to the number 2.
  view[0] = 2;
  console.log("updated in worker");
};

## Compiling Errors

Expected output of the file [1 First.js](./1%20First.js):

```
First.js:6
  greeting = ."Hi";
             ^

SyntaxError: Unexpected token '.'
```

Expected output of the file [2 Second.js](./2%20Second.js):

```
function saySomething(greeting, greeting) {
                                ^^^^^^^^

SyntaxError: Duplicate parameter name not allowed in this context
```

Expected output of the file [3 Third.js](./3%20Third.js):

```
greeting = "Howdy"; // error comes from here
             ^

ReferenceError: Cannot access 'greeting' before initialization
```

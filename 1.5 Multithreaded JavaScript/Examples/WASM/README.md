Implement a simple addition function in WAT.

We can convert this WAT file to WebAssembly binary by using the wat2wasm tool from the WebAssembly Binary Toolkit (WABT).

```js
   npx -p wabt wat2wasm add.wat -o add.wasm
```

Provided you’ve created the .wasm file using the preceding wat2wasm command, you should be able to run this

```js
 node add.js
```

#

AssemblyScript file to WebAssembly, we can use the asc command from the assemblyscript module.

```js
    npx -p assemblyscript asc add.ts  --outFile add.wasm --optimize
```

Provided you’ve created the .wasm file using the preceding wat2wasm command, you should be able to run this

```js
 node add.js
```

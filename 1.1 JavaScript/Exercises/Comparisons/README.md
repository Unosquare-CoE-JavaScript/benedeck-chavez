## <a id="declaring-variables"></a> Declaring and Using Variables

Expected output of the file:

```
3 === 3.0 true
"yes" === "yes" true
null === null true
false === false true
42 === "42" false
"hello" === "Hello" false
true === 1 false
0 === null false
"" === null false
null === undefined false
NaN === NaN false
0 === -0 true
y === x true
y === [1, 2, 3] false
x === [1, 2, 3] false
Run times: 1
Run times: 2
Run times: 3
x ="10" < y = "9" true
```

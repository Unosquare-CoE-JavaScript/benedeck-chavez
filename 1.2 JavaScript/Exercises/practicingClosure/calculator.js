/*
- Each time calc(..) is called, you’ll pass in a single character that represents a keypress of a calculator button.
- Restrict our calculator to supporting entering only digits (0-9), arithmetic operations (+, -, *, /), and “=” to compute the operation.
- Operations are processed strictly in the order entered; there’s no “( )” grouping or operator precedence.
- We don’t support entering decimals, but the divide operation can result in them.
- We don’t support entering negative numbers, but the “-“ operation can result in them.
- The return of calc(..) calls should mimic what would be shown on a real calculator,
like reflecting what was just pressed, or computing the total when pressing “=”.
*/

function formatTotal(display) {
  if (Number.isFinite(display)) {
    // constrain display to max 11 chars
    let maxDigits = 11;
    // reserve space for "e+" notation?
    if (Math.abs(display) > 99999999999) {
      maxDigits -= 6;
    }
    // reserve space for "-"?
    if (display < 0) {
      maxDigits--;
    }
    // whole number?
    if (Number.isInteger(display)) {
      display = display.toPrecision(maxDigits).replace(/\.0+$/, "");
    }
    // decimal
    else {
      // reserve space for "."
      maxDigits--;
      // reserve space for leading "0"?
      if (Math.abs(display) >= 0 && Math.abs(display) < 1) {
        maxDigits--;
      }
      display = display.toPrecision(maxDigits).replace(/0+$/, "");
    }
  } else {
    display = "ERR";
  }
  return display;
}

function useCalc(calc, keys) {
  return [...keys].reduce(function showDisplay(display, key) {
    var ret = String(calc(key));
    return display + (ret != "" && key == "=" ? "=" : "") + ret;
  }, "");
}

function calculator() {
  var memory = "";
  var lastOneEqual = false;

  return function evalInput(val) {
    {
      let supportedCharacters = /([0-9\+\*\-\/\=])/;

      if (!supportedCharacters.test(val)) {
        memory = [];
        return "ERR";
      }
    }

    if (val === "=") {
      memory = memory.includes("ERR") ? "ERR" : formatTotal(eval(memory));
      lastOneEqual = true;
      return memory;
    } else if (!lastOneEqual) {
      //if the last character was NOT a "=" continue with the concatenation
      memory += val;
    } else {
      let operationCharacters = /([\+\*\-\/\=])+/;
      if (operationCharacters.test(val)) {
        //if the last character was a "=" and the new one is an operational symbol continue with the concatenation
        memory += val;
      } else {
        //if the last character was a "=" and the new one is NOT an operational symbol reset the memory
        memory = val;
      }
    }
    lastOneEqual = false;
    return val;
  };
}

var calc = calculator();

console.log(useCalc(calc, "4+3=")); // 4+3=7
console.log(useCalc(calc, "+9=")); // +9=16
console.log(useCalc(calc, "*8=")); // *5=128
console.log(useCalc(calc, "7*2*3=")); // 7*2*3=42
console.log(useCalc(calc, "1/0=")); // 1/0=ERR
console.log(useCalc(calc, "+3=")); // +3=ERR
console.log(useCalc(calc, "51=")); // 51

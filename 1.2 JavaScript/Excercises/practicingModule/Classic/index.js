/*
This module should be expressed as a classic module factory function called calculator(),
instead of a singleton IIFE, so that multiple calculators can be created if desired.
The public API should include the following methods:
• number(..) (input: the character/number “pressed”)
• plus()
• minus() 
• mult() 
• div()
• eq()
*/
// factory function, not singleton IIFE
function defineCalculator() {
  var memory = "";
  var lastOneEqual = false;

  var publicAPI = { number, plus, minus, mult, div, eq };
  return publicAPI;
  // *********** Public functions *************
  function number(val) {
    return evalInput(val);
  }
  function plus() {
    return evalInput("+");
  }
  function minus() {
    return evalInput("-");
  }
  function mult() {
    return evalInput("*");
  }
  function div() {
    return evalInput("/");
  }
  function eq() {
    return evalInput("=");
  }
  // ************ Private functions ************
  function evalInput(val) {
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
  }

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
}

function useCalc(calc, keys) {
  var keyMappings = {
    "+": "plus",
    "-": "minus",
    "*": "mult",
    "/": "div",
    "=": "eq",
  };
  return [...keys].reduce(function showDisplay(display, key) {
    var fn = keyMappings[key] || "number";
    var ret = String(calc[fn](key));
    return display + (ret != "" && key == "=" ? "=" : "") + ret;
  }, "");
}

var calc = defineCalculator();

console.log(useCalc(calc, "4+3=")); // 4+3=7
console.log(useCalc(calc, "+9=")); // +9=16
console.log(useCalc(calc, "*8=")); // *5=128
console.log(useCalc(calc, "7*2*3=")); // 7*2*3=42
console.log(useCalc(calc, "1/0=")); // 1/0=ERR
console.log(useCalc(calc, "+3=")); // +3=ERR
console.log(useCalc(calc, "51=")); // 51

class Greetings {
  english() {
    return "Hello";
  }
  spanish() {
    return "Hola";
  }
}

class MoreGreetings {
  german() {
    return "Hallo";
  }
  french() {
    return "Bonjour";
  }
}

const greetings = new Greetings();
const moreGreetings = new MoreGreetings();

const allGreetings = new Proxy(moreGreetings, {
  get: function (target, prop) {
    return target[prop] || greetings[prop];
  },
});

console.log(allGreetings.french());
console.log(allGreetings.spanish());

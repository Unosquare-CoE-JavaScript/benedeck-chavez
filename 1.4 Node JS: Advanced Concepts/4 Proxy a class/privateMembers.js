class Greetings {
  _attrA = 100;
  #_attrB = 100;

  english() {
    return "Hello";
  }
  get B() {
    return this.#_attrB;
  }
}

class MoreGreetings {
  static build() {
    const greetings = new Greetings();
    const moreGreetings = new MoreGreetings(greetings);

    return new Proxy(moreGreetings, {
      get: function (target, prop) {
        return target[prop] || greetings[prop];
      },
    });
  }

  constructor(Greetings) {
    this.greetings = Greetings;
  }
  german() {
    return "Hallo";
  }
}

const allGreetings = MoreGreetings.build();

console.log(allGreetings.english());
console.log(allGreetings.german());
console.log(allGreetings["_attrA"]);
console.log(allGreetings["#_attrB"]);
console.log(allGreetings["english"]());

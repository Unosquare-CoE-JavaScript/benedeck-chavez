//Dummy mock of event handler
var events = {};

function addEventListener(type, listener) {
  if (!events[type]) {
    events[type] = [];
  }

  events[type].push(listener);
}

function emitEvent(type) {
  if (events[type]) {
    events[type].forEach((listener) => listener());
  }
}
//Dummy mock of event handler

function listenForClicks(label) {
  addEventListener("click", function onClick() {
    console.log(`The ${label} button was clicked!`);
  });
}
listenForClicks("Checkout");

emitEvent("click");

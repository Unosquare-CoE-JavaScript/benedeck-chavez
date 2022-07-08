/*
Define a slot machine with three reels that can individually spin(), 
and then display()the current contents of all the reels.
The basic behavior of a single reel is defined in the reel object below.
But the slot machine needs individual reels objects that delegate to reel,
and which each have a position property.
A reel only knows how to display() its current slot symbol,
but a slot machine typically shows three symbols per reel:
the current slot (position), one slot above (position - 1),
and one slot below (position + 1). 
So displaying the slot machine should end up displaying a 3x3 grid of slot symbols.
*/

function randMax(max) {
  return Math.trunc(1e9 * Math.random()) % max;
}

var reel = {
  symbols: ["X", "Y", "Z", "W", "$", "*", "<", "@"],
  spin() {
    if (this.position == null) {
      this.position = randMax(this.symbols.length - 1);
    }
    this.position = (this.position + 100 + randMax(100)) % this.symbols.length;
  },
  display() {
    if (this.position == null) {
      this.position = randMax(this.symbols.length - 1);
    }
    return this.symbols[this.position];
  },
};

var slotMachine = {
  reels: [Object.create(reel), Object.create(reel), Object.create(reel)],
  spin() {
    this.reels.forEach(function spinReel(reel) {
      reel.spin();
    });
  },
  display() {
    var lines = [];
    // display all 3 lines on the slot machine
    for (let linePos = -1; linePos <= 1; linePos++) {
      let line = this.reels.map(function getSlot(reel) {
        var slot = Object.create(reel);
        slot.position =
          (reel.symbols.length + reel.position + linePos) % reel.symbols.length;
        return reel.display.call(slot);
      });
      lines.push(line.join(" | "));
    }
    return lines.join("\n");
  },
};

slotMachine.spin();
console.log(slotMachine.display());
// < | @ | *
// @ | X | <
// X | Y | @

slotMachine.spin();
console.log(slotMachine.display());
// Z | X | W
// W | Y | $
// $ | Z | *

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
    let result = "";

    //iterator to get the 3 positions of the reel
    //one slot above (position=-1),
    //current slot   (position= 0),
    //one slot below (position= 1),

    let position = -1;
    while (position <= 1) {
      let index = 0;

      //iterator to get the reels of the machine
      while (index < this.reels.length) {
        //create auxiliary reel
        let aux = Object.create(reel);

        //calculate the position of the symbol (context of the position fot the auxiliary reel)
        aux.position =
          (this.reels[index].symbols.length +
            this.reels[index].position +
            position) %
          this.reels[index].symbols.length;

        result += aux.display();
        index++;
        result += index < this.reels.length ? " | " : "";
      }
      result += "\n";
      position++;
    }
    console.log(result);
  },
};

slotMachine.spin();
slotMachine.display();
// < | @ | *
// @ | X | <
// X | Y | @

slotMachine.spin();
slotMachine.display();
// Z | X | W
// W | Y | $
// $ | Z | *

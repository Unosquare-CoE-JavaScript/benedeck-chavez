const {
  isLastInStock,
  nameOfFirstCar,
  averageDollarValue,
  availablePrices,
  fasitCar,
  sanitizeNames,
} = require("../composeExercise");

// Example Data
const CARS = [
  { name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true },
  {
    name: "Spyker C12 Zagato",
    horsepower: 650,
    dollar_value: 648000,
    in_stock: false,
  },
  {
    name: "Jaguar XKR-S",
    horsepower: 550,
    dollar_value: 132000,
    in_stock: false,
  },
  { name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false },
  {
    name: "Aston Martin One-77",
    horsepower: 750,
    dollar_value: 1850000,
    in_stock: true,
  },
  {
    name: "Pagani Huayra",
    horsepower: 700,
    dollar_value: 1300000,
    in_stock: false,
  },
];

describe("Compose Exercise", function () {
  it("Ex1: isLastInStock", () => {
    expect(isLastInStock(CARS)).toStrictEqual(false);
  });

  it("Ex2: nameOfFirstCar", () => {
    expect(nameOfFirstCar(CARS)).toStrictEqual("Ferrari FF");
  });

  it("Ex3: averageDollarValue", () => {
    expect(averageDollarValue(CARS)).toStrictEqual(790700);
  });

  it("Ex4: sanitizeNames", () => {
    expect(sanitizeNames(CARS)).toStrictEqual([
      "ferrari_ff",
      "spyker_c12_zagato",
      "jaguar_xkr_s",
      "audi_r8",
      "aston_martin_one_77",
      "pagani_huayra",
    ]);
  });

  it("Bonus 1: availablePrices", () => {
    expect(availablePrices(CARS)).toStrictEqual("$700,000.00, $1,850,000.00");
  });

  it("Bonus 2: fasitCar", () => {
    expect(fasitCar(CARS)).toStrictEqual("Aston Martin One-77 is the fasit");
  });
});

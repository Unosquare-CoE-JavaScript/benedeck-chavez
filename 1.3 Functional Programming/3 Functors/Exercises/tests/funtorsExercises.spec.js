const {
  moneyToFloat,
  percentToFloat,
  applyDiscount,
} = require("../functorsExercises");

describe("Functor Exercise", function () {
  it("Ex1: moneyToFloat", () => {
    expect(String(moneyToFloat("$5.00"))).toEqual("5");
  });

  it("Ex2: percentToFloat", () => {
    expect(String(percentToFloat("20%"))).toEqual("0.2");
  });

  it("Ex3: Apply discount", () => {
    expect(String(applyDiscount("$5.00", "20%"))).toEqual("4");
  });
});

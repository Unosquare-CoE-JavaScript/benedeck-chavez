const {
  words,
  sentences,
  filterQs,
  max,
  slice,
  take,
} = require("../curryExercise");

describe("Curry Exercise", function () {
  it("Ex1: split", () => {
    expect(words("Jingle bells Batman smells")).toStrictEqual([
      "Jingle",
      "bells",
      "Batman",
      "smells",
    ]);
  });

  it("Ex1a: map/split", () => {
    expect(
      sentences(["Jingle bells Batman smells", "Robin laid an egg"])
    ).toStrictEqual([
      ["Jingle", "bells", "Batman", "smells"],
      ["Robin", "laid", "an", "egg"],
    ]);
  });

  it("Ex2: filter", () => {
    expect(
      filterQs(["quick", "camels", "quarry", "over", "quails"])
    ).toStrictEqual(["quick", "quarry", "quails"]);
  });

  it("Ex3: max", () => {
    expect(max([323, 523, 554, 123, 5234])).toBe(5234);
  });

  it("Bonus 1", () => {
    expect(slice(1)(3)(["a", "b", "c"])).toStrictEqual(["b", "c"]);
  });

  it("Bonus 2", () => {
    expect(take(2)(["a", "b", "c"])).toStrictEqual(["a", "b"]);
  });
});

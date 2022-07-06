const {
  street,
  streetName,
  parseDbUrl,
  startApp,
} = require("../monadsExercise");

describe("Functor Exercise", function () {
  it("Ex1: street", () => {
    const user = { address: { street: { name: "Willow" } } };
    expect(street(user)).toStrictEqual({ name: "Willow" }),
      expect(street({})).toStrictEqual("no street");
  });

  it("Ex2: streetName", () => {
    const user = { address: { street: { name: "Willow" } } };
    expect(streetName(user)).toStrictEqual("Willow"),
      expect(streetName({})).toStrictEqual("no street"),
      expect(streetName({ address: { street: null } })).toStrictEqual(
        "no street"
      );
  });

  it("Ex3: parseDbUrl", () => {
    const config = '{"url": "postgres://sally:muppets@localhost:5432/mydb"}';
    expect(parseDbUrl(config)[1]).toStrictEqual("sally"),
      expect(parseDbUrl()).toStrictEqual(null);
  });

  it("Ex3: startApp", () => {
    const config = '{"url": "postgres://sally:muppets@localhost:5432/mydb"}';
    expect(String(startApp(config))).toEqual("starting mydb, sally, muppets"),
      expect(String(startApp())).toEqual("can't get config");
  });
});

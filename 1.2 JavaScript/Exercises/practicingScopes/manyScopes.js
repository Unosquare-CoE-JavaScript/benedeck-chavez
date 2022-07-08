/*
write a program—any program!— that contains nested functions and block scopes, which satisfies these constraints:
• If you color all the scopes (including the global scope!) different colors, you need at least six colors. Make sure to add a code comment labeling each scope with its color.
BONUS: identify any implied scopes your code may
have. (DONE)
• Each scope has at least one identifier. (DONE)
• At least one variable from an outer scope must be
shadowed by a nested scope variable (see Chapter 3). (DONE)
• At least one variable reference must resolve to a variable declaration at least two levels higher in the scope chain. (DONE)
*/

//Global Scope  - 1 Blue
var vehicle = (function defineVehicle() {
  //Function (Module) Scope  - 2 Red
  var vehicles = [
    {
      id: 1,
      name: "ECO1",
      vehicleInfo: {
        plate: "AS-1234",
        vin: "4Y1SL65848Z411439",
        make: "Mercedes-Benz",
        model: "A-Class",
        year: 2022,
      },
      vehiclePosition: {
        latitude: 20.672773,
        longitude: -103.358783,
        orientation: "30°",
      },
    },
    {
      id: 2,
      name: "ECO2",
      vehicleInfo: {
        plate: "AS-4657",
        vin: "4Y1SL65848Z411439",
        make: "Mercedes-Benz",
        model: "A-Class",
        year: 2022,
      },
      vehiclePosition: {
        latitude: 20.672773,
        longitude: -103.358783,
        orientation: "20°",
      },
    },
    {
      id: 3,
      name: "ECO3",
      vehicleInfo: {
        plate: "AS-1234",
        vin: "4Y1SL65848Z411439",
        make: "Mercedes-Benz",
        model: "A-Class",
        year: 2022,
      },
      vehiclePosition: {
        latitude: 20.672773,
        longitude: -103.358783,
        orientation: "230°",
      },
    },
    {
      id: 4,
      name: "ECO4",
      vehicleInfo: {
        plate: "AS-5768",
        vin: "4Y1SL65848Z411439",
        make: "Mercedes-Benz",
        model: "A-Class",
        year: 2022,
      },
      vehiclePosition: {
        latitude: 20.672773,
        longitude: -103.358783,
        orientation: "230°",
      },
    },
    {
      id: 5,
      name: "ECO5",
      vehicleInfo: {
        plate: "AS-6789",
        vin: "4Y1SL65848Z411439",
        make: "Mercedes-Benz",
        model: "A-Class",
        year: 2022,
      },
      vehiclePosition: {
        latitude: 20.672773,
        longitude: -103.358783,
        orientation: "250°",
      },
    },
  ];

  var publicAPI = { getVehicleById, getFormattedName, getFormattedPosition };
  return publicAPI;
  // ************************
  function getVehicleById(vehicleID) {
    //Function Scope  - 3 Green
    let vehicle = vehicles.find(
      (vehicle) => vehicle.id == vehicleID //Arrow Function Scope  - 4 Yellow
    );

    return vehicle;
  }
  // ************************
  function getFormattedName(vehicleID) {
    //Function Scope  - 5 Orange
    let { name, vehicleInfo } = getVehicleById(vehicleID);

    return `${name} - ${vehicleInfo.make} ${vehicleInfo.model} ${vehicleInfo.year}`;
  }
  // ************************
  function getFormattedPosition(vehicleID) {
    //Function Scope  - 6 Purple
    let { vehiclePosition } = getVehicleById(vehicleID);

    return `lat: ${vehiclePosition.latitude}, lng:  ${vehiclePosition.longitude}`;
  }
})();

console.log(vehicle.getVehicleById(1));
console.log(vehicle.getFormattedName(1));
console.log(vehicle.getFormattedPosition(1));

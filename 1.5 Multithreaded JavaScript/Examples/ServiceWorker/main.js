// Registers service worker and defines scope.
// The scope represents the directory for the current origin
// wherein any HTML pages that are loaded in it will have their
// requests passed through the service worker.
navigator.serviceWorker.register("/sw.js", {
  scope: "/",
});

//Listens for a controllerchange event.
navigator.serviceWorker.oncontrollerchange = () => {
  console.log("controller change");
};

//Function to initiate request.
async function makeRequest() {
  const result = await fetch("/data.json");
  const payload = await result.json();
  console.log(payload);
}

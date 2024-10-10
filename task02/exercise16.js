const promise = new Promise((resolve) => {
  setTimeout(() => resolve("Resolved"), 1000);
}).then(printValue);

function printValue(value) {
  console.log(value);
}

promise.then(() => console.log("Promise has been resolved!"));

console.log("I'm not the promise!");

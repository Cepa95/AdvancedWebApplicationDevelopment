const promise = new Promise((resolve) => {
  setTimeout(() => resolve("Resolved"), 1000);
}).then(printValue);

function printValue(value) {
  console.log(value);
}

// const promise = new Promise((resolve) => {
//   setTimeout(() => resolve("Resolved"), 1000);
// });

// function printValue(value) {
//   console.log(value);
// }

// promise.then(printValue);


// function createPromise() {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve("Resolved"), 1000);
//   }).then(printValue);
// }

// function printValue(value) {
//   console.log(value);
// }

// createPromise();
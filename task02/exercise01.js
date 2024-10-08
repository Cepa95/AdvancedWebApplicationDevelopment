function after(n, callback) {
  let counter = 0;
  return function () {
    counter++;
    if (counter === n) callback();
  };
}

const callback = () => console.log("Hello World!");
const n = 3;
const afterN = after(n, callback);

afterN();
afterN();
afterN();

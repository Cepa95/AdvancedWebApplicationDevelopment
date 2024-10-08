function russianRoulette(n) {
  let counter = 0;

  return function () {
    let sound = n === counter ? "bang" : "click";

    if (counter > n) return "Reload to play again";

    counter++;
    return sound;
  };
}

const iterator = russianRoulette(3);

console.log(iterator());
console.log(iterator());
console.log(iterator());
console.log(iterator());
console.log(iterator());

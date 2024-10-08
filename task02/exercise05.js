function iterateOverArray(array) {
  let index = 0;
  return function () {
    if (index >= array.length) return "End of array";

    const result = `${array[index]} je ${index + 1}. element niza`;
    index++;
    return result;
  };
}

const array = [1, 2, 3, 4, 5];
const iterator = iterateOverArray(array);

console.log(iterator());
console.log(iterator());
console.log(iterator());
console.log(iterator());
console.log(iterator());
console.log(iterator());

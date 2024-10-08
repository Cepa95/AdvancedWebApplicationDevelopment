function createIterator(array) {
  let index = 0;
  return {
    next: () => (index < array.length ? [array[index], index++] : null),
  };
}

const array = [1, 2, 3, 4, 5];
const iterator = createIterator(array);

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

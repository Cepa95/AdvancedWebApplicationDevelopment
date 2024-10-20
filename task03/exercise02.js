function createIterator(array) {
  let currentIndex = 0;

  return {
    next: () => {
      if (currentIndex < array.length) {
        const result = [array[currentIndex], currentIndex];
        currentIndex++;
        return result;
      }
      return null;
    },
  };
}

const myArray = ["a", "b", "c", "d"];
const iterator = createIterator(myArray);

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

function numSelectString(numbers) {
  const oddNumbers = numbers.filter((num) => num % 2 !== 0);
  const sortedOddNumbers = oddNumbers.sort((a, b) => a - b);

  let currentIndex = 0;

  return {
    next: () => {
      if (currentIndex < sortedOddNumbers.length) {
        const value = sortedOddNumbers[currentIndex];
        currentIndex++;
        return { value: value, done: false };
      }
      return { done: true };
    },
  };
}

const iterator = numSelectString([17, 34, 3, 12, 23]);

console.log(iterator.next()); 
console.log(iterator.next()); 
console.log(iterator.next()); 
console.log(iterator.next()); 
console.log(iterator.next()); 

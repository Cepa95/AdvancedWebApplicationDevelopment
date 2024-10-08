function numSelectString(numbers) {
  const oddNumbers = numbers.filter((num) => num % 2 !== 0);

  const sortedOddNumbers = oddNumbers.sort((a, b) => a - b);

  const resultString = sortedOddNumbers.reduce((acc, num, index) => {
    if (index === 0) return num.toString();

    return acc + ", " + num;
  }, "");

  let index = 0;

  return {
    getResultString: () => resultString,

    next: () =>
      index < sortedOddNumbers.length
        ? { value: sortedOddNumbers[index++], done: false }
        : { done: true },
  };
}

const iterator = numSelectString([17, 34, 3, 12, 23]);
console.log(iterator.getResultString());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

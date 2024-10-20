function numSelectString(numbers) {
    const oddNumbers = numbers.filter((num) => num % 2 !== 0);
  
    const sortedOddNumbers = oddNumbers.sort((a, b) => a - b);
  
    const resultString = sortedOddNumbers.reduce((acc, num, index) => {
      if (index === 0) return num.toString();
  
      return acc + ", " + num;
    }, "");
  
    return resultString;
  }
  
  console.log(numSelectString([17, 34, 3, 12, 23]));
  
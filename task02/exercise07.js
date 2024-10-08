function blackJack(array) {
  return function dealer(firstNumber, secondNumber) {
    let sum = firstNumber + secondNumber;
    let counter = 0;

    return function player() {
      if (counter === 0) {
        counter++;
        return sum;
      } else if (counter === 1) {
        counter++;
        return sum + array[0] <= 21 ? (sum += array[0]) : "bust!";
      } else {
        counter++;
        return sum + array[counter - 1] <= 21
          ? (sum += array[counter - 1])
          : "bust!";
      }
    };
  };
}

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const dealer = blackJack(array);
const player = dealer(2, 3);

console.log(player());
console.log(player());
console.log(player());
console.log(player());
console.log(player());
console.log(player());

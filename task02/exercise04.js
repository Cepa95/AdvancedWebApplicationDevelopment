function iterateOverArray(array, array1) {
  let sum = 0;

  for (let i = 0; i < array.length; i++) {
    sum = sum + array[i];
  }
  //   array1.reduce((acc, num) => {
  //     sum = sum + num;
  //   }, 0);
  return sum;
}

const array = [1, 2, 3, 4, 5];

console.log(iterateOverArray(array));

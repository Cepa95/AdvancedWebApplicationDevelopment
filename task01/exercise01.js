function vecina(arr, callback) {
    let trueCount = 0;
    let falseCount = 0;

    for (let i = 0; i < arr.length; i++) {
        callback(arr[i]) ? trueCount++ : falseCount++;

        if (trueCount > arr.length / 2) {
            return true;
        }
        if (falseCount > arr.length / 2) {
            return false;
        }
    }
    
    return trueCount >= falseCount;
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const callback = (num) => num > 6;

console.log(vecina(arr, callback)); 
// Napisati funkciju prioritiziraj() koja prima niz i callback. Callback funkcija će vratiti true ili false.
// Funkcija prioritiziraj() će iterirati kroz niz i pozvati callback funkciju nad svakim elementom.
// Funkcija prioritiziraj() će vratiti novi niz u kojem su u prvom dijelu niza svi oni elementi za koje je
// callback vratila true, a u drugom dijelu svi oni elementi za koje je callback funkcija vratila false.
// Proučiti funkciju Array.unshift().

function prioritiziraj(arr, callback) {
    const combineArr = [];

    for (let i = 0; i < arr.length; i++) {
        callback(arr[i]) ? combineArr.unshift(arr[i]) : combineArr.push(arr[i]);
    }
    
    return combineArr;
}

const arr = [1, 7, 3, 8, 9, 6, 7, 4, 9, 3, 1, 12];

const callback = (num) => num > 6;

console.log(prioritiziraj(arr, callback)); 
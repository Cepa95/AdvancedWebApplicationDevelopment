// Napisati svoju verziju JS funkcije reduce(). Funkcija prima 3 argumenta:- Niz- Callback funkciju
// koja će se primjeniti na svaki član niza- Akumulator koji će se vratiti, kao rezultat pozivanja
// callback funkcije na sve članove niza. Za razliku od funkcije map, reduce ne vraća niz rezultata (za
// svaki element), već jedan zajednički rezultat (akumulator).

function myReduce(array, zbroji, acc) {
  return zbroji(array, acc);
}

function zbroji(array, acc) {
  let result = acc;
  for (let i = 0; i < array.length; i++) {
    result = result + array[i];
  }
  return result;
}

const array = [1, 2, 3, 4, 5];

console.log(myReduce(array, zbroji, 0));

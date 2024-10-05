// Kreirati funkciju pipe() koja prima niz (i to niz funkcija) i jednu vrijednost. Funkcija pipe()
// vrijednost ubacuje u prvu funkciju u nizu, te njen rezultat ubacuje u drugu funkciju u nizu, pa njen
// rezultat u treću i tako do zadnje funkcije u nizu. Funkcija pipe() vraća konačni rezultat

function pipe(functions, value) {
  let result = value;
  for (const func of functions) {
    result = func(result);
  }
  return result;
//   return functions.reduce((acc, func) => func(acc), value);
}

const addOne = (x) => x + 1;
const multiplyByTwo = (x) => x * 2;
const square = (x) => x * x;

const functions = [addOne, multiplyByTwo, square];

console.log(pipe(functions, 1));
console.log(pipe([addOne, addOne, addOne], 2));
console.log(pipe([square, multiplyByTwo, addOne], 3));

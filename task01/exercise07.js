// Napisati svoju izvedbu funkcije filter(). Funkcija prima dva argumenta:- Ulazni Niz- Callback
// funkciju koja će se primjeniti na svaki element ulaznog niza, te će vratiti true ili false, na osnovu
// čega će se element odati u povratni niz (odnosno neće). Funkcija vraca povratni niz sa elementima
// koji su prosli filtriranje

function myFilter(array, isEven) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    if (isEven(array[i])) {
      result.push(array[i]);
    }
  }
  return result;
}

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const isEven = (num) => num % 2 === 0;

console.log(myFilter(array, isEven));

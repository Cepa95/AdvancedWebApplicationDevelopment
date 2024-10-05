// Kreirati funkciju komutativnost() koja prima dvije callback funkcije i vrijednost. Funkcija
// komutativnost() će vratiti true ako prosljeđivanje vrijednosti u prvu callback funkciju i onda
// prenošenje rezultirajuće vrijednost u drugu funkciju, daje isti rezultat kao prenošenje vrijednosti u
// drugu funkciju i prosljeđivanje rezultirajuće vrijednosti u prvu funkciju.

function komutativnost(callback1, callback2, value) {
  const result1 = callback2(callback1(value));

  const result2 = callback1(callback2(value));

  return result1 === result2;
}

const addOne = (x) => x + 1;
const multiplyByTwo = (x) => x * 2;
const square = (x) => x * x;

console.log(komutativnost(addOne, multiplyByTwo, 5));
console.log(komutativnost(addOne, addOne, 5));
console.log(komutativnost(square, square, 10));

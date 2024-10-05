// Kreirati funkciju grupiraj() koja prima niz i callback te vraća objekt. Funkcija grupiraj() će
// iterirati kroz niz i izvršiti callback funkciju nad svakim članom. Svaki return funkcije će postati
// ključ u objektu. Vrijednost na svakom ključu će biti niz čiji elementi su rezultat callback obrade.
// Npr. Za niz {1, 2, 3, 4, 5} i cb(input){if (input % 2 == 0) return true;} povratna vrijednost funkcije
// gupiraj() je {true:[2, 4], false:[1, 3, 5]}.

function grupiraj(arr, callback) {
  const result = { true: [], false: [] };

  for (let i = 0; i < arr.length; i++) {
    const key = callback(arr[i]);
    // if (!result[key]) {
    //   result[key] = [];
    // }

    result[key].push(arr[i]);
  }

  return result;
}

const arr = [1, 2, 3, 4, 5];

const callback = (input) => input % 2 === 0;

console.log(grupiraj(arr, callback));

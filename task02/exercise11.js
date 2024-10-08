function* wordIterator(sentence) {
  const words = sentence.split(" ");
  for (const word of words) {
    yield word;
  }
}

const sentence =
  "generator funkcija";

const iterator = wordIterator(sentence);

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

function* wordGenerator(sentence) {
  const words = sentence.split(" ");
  for (const word of words) {
    yield word;
  }
}

const sentence =
  "iterator funkcija koja prima string odvojenih razmakom i vraca objekt koji na sebi ima metodu next";

const iterator = wordGenerator(sentence);

for (let result = iterator.next(); !result.done; result = iterator.next()) {
  console.log(result);
}

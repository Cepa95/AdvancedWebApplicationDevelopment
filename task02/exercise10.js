function wordIterator(sentence) {
  const words = sentence.split(" ");
  let index = 0;

  return {
    next: () =>
      index < words.length
        ? { value: words[index++], done: false }
        : { done: true },
  };
}

const sentence =
  "iterator funkcija koja prima string odvojenih razmakom i vraca objekt koji na sebi ima metodu next";

const iterator = wordIterator(sentence);

for (let index = 0; index < sentence.split(" ").length + 1; index++) {
  console.log(iterator.next());
}

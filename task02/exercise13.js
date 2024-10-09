const createSentence = (noun) => `${noun} je`;

async function printSentence(noun) {
  const sentence = await createSentence(noun);
  setTimeout(() => {
        console.log(sentence);
    }, 3000);
}

printSentence("Auto");

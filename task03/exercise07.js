const createSentence = async (noun) => `${noun} je`;

async function printSentence(noun) {
  const sentence = await createSentence(noun);
  await new Promise(resolve => setTimeout(resolve, 3000)); 
  console.log(sentence);
}

printSentence("Auto");

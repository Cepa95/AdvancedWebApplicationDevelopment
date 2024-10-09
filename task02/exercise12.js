function* simulacijaRazgovoraGenerator(words, index = 0) {
  if (index < words.length) {
    words[index] === "generator" ? yield "hej" : yield "besmislica";

    yield* simulacijaRazgovoraGenerator(words, index + 1);
  }
}

function simulacijaRazgovora(words) {
  const iterator = simulacijaRazgovoraGenerator(words);
  const intervalId = setInterval(() => {
    const result = iterator.next();
    if (result.done) {
      clearInterval(intervalId);
      console.log(result);
    } else {
      console.log(result.value);
    }
  }, 3000);
}

const words = ["ovo", "je", "generator", "test"];
simulacijaRazgovora(words);

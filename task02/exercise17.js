function fakeAPICall(i) {
  return new Promise((resolve, reject) => {
    if (i < 0 || i >= fakePeople.length) {
      reject(new Error("Index out of range"));
    } else {
      const delay = Math.floor(Math.random() * 200) + 100;
      setTimeout(() => {
        resolve(fakePeople[i]);
        console.log(`Data ${i} received`);
      }, delay);
    }
  });
}

function getAllData() {
  return Promise.all([fakeAPICall(0), fakeAPICall(1), fakeAPICall(2)]);
}

const fakePeople = [
  { name: "Ivo", hasPets: false },
  { name: "Eva", hasPets: true },
  { name: "Marko", hasPets: true },
];

getAllData()
  .then((results) => {
    console.log(results);
  })
  .catch((error) => {
    console.error(error);
  });

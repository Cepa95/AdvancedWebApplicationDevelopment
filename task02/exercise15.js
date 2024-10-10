const promise = new Promise((_resolve, reject) => reject("Rejected"))

promise.catch((error) => console.log(error)); 
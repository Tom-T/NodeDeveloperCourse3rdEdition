const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a < 0 || b < 0) {
        return reject("Non negative numbers only.");
      }
      resolve(a + b);
    }, 2000);
  });
};

const doWork = async () => {
  const sum = await add(3, 97);
  const sum2 = await add(sum, 50);
  const sum3 = await add(sum2, -3);
  return sum3;
};

// console.log(doWork())

doWork()
  .then(result => {
    console.log("Result: ", result);
  })
  .catch(error => {
    console.log("e: ", error);
  });

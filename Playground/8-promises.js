const doWorkPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve([1, 4, 5])
    reject("Error, its all broken!");
  }, 2000);
});

doWorkPromise
  .then(result => {
    console.log("success", result);
  })
  .catch(error => {
    console.log("Error:", error);
  });

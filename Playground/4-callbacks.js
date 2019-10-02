// setTimeout(() => {
//   console.log("Two seconds are up");
// }, 2000);

// const names = ["one", "2two", "three"];
// const shortNames = names.filter((name) => name.length <= 4 );

// const geocode = (address, callback) => {
//   setTimeout(() => {
//     const data = {
//       latitude: 0,
//       logitude: 0
//     };
//     callback(data);
//   }, 2000);
// };

// geocode("Tampa", (data) => console.log(data.latitude + " " + data.logitude));




//Both work.

// const add = (x, y, callback) => {
//   setTimeout(() => {
//     callback(x + y);
//   }, 2000);
// };
const add = (x, y, callback) => {
  setTimeout(() => callback(x + y), 2000);
};

add(1, 4, (sum) => {
    console.log(sum) // Should print: 5
})

//Object shorthand.

const name = "Tom";
const userAge = 37;

const user = {
  name,
  age: userAge,
  location: "Sarasota"
};

console.log(user);

//Object destructuring

const product = {
  label: "Red Notebook",
  price: 3,
  stock: 201,
  salePrice: undefined
};

// const {label:productLabel = "nope", stock} = product
// console.log(productLabel);

const transaction = (type, {label:newLabel, stock}) => {
  console.log(newLabel, type, stock)
}

transaction("order", product)
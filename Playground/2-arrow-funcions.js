// const square = (x) => {return x*x}
// const test =()=>{return "Hi"}
// console.log(square(3))
// console.log(test())

// const square = (x) => x*x

// console.log(square(34))

const event = {
  name: "Penguin Party",
  guestList: ["One", "Two", "Three"],
  printGuestList() {
    console.log("Guest list for " + this.name);
    this.guestList.forEach(guest =>
      console.log(guest + "is going to " + this.name)
    );
  }
};

event.printGuestList();

const greeter = (name = "default", age) => {
  console.log("hello " + name + " " +age)
}

greeter("Tom")
greeter(undefined,4)

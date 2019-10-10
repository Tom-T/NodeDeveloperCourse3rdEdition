test("Hello world", () => {});

test("Failure", () => {throw new Error("This failed")})


const calculateTip = (total, tip) => {
  return total * (tip+1)
}

test("Should return total plus tip", () => {
  const total = calculateTip(10, .3)
  expect(total).toBe(13)

})
const fs = require('fs')
const input = fs.readFileSync('input.txt').toString().split("\r\n")

const part1 = () => {
  let fuelSum = 0;
  input.forEach(module => {
    fuelSum += Math.floor(module / 3) -2
  })
  return fuelSum
}

const part2 = () => {
  let fuelSum = 0
  input.forEach(module => {
    let moduleSum = 0;
    let current = module
    while(current > 0) {
      const newFuel = Math.floor(current / 3) -2;
      if(newFuel > 0) moduleSum += newFuel
      current = newFuel;
    }
    fuelSum += moduleSum;
  })
  return fuelSum;
}


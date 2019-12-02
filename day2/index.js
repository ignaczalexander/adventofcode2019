const fs = require('fs')

const part1 = (inputCode) => {
  const newInput = inputCode;
  for (let i = 0; i < newInput.length; i+=4) {
    const opcode = newInput[i]
    if(opcode == 99) break;
    if(opcode == 1 ) {
      newInput[newInput[i+3]] = newInput[newInput[i+1]] + newInput[newInput[i+2]]
    }
    if(opcode == 2 ) {
      newInput[newInput[i+3]] = newInput[newInput[i+1]] * newInput[newInput[i+2]]
    }
  }
  return newInput[0]
}
const part2 = () => {
  let result;
  const correctOutput = 19690720
  let noun = 0;
  let verb = 0;
  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      const newInput = fs.readFileSync('input.txt').toString().split(",").map(Number)
      newInput[1] = noun;
      newInput[2] = verb;
      const output = part1(newInput)
      if(output === correctOutput) {
        result = 100 * noun + verb;
        break;
      }
    }
  }
  return result;
}

console.log('part2', part2());
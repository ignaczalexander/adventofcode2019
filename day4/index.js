const range = [193651, 649729]

const isIncreasing = (number) => {
    let digitsIncrease = true
    const chars = number.toString().split('')
    for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
      if(i < chars.length - 1) {
        const nextChar = chars[i+1]
        if(char > nextChar) digitsIncrease = false
      }
    }
    return digitsIncrease
}
const isTwoAdjacentSame = number => {
  const chars = number.toString().split('')
  let isTwoAdjacentSame = false;
  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    if(i < chars.length - 1) {
      const nextChar = chars[i+1]
      if(char === nextChar) {
        isTwoAdjacentSame = true
        break
      }
  }
  return isTwoAdjacentSame
}
const notPartOfLargerGroup = number => {
  const chars = number.toString().split('')
  let currentSame = 1;
  let nrGroups = []
  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    if(i < chars.length - 1) {
      const nextChar = chars[i+1]
      if(char === nextChar) {
        currentSame++
      }
      else {
        nrGroups.push(currentSame)
        currentSame = 1
      }
    }
    if(i === chars.length -1) {
      if(char === chars[i-1]) {
        nrGroups.push(currentSame === 1 ? 2 : currentSame)
      }
      else {
        nrGroups.push(currentSame)
      }
    }
  }
  return nrGroups.filter(nr => nr!==1).some(nr => nr === 2)
}

const part1 = () => {
  let answer = 0
  for (let i = range[0]; i < range[1]+1; i++) {
    const element = i;
    if(isIncreasing(element) && isTwoAdjacentSame(element)) {
      answer++
    }
  }
  return answer
}
const part2 = () => {
  let answer = 0
  for (let i = range[0]; i < range[1]+1; i++) {
    const element = i;
    if(isIncreasing(element) && notPartOfLargerGroup(element)) {
      answer++
    }
  }
  return answer
}

console.log('part2', part2());
console.log('part1', part1());

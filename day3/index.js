const fs = require('fs')
const input = fs.readFileSync('input.txt').toString().split("\r\n")

const wire1 = input[0].split(',')
const wire2 = input[1].split(',')

const getCoords = (directions) => {
  let location = [0, 0]
  let path = []
  for (let i = 0; i < directions.length; i++) {
    const direction = directions[i];
    const dir = direction.charAt(0);
    const val = parseInt(direction.substr(1), 10);
    const newLoc = move(location, dir, val)
    path.push([newLoc[0], newLoc[1]])
    location = newLoc
  }
  path = connectCoords([[0,0],...path]);
  return path
}
const move = (currentLoc, dir, val) => {
  const newLoc = currentLoc;
  switch(dir) {
    case 'U':
      newLoc[1] = newLoc[1] + val
      break;
    case 'D':
      newLoc[1] = newLoc[1] - val
      break;
    case 'L':
      newLoc[0] = newLoc[0] - val
      break;
    case 'R':
      newLoc[0] = newLoc[0] + val
      break;
  }
  return newLoc
}
const connectCoords = (path) => {
  let connectedCords = [path[0]]
  for (let i = 0; i < path.length; i++) {
    const coord = path[i];
    const nextCoord = path[i+1]
    if(!nextCoord) break;
    if(coord[0] === nextCoord[0]){
      const diff = coord[1] - nextCoord[1];
      if(diff < 0) {
        for (let i = 1; i < Math.abs(diff); i++) {
          const toPush = [coord[0], coord[1]+i]
          connectedCords.push(toPush)
        }
        connectedCords.push(nextCoord)
      }
      if(diff > 0) {
        for (let i = 1; i <diff; i++) {
          const toPush = [coord[0], coord[1]-i]
          connectedCords.push(toPush)
        }
        connectedCords.push(nextCoord)
      }
    }
    if(coord[1] === nextCoord[1]){
      const diff = coord[0] - nextCoord[0];
      if(diff < 0) {
        for (let i = 1; i < Math.abs(diff); i++) {
            const toPush = [coord[0]+i, coord[1]]
            connectedCords.push(toPush)
          }
          connectedCords.push(nextCoord)
        }
      if(diff > 0) {
        for (let i = 1; i < diff; i++) {
          const toPush = [coord[0]-i, coord[1]]
          connectedCords.push(toPush)
        }
        connectedCords.push(nextCoord)
      }
    }
  }
    return connectedCords;
}
const getNrOfStepsToCoord = (steps, goal) => {
  let nrOfStepsToCoord = 0;
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    if(step[0] === goal[0] && step[1] === goal[1]) {
      break;
    }
    else {
      nrOfStepsToCoord++
    }
  }
  return nrOfStepsToCoord;
}
const part1 = () => {
const wire1Coords = getCoords(wire1)
const wire2Coords = getCoords(wire2)
const commonCoords = []
for (let i = 0; i < wire1Coords.length; i++) {
  const coord1 = wire1Coords[i];
  for (let j = 0; j < wire2Coords.length; j++) {
    const coord2 = wire2Coords[j];
    if(coord1[0] === coord2[0] && coord1[1] === coord2[1]) commonCoords.push(coord1)
  }
}
let answer = 0;
commonCoords.forEach(commonCoord => {
  const manhattan = Math.abs(commonCoord[0] - 0) + Math.abs(commonCoord[1] - 0)
  if(answer === 0 || manhattan < answer) answer = manhattan
})
return answer
}

const part2 = () => {
  const wire1Coords = getCoords(wire1)
  const wire2Coords = getCoords(wire2)
  let answer = 0
  const commonCoords = []
  for (let i = 0; i < wire1Coords.length; i++) {
    const coord1 = wire1Coords[i];
    for (let j = 0; j < wire2Coords.length; j++) {
      const coord2 = wire2Coords[j];
      if(coord1[0] === coord2[0] && coord1[1] === coord2[1]) commonCoords.push(coord1)
    }
  }
  commonCoords.forEach(commonCoord => {
    const wire1steps = getNrOfStepsToCoord(wire1Coords, commonCoord);
    const wire2steps = getNrOfStepsToCoord(wire2Coords, commonCoord);
    const combinedSteps = wire1steps + wire2steps
    if(answer === 0 || combinedSteps < answer) answer = combinedSteps
  })
  return answer;
}
console.log('part1', part1());
console.log('part2', part2());
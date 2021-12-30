//import { grid } from "./grid";

const grid = [
  [
    {
      row: 0,
      col: 0,
      fScore: Infinity,
      gScore: Infinity,
      hScore: Infinity,
    },
    {
      row: 0,
      col: 1,
      fScore: Infinity,
      gScore: Infinity,
      hScore: Infinity,
    },
    {
      row: 0,
      col: 2,
      fScore: Infinity,
      gScore: Infinity,
      hScore: Infinity,
    },
    {
      row: 0,
      col: 3,
      fScore: Infinity,
      gScore: Infinity,
      hScore: Infinity,
    },
  ],
  [
    {
      row: 1,
      col: 0,
      fScore: Infinity,
      Infinity,
      gScore: Infinity,
      hScore: Infinity,
    },
    {
      row: 1,
      col: 1,
      fScore: Infinity,
      gScore: Infinity,
      hScore: Infinity,
    },
    {
      row: 1,
      col: 2,
      fScore: Infinity,
      gScore: Infinity,
      hScore: Infinity,
    },
    {
      row: 1,
      col: 3,
      fScore: Infinity,
      gScore: Infinity,
      hScore: Infinity,
    },
  ],
  [
    {
      row: 2,
      col: 0,
      fScore: Infinity,
      gScore: Infinity,
      hScore: Infinity,
    },
    {
      row: 2,
      col: 1,
      fScore: Infinity,
      gScore: Infinity,
      hScore: Infinity,
    },
    {
      row: 2,
      col: 2,
      fScore: Infinity,
      gScore: Infinity,
      hScore: Infinity,
    },
    {
      row: 2,
      col: 3,
      fScore: Infinity,
      gScore: Infinity,
      hScore: Infinity,
    },
  ],
  [
    {
      row: 3,
      col: 0,
      fScore: Infinity,
      gScore: Infinity,
      hScore: Infinity,
    },
    {
      row: 3,
      col: 1,
      fScore: Infinity,
      gScore: Infinity,
      hScore: Infinity,
    },
    {
      row: 3,
      col: 2,
      fScore: Infinity,
      gScore: Infinity,
      hScore: Infinity,
    },
    {
      row: 3,
      col: 3,
      fScore: Infinity,
      gScore: Infinity,
      hScore: Infinity,
    },
  ],
];
const ROWS = 3;
const COLUMNS = 3;

console.log(grid[0][0].fScore);

function aStar(grid, start, end) {
  //initialize path
  let path = [grid[start[0]][start[1]]];

  //initialize openset
  let openSet = [grid[start[0]][start[1]]];

  //initialize comeFrom map
  let cameFrom = new Map();

  //set fScore, gScore, hScore of start to 0
  grid[start[0]][start[1]].hScore = 0;
  grid[start[0]][start[1]].gScore = 0;
  grid[start[0]][start[1]].fScore = 0;

  while (openSet.length != 0) {
    current = lowestFScore(openSet);

    if (current.row === end[0] && current.col === end[1]) {
      let text = "";
      cameFrom.forEach(function (value, key) {
        text += key + " = " + value + "________";
      });

      constructPath(cameFrom, end);

      console.log(
        `Reached End. Row: ${current.row} 
                      Col: ${current.row} 
                      ${cameFrom.size}
                      ${text}
                      ${cameFrom.has(30)}`
      );
    }

    removeElement(current, openSet);

    let neighbours = findNeighbours(current);

    //loop through all neighbours of the current node
    for (let i = 0; i < neighbours.length; i++) {
      let neighbour = neighbours[i];

      //add 1 each time to the g_score
      let gScore = current.gScore + 1;

      //path.push(neighbour);
      //compare gScore to the neigbour g_score
      if (gScore < neighbour.gScore) {
        cameFrom.set(
          //"R" + neighbour.row + "C" + neighbour.col,
          parseInt(neighbour.row + "" + neighbour.col),
          parseInt(current.row + "" + current.col)
        );

        neighbour.gScore = gScore;
        neighbour.fScore = gScore + findManhattanDistance(neighbour, end);
        if (!openSet.includes(neighbour)) {
          openSet.push(neighbour);
        }
      }
    }
  }
  return "omg";
}

function lowestFScore(openSet) {
  let max = openSet[0];

  for (let i = 0; i < openSet.length; i++) {
    if (openSet[i].fScore < max.fScore) {
      max = openSet[i];
    }
  }

  return max;
}

function removeElement(element, openSet) {
  let elementIndex;

  for (let i = 0; i < openSet.length; i++) {
    if (openSet[i].col == element.col && openSet[i].row == element.row) {
      elementIndex = i;
    }
  }

  return openSet.splice(elementIndex, 1);
}

function findNeighbours(element) {
  const row = element.row;
  const col = element.col;
  let neighbours = [];

  //top node
  if (row > 0) {
    neighbours.push(grid[row - 1][col]);
  }
  //bottom node
  if (row < ROWS) {
    neighbours.push(grid[row + 1][col]);
  }
  //left node
  if (col > 0) {
    neighbours.push(grid[row][col - 1]);
  }
  //right node
  if (col < COLUMNS) {
    neighbours.push(grid[row][col + 1]);
  }

  return neighbours;
}

function findManhattanDistance(element, end) {
  return Math.abs(element.row - end.row) + Math.abs(element.col - end.col);
}

aStar(grid, [0, 0], [2, 3]);
//findNeighbours(grid[0][0]);

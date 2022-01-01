//import { grid } from "./grid";

let grid = [
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

function aStar(board, start, end) {
  const startRow = start[0];
  const startCol = start[1];

  //initialize openset
  let openSet = [board[startRow][startCol]];

  //initialize cameFrom map
  let cameFrom = new Map();

  //set fScore, gScore, hScore of nodes
  board = board.map((row) =>
    row.map((node) => {
      node.gScore = Infinity;
      node.hScore = Infinity;
      node.fScore = Infinity;
      return node;
    })
  );

  //set fScore, gScore, hScore of start to 0
  board[startRow][startCol].hScore = 0;
  board[startRow][startCol].gScore = 0;
  board[startRow][startCol].fScore = 0;

  while (openSet.length != 0) {
    current = lowestFScore(openSet);

    //current node is the end node
    if (current.row === end[0] && current.col === end[1]) {
      const startNode = board[startRow][startCol];
      const endNode = board[end[0]][end[1]];
      let path = findPath(cameFrom, startNode, endNode);
      console.log(startNode);
      console.log(endNode);
      console.log(cameFrom.has(grid[3][3]));
      console.log("cameFrom");
      console.log(cameFrom);
      console.log("path");
      console.log(path);
    }

    removeElement(current, openSet);

    let neighbours = findNeighbours(current, ROWS, COLUMNS);
    //loop through all neighbours of the current node
    for (let i = 0; i < neighbours.length; i++) {
      let neighbour = neighbours[i];

      //add 1 each time to the g_score
      let gScore = current.gScore + 1;

      if (gScore < neighbour.gScore) {
        //cameFrom.set(neighbour, current);
        cameFrom.set(neighbour, current);

        neighbour.gScore = gScore;
        neighbour.hScore = findManhattanDistance(neighbour, end);
        neighbour.fScore = gScore + neighbour.hScore;
        if (!openSet.includes(neighbour)) {
          openSet.push(neighbour);
        }
      }
    }
  }
  return false;
}

function findPath(nodes, start, end) {
  console.log(nodes.has(start));
  console.log(nodes.has(end));
  let current = end;
  let path = [end];
  while (current !== start) {
    previousNode = nodes.get(current);
    path.unshift(previousNode);
    current = previousNode;
  }
  return path;
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

function findNeighbours(node, rows, cols) {
  const nodeRow = node.row;
  const nodeCol = node.col;
  let neighbours = [];

  //left node
  if (nodeCol > 0) {
    neighbours.push(grid[nodeRow][nodeCol - 1]);
  }
  //right node
  if (nodeCol < cols) {
    neighbours.push(grid[nodeRow][nodeCol + 1]);
  }
  //top node
  if (nodeRow > 0) {
    neighbours.push(grid[nodeRow - 1][nodeCol]);
  }
  //bottom node
  if (nodeRow < rows) {
    neighbours.push(grid[nodeRow + 1][nodeCol]);
  }

  return neighbours;
}

function findManhattanDistance(element, end) {
  return Math.abs(element.row - end[0]) + Math.abs(element.col - end[1]);
}

aStar(grid, [0, 0], [2, 2]);
//findNeighbours(grid[0][0]);

function hello(random) {
  console.log(random);
  random = "bye";
  console.log(random);
}

// hello("hello");
//DELETE LATER
// let text = "";
//       cameFrom.forEach(function (value, key) {
//         text += key + " = " + value + "________";
//       });

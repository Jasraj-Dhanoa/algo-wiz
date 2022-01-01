//board: [nodes]
//start, end: node
//rows, cols: nat

function aStar(board, start, end, rows, cols) {
  let openSet = [board[start.row][start.col]];
  let cameFrom = new Map();
  let nodesVisited = [];

  board = board.map((row) =>
    row.map((node) => {
      node.gScore = Infinity;
      node.fScore = Infinity;
      return node;
    })
  );

  board[start.row][start.col].gScore = 0;
  board[start.row][start.col].fScore = 0;

  while (openSet.length !== 0) {
    let current = lowestFScore(openSet);

    if (current.row === end.row && current.col === end.col) {
      const startNode = board[start.row][start.col];
      const endNode = board[end.row][end.col];
      const path = findPath(cameFrom, startNode, endNode);
      return [path, nodesVisited];
    }

    removeElement(current, openSet);
    let neighbours = findNeighbours(board, current, rows, cols);

    for (let i = 0; i < neighbours.length; i++) {
      let neighbour = neighbours[i];
      if (!neighbour.isWall) {
        let gScore = current.gScore + 1;

        if (gScore < neighbour.gScore) {
          nodesVisited.push(neighbour);
          cameFrom.set(neighbour, current);
          neighbour.gScore = gScore;
          neighbour.fScore = gScore + findManhattanDistance(neighbour, end);
          if (!openSet.includes(neighbour)) {
            openSet.push(neighbour);
          }
        }
      }
    }
  }
  return [false, nodesVisited];
}

function findManhattanDistance(element, end) {
  return Math.abs(element.row - end.row) + Math.abs(element.col - end.col);
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
    if (openSet[i].col === element.col && openSet[i].row === element.row) {
      elementIndex = i;
    }
  }
  return openSet.splice(elementIndex, 1);
}

function findNeighbours(board, node, rows, cols) {
  const nodeRow = node.row;
  const nodeCol = node.col;
  let neighbours = [];

  //left node
  if (nodeCol > 0) {
    neighbours.push(board[nodeRow][nodeCol - 1]);
  }
  //right node
  if (nodeCol < cols) {
    neighbours.push(board[nodeRow][nodeCol + 1]);
  }
  //top node
  if (nodeRow > 0) {
    neighbours.push(board[nodeRow - 1][nodeCol]);
  }
  //bottom node
  if (nodeRow < rows) {
    neighbours.push(board[nodeRow + 1][nodeCol]);
  }
  return neighbours;
}

function findPath(nodes, start, end) {
  console.log("end");
  console.log(start, end);
  let current = end;
  let path = [end];
  while (current !== start) {
    let previousNode = nodes.get(current);
    path.unshift(previousNode);
    current = previousNode;
  }
  return path;
}

export default aStar;

// function findNodesVisited(nodes, start, end) {
//   let nodesVisited = [start];
//   let current = start;
//   console.log(current);
//   while (current !== end) {
//     let node = nodes.get(current);
//     nodesVisited.push(node);
//     current = node;
//   }}

// let grid = [
//   [
//     {
//       row: 0,
//       col: 0,
//       fScore: Infinity,
//       gScore: Infinity,
//       hScore: Infinity,
//     },
//     {
//       row: 0,
//       col: 1,
//       fScore: Infinity,
//       gScore: Infinity,
//       hScore: Infinity,
//     },
//     {
//       row: 0,
//       col: 2,
//       fScore: Infinity,
//       gScore: Infinity,
//       hScore: Infinity,
//     },
//     {
//       row: 0,
//       col: 3,
//       fScore: Infinity,
//       gScore: Infinity,
//       hScore: Infinity,
//     },
//   ],
//   [
//     {
//       row: 1,
//       col: 0,
//       fScore: Infinity,
//       gScore: Infinity,
//       hScore: Infinity,
//     },
//     {
//       row: 1,
//       col: 1,
//       fScore: Infinity,
//       gScore: Infinity,
//       hScore: Infinity,
//     },
//     {
//       row: 1,
//       col: 2,
//       fScore: Infinity,
//       gScore: Infinity,
//       hScore: Infinity,
//     },
//     {
//       row: 1,
//       col: 3,
//       fScore: Infinity,
//       gScore: Infinity,
//       hScore: Infinity,
//     },
//   ],
//   [
//     {
//       row: 2,
//       col: 0,
//       fScore: Infinity,
//       gScore: Infinity,
//       hScore: Infinity,
//     },
//     {
//       row: 2,
//       col: 1,
//       fScore: Infinity,
//       gScore: Infinity,
//       hScore: Infinity,
//     },
//     {
//       row: 2,
//       col: 2,
//       fScore: Infinity,
//       gScore: Infinity,
//       hScore: Infinity,
//     },
//     {
//       row: 2,
//       col: 3,
//       fScore: Infinity,
//       gScore: Infinity,
//       hScore: Infinity,
//     },
//   ],
//   [
//     {
//       row: 3,
//       col: 0,
//       fScore: Infinity,
//       gScore: Infinity,
//       hScore: Infinity,
//     },
//     {
//       row: 3,
//       col: 1,
//       fScore: Infinity,
//       gScore: Infinity,
//       hScore: Infinity,
//     },
//     {
//       row: 3,
//       col: 2,
//       fScore: Infinity,
//       gScore: Infinity,
//       hScore: Infinity,
//     },
//     {
//       row: 3,
//       col: 3,
//       fScore: Infinity,
//       gScore: Infinity,
//       hScore: Infinity,
//     },
//   ],
// ];

// const rMap = aStar(
//   grid,
//   {
//     row: 0,
//     col: 0,
//     fScore: Infinity,
//     gScore: Infinity,
//     hScore: Infinity,
//   },
//   {
//     row: 3,
//     col: 3,
//     fScore: Infinity,
//     gScore: Infinity,
//     hScore: Infinity,
//   },
//   3,
//   3
// );

// grid_2 = [
//   [
//     {
//       row: 0,
//       col: 0,
//       isVisited: false,
//       isStart: true,
//       isEnd: false,
//       isWall: false,
//     },
//     {
//       row: 0,
//       col: 1,
//       isVisited: false,
//       isStart: false,
//       isEnd: false,
//       isWall: false,
//     },
//     {
//       row: 0,
//       col: 2,
//       isVisited: false,
//       isStart: false,
//       isEnd: false,
//       isWall: false,
//     },
//     {
//       row: 0,
//       col: 3,
//       isVisited: false,
//       isStart: false,
//       isEnd: false,
//       isWall: true,
//     },
//   ],
//   [
//     {
//       row: 1,
//       col: 0,
//       isVisited: false,
//       isStart: false,
//       isEnd: false,
//       isWall: false,
//     },
//     {
//       row: 1,
//       col: 1,
//       isVisited: false,
//       isStart: false,
//       isEnd: false,
//       isWall: false,
//     },
//     {
//       row: 1,
//       col: 2,
//       isVisited: false,
//       isStart: false,
//       isEnd: false,
//       isWall: false,
//     },
//     {
//       row: 1,
//       col: 3,
//       isVisited: false,
//       isStart: false,
//       isEnd: false,
//       isWall: false,
//     },
//   ],
//   [
//     {
//       row: 2,
//       col: 0,
//       isVisited: false,
//       isStart: false,
//       isEnd: false,
//       isWall: false,
//     },
//     {
//       row: 2,
//       col: 1,
//       isVisited: false,
//       isStart: false,
//       isEnd: false,
//       isWall: false,
//     },
//     {
//       row: 2,
//       col: 2,
//       isVisited: false,
//       isStart: false,
//       isEnd: false,
//       isWall: false,
//     },
//     {
//       row: 2,
//       col: 3,
//       isVisited: false,
//       isStart: false,
//       isEnd: false,
//       isWall: false,
//     },
//   ],
//   [
//     {
//       row: 3,
//       col: 0,
//       isVisited: false,
//       isStart: false,
//       isEnd: false,
//       isWall: false,
//     },
//     {
//       row: 3,
//       col: 1,
//       isVisited: false,
//       isStart: false,
//       isEnd: false,
//       isWall: false,
//     },
//     {
//       row: 3,
//       col: 2,
//       isVisited: false,
//       isStart: false,
//       isEnd: false,
//       isWall: false,
//     },
//     {
//       row: 3,
//       col: 3,
//       isVisited: false,
//       isStart: false,
//       isEnd: true,
//       isWall: false,
//     },
//   ],
// ];

// aStar(
//   grid_2,
//   {
//     row: 0,
//     col: 0,
//     isVisited: false,
//     isStart: true,
//     isEnd: false,
//     isWall: false,
//   },
//   {
//     row: 3,
//     col: 3,
//     isVisited: false,
//     isStart: true,
//     isEnd: false,
//     isWall: false,
//   },
//   3,
//   3
// );

// findNodesVisited(
//   rMap,
//   { row: 0, col: 0, fScore: 0, gScore: 0, hScore: Infinity },
//   { row: 3, col: 3, fScore: 6, gScore: 6, hScore: Infinity }
// );

// aStar(
//   grid_2,
//   {
//     row: 0,
//     col: 0,
//     isVisited: false,
//     isStart: true,
//     isEnd: false,
//     gScore: 0,
//     fScore: 0,
//   },
//   {
//     row: 13,
//     col: 13,
//     isVisited: false,
//     isStart: true,
//     isEnd: false,
//     gScore: 0,
//     fScore: 0,
//   },
//   14,
//   14
// );
//board, start, end, rows, cols;

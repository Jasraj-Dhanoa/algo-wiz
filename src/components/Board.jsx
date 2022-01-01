import React, { Component } from "react";
import Node from "./Node";
import "./styles/board.css";
import aStar from "../algorithms/astar";

const END = [4, 19];

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
    };
    this.visualizePath = this.visualizePath.bind(this);
    this.makeNodeWall = this.makeNodeWall.bind(this);
  }

  makeNodeWall(row, col, wall) {
    const node = this.state.board[row][col];
    this.setNodeState(node, "isWall", !wall);
  }

  componentDidMount() {
    const createdBoard = createGrid(
      this.props.rows,
      this.props.cols,
      [0, 0],
      END
    );
    console.log(createdBoard);
    this.setState({ board: createdBoard });
  }

  visualizePath() {
    const { board } = this.state;
    const startNode = board[0][0];
    const endNode = board[END[0]][END[1]];
    const [path, nodesVisited] = aStar(
      board,
      startNode,
      endNode,
      this.props.rows - 1,
      this.props.cols - 1
    );
    console.log(path);
    if (path) {
      nodesVisited.forEach((node, i) => {
        setTimeout(() => {
          this.setNodeState(node, "isExplored", true);
          if (i === path.length) {
            path.forEach((node, i) => {
              setTimeout(() => {
                this.setNodeState(node, "isVisited", true);
              }, i * 150);
            });
          }
        }, i * 50);
      });
    } else {
      nodesVisited.forEach((node, i) => {
        setTimeout(() => {
          this.setNodeState(node, "isExplored", true);
        }, i * 50);
      });
      console.log("path could not be found");
    }
  }

  setNodeState(node, property, status) {
    let board = [...this.state.board];
    let updateNode = { ...board[node.row][node.col] };
    updateNode[property] = status;
    board[node.row][node.col] = updateNode;
    this.setState({ board: board });
  }

  render() {
    const board = this.state.board;
    const nodes = board.map((row, index) => (
      <div key={index} className="boardRow">
        {row.map((node) => {
          const { row, col, isVisited, isStart, isEnd, isWall, isExplored } =
            node;
          return (
            <Node
              key={row + "" + col}
              row={row}
              col={col}
              isVisited={isVisited}
              isStart={isStart}
              isEnd={isEnd}
              isWall={isWall}
              isExplored={isExplored}
              changeWall={this.makeNodeWall}
            />
          );
        })}
      </div>
    ));

    return (
      <div>
        <h1>Hello World!</h1>
        <h1>Cols: {this.props.cols}</h1>
        <h1>Rows: {this.props.rows}</h1>
        <div>{nodes}</div>
        <button className="visualizeBtn" onClick={this.visualizePath}>
          Visualize
        </button>
      </div>
    );
  }
}

function createGrid(rows, cols, start, end) {
  let board = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      let node = {
        row: i,
        col: j,
        isVisited: false,
        isStart: i === start[0] && j === start[1] ? true : false,
        isEnd: i === end[0] && j === end[1] ? true : false,
        isWall: Math.random() <= 0.25 ? true : false,
        isExplored: false,
      };
      row.push(node);
    }
    board.push(row);
  }
  board[end[0]][end[1]].isWall = false;
  board[start[0]][start[1]].isWall = false;
  return board;
}

export default Board;

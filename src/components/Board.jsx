import React, { Component } from "react";
import Node from "./Node";
import "./styles/board.css";

const START = [0, 0];
const END = [9, 9];

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
    };
  }

  componentDidMount() {
    const createdBoard = createGrid(this.props.rows, this.props.cols);
    console.log(createdBoard);
    this.setState({ board: createdBoard });
  }

  render() {
    const board = this.state.board;
    const nodes = board.map((row, index) => (
      <div key={index} className="boardRow">
        {row.map((node) => {
          const { row, col, isVisited, isStart, isEnd } = node;
          return (
            <Node
              key={row + "" + col}
              row={row}
              col={col}
              isVisited={isVisited}
              isStart={isStart}
              isEnd={isEnd}
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
      </div>
    );
  }
}

function createGrid(rows, cols) {
  let board = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      let node = {
        row: i,
        col: j,
        isVisited: false,
        isStart: i === START[0] && j === START[1] ? true : false,
        isEnd: i === END[0] && j === END[1] ? true : false,
      };
      row.push(node);
    }
    board.push(row);
  }
  return board;
}

export default Board;

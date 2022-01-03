import React, { Component } from "react";
import Node from "./Node";
import "./styles/board.css";
import aStar from "../algorithms/astar";
import Button from "react-bootstrap/Button";
import { Container, Nav, Row, Col } from "react-bootstrap";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      visualizeRunning: false,
    };
    this.visualizePath = this.visualizePath.bind(this);
    this.makeNodeWall = this.makeNodeWall.bind(this);
    this.clearPath = this.clearPath.bind(this);
  }

  componentDidMount() {
    const { rows, cols } = this.props;

    const createdBoard = createGrid(rows, cols, [0, 0], [rows - 1, cols - 1]);
    console.log(createdBoard);
    this.setState({ board: createdBoard });
  }

  visualizePath() {
    this.setState({ visualizeRunning: true });
    const { board } = this.state;
    const { speed } = this.props;
    console.log(speed);
    const startNode = board[0][0];
    const endNode = board[this.props.rows - 1][this.props.cols - 1];
    const [path, nodesVisited] = aStar(
      board,
      startNode,
      endNode,
      this.props.rows - 1,
      this.props.cols - 1
    );
    console.log(path);
    this.clearPath("isExplored");
    this.clearPath("isVisited");
    if (path) {
      nodesVisited.forEach((node, i) => {
        setTimeout(() => {
          this.setNodeState(node, "isExplored", true);
          if (i === nodesVisited.length - 1) {
            path.forEach((node, i) => {
              setTimeout(() => {
                this.setNodeState(node, "isVisited", true);
                if (i === path.length - 1) {
                  this.setState({ visualizeRunning: false });
                }
              }, i * 80);
            });
          }
        }, i * 60);
      });
    } else {
      nodesVisited.forEach((node, i) => {
        setTimeout(() => {
          this.setNodeState(node, "isExplored", true);
          if (i === nodesVisited.length - 1) {
            window.alert("No Path Could Be Found! Try with Another Grid.");
            this.setState({ visualizeRunning: false });
          }
        }, i * 60);
      });
    }
  }

  setNodeState(node, property, status) {
    let board = [...this.state.board];
    let updateNode = { ...board[node.row][node.col] };
    updateNode[property] = status;
    board[node.row][node.col] = updateNode;
    this.setState({ board: board });
  }

  clearPath(property) {
    let board = [...this.state.board];
    board = board.map((row) => {
      row.map((node) => {
        node[property] = false;
        return node;
      });
      return row;
    });
    this.setState({ board: board });
    console.log("BOARD");
    console.log(board);
  }

  makeNodeWall(row, col, wall) {
    const node = this.state.board[row][col];
    this.setNodeState(node, "isWall", !wall);
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
        <Nav defaultActiveKey="/home" as="ul" id="navbar">
          <Container>
            <Row>
              <Col xs={8}>
                <Nav.Item as="li">
                  <h3 id="title">A-Star Pathfinding Visualizer</h3>
                </Nav.Item>
              </Col>
              <Col>
                <Nav.Item as="li">
                  <Button
                    id="button"
                    variant="primary"
                    onClick={() => {
                      window.location.reload();
                    }}
                  >
                    New Grid
                  </Button>
                </Nav.Item>
              </Col>
              <Col>
                <Nav.Item as="li">
                  <Button
                    id="button"
                    variant="primary"
                    onClick={
                      this.state.visualizeRunning
                        ? null
                        : () => {
                            this.clearPath("isExplored");
                            this.clearPath("isVisited");
                            this.clearPath("isWall");
                          }
                    }
                  >
                    Clear Walls
                  </Button>
                </Nav.Item>
              </Col>
              <Col>
                <Nav.Item as="li">
                  <Button
                    id="button-main"
                    variant="primary"
                    onClick={
                      this.state.visualizeRunning ? null : this.visualizePath
                    }
                  >
                    Visualize
                  </Button>
                </Nav.Item>
              </Col>
            </Row>
          </Container>
        </Nav>
        <div id="board">
          <div>{nodes}</div>
        </div>
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

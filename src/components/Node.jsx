import React from "react";
import "./styles/node.css";

function Node(props) {
  const {
    row,
    col,
    isVisited,
    isStart,
    isEnd,
    isWall,
    isExplored,
    changeWall,
  } = props;

  const status = isVisited
    ? "visited"
    : isEnd
    ? "end"
    : isStart
    ? "start"
    : isExplored
    ? "explored"
    : isWall
    ? "wall"
    : "";

  return (
    <div
      className={"node " + status}
      onMouseDown={
        isWall || status === ""
          ? () => changeWall(row, col, isWall ? true : false)
          : null
      }
    ></div>
  );
}

export default Node;

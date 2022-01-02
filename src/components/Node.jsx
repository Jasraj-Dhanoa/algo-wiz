import React from "react";
import "./styles/node.css";

function Node(props) {
  return props.isVisited ? (
    <div className="node visited">Visited</div>
  ) : props.isEnd ? (
    <div className="node" id="end">
      End
    </div>
  ) : props.isExplored ? (
    <div className="node explored">Explored</div>
  ) : props.isWall ? (
    <div
      className="node wall"
      onMouseDown={() => props.changeWall(props.row, props.col, true)}
    >
      Wall
    </div>
  ) : props.isStart ? (
    <div className="node" id="start">
      Start
    </div>
  ) : (
    <div
      onMouseDown={() => props.changeWall(props.row, props.col, false)}
      className="node"
    >
      Node
    </div>
  );
}

//isExplored

export default Node;

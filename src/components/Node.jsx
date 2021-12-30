import React from "react";
import "./styles/node.css";

function Node(props) {
  return props.isStart ? (
    <div className="node" id="start">
      Start
    </div>
  ) : props.isEnd ? (
    <div className="node" id="end">
      End
    </div>
  ) : (
    <div className="node">Node</div>
  );
}

export default Node;

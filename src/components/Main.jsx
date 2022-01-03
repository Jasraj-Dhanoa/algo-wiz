import React from "react";
import Board from "./Board";
import "bootstrap/dist/css/bootstrap.min.css";

function Main() {
  return (
    <div>
      <Board rows="12" cols="27" />
    </div>
  );
}

export default Main;

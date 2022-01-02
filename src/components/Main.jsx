import React from "react";
import Board from "./Board";
import Form from "./Form";

function Main() {
  return (
    <div>
      <Form />;
      <Board rows="8" cols="20" />
    </div>
  );
}

export default Main;

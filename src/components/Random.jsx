import React, { Component } from "react";

// const Random = (props) => {
//   return <h1>Rows: {props.row}</h1>;
// };

class Random extends Component {
  //   constructor(props) {
  //     super(props);
  //   }

  render() {
    return <h1>{this.props.row}</h1>;
  }
}

export default Random;

// export default Random;

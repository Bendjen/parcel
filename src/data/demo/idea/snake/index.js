import React from "react";
import style from "./index.scss";
import Rx from "rxjs/Rx";
import init from "./code/main";

class Snake extends React.Component {
  componentDidMount() {
    init();
  }
  render() {
    return <div className={style.container} id="container" />;
  }
}

export default Snake;

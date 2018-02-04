import React from "react";
import style from "./index.scss";
import Nav from "../nav";

const Header = () => (
  <header className={style.header} data-flex="cross:center">
    <div className={style.container} data-flex="main:justify cross:center">
      <div data-flex="cross:center">
        <i className="iconfont icon-kafeidou" />
        <span>Bendjen</span>
      </div>
      <Nav />
    </div>
  </header>
);

export default Header;

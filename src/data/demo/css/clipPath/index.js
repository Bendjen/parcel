import React from "react";
import style from "./index.scss";
import { Link } from "react-router-dom";


const clipPath = () => (
  <div data-flex='main:center'>
    <div className={style.flower}></div>
    {/* <svg x="0px" y="0px" width="1000px" height="1000px" viewBox="0 0 100 100">
      <image
        overflow="visible"
        width="100%"
        height="100%"
        xlinkHref={svg}
        transform="matrix(0.1004 0 0 0.1729 4.882813e-004 -0.0044)"
      />
    </svg> */}
  </div>
);

export default clipPath;

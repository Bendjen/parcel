import React from "react";
import { Link } from "react-router-dom";
// import QueueAnim from "rc-queue-anim";
import style from "./index.scss";
import QueueAnim from "rc-queue-anim";

class About extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={style.container}>
        <QueueAnim
          type={["bottom", "top"]}
          ease={["easeOutQuart", "easeInOutQuart"]}
        >
          <section key="aboutMe">
            <h1 className={style.title}>关于我</h1>
            <div className={style.content}>
              <p>
                <i className="iconfont icon-qq" />
                <span>122760248</span>
              </p>
              <p>
                <i className="iconfont icon-weixin" />
                <span>unbolibobo</span>
              </p>
              <p>
                <i className="iconfont icon-github" />
                <span>https://github.com/Bendjen</span>
              </p>
              <p>
                <i className="iconfont icon-email" />
                <span>unbolibobo@foxmail.com</span>
              </p>
            </div>
          </section>
          <section key="aboutSite">
            <h1 className={style.title}>关于本站</h1>
            <div className={style.content}>
              <div>
                历史版本：
                <a target="_blank" href="https://bendjen.github.io/parcel-old/">
                  https://bendjen.github.io/parcel-old/
                </a>
              </div>
              <div>所用架构： react、react-router、parcel</div>

              <div>
                相比旧版：
                <ol>
                  <li>
                    弃用了Redux、Webpack，重新设计了界面，由内至外轻量化。
                  </li>
                  <li>
                    结构优化，由原来的 n(data) -> 1(store) -> n(component) ->
                    n(view) 转为 n(data) ->1
                    (view)；大大降低了后续维护的复杂度。
                  </li>
                  <li>
                    直接将demo注入页面（所有收录的代码都必须要真正实践过），同时增强了页面的生动性。
                  </li>
                  <li>
                    不过旧版是针对移动端和PC端设计了两版布局来自适应，新版只适配了PC端（同时适配两端调试的时候太花时间了）。
                  </li>
                </ol>
              </div>

              <div>
                其他：
                本页用于收录在各开源网站上有趣的小玩意或自己工作中整理的内容，有任何无意侵犯到您权益的部分请联系我进行删除。
              </div>
            </div>
          </section>
        </QueueAnim>
      </div>
    );
  }
}

export default About;

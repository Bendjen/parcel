import React from "react";
import style from "./index.scss";
import { Link } from "react-router-dom";
import Search from "../search";

class Nav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			navList: [
				{ name: "JavaScript", link: "/home/javaScript" },
				{ name: "Css", link: "/home/css" },
				{ name: "Idea", link: "/home/idea" },
				{ name: "Mark", link: "/mark" },
				{ name: "About", link: "/about" }
			],
			curIndex: 3
		};
	}
	handleClick (e) {
		this.setState({
			curIndex: e.target.getAttribute("data-index")
		});
	}
	render () {
		return (
			<nav className={style.container} data-flex="cross:center">
				{this.state.navList.map((item, index) => {
					return (
						<Link
							to={item.link}
							key={index}
							onClick={this.handleClick.bind(this)}
							className={style.item}
						>
							<span
								data-index={index}
								className={
									index == this.state.curIndex ? style.active : style.disActive
								}
							>
								{item.name}
							</span>
						</Link>
					);
				})}
				<Search />
			</nav>
		);
	}
}

export default Nav;

import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { Header, Body } from "./layout";

import Home from "./page/home";
import Detail from "./page/detail";
import About from "./page/about";
import Mark from "./page/mark";

const Main = () => (
	<Body>
		<Switch>
			<Route exact path="/" component={Mark} />
			<Route exact path="/home/:type" component={Home} />
			<Route exact path="/detail/:type/:id" component={Detail} />
			<Route exact path="/mark" component={Mark} />
			<Route exact path="/about" component={About} />
		</Switch>
	</Body>
);

const App = () => (
	<HashRouter>
		<div>
			<Header />
			<Main />
		</div>
	</HashRouter>
);

export default App;

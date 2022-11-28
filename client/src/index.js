import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import 'antd/dist/antd.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import TestPage from './pages/TestPage';
import GrowPage from './pages/GrowPage';
//Switch ensures that only one route is active ay any given time 
//Otherwise, it would match both '/' and '/test' when you type in
//'/test' because it starts with a '/'
//'exact' makes sure it matches exactly. Otherwise, '/test' would 
//get a hit at '/' and just show homepage
ReactDOM.render(
	<div>
		<Router>

			<Switch>
				<Route exact
					path="/"
					render={() => (
						<HomePage />
					)} />
				<Route exact
					path="/test"
					render={() => (
						<TestPage />
					)} />
				<Route exact
					path="/grow"
					render={() => (
						<GrowPage />
					)} />
			</Switch>
		</Router>
	</div>,
	document.getElementById('root')
);


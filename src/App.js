import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './pages';

const App = () => {
	return (
		<div className="northone">
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={LandingPage} />
				</Switch>
			</BrowserRouter>
		</div>
	)
}
export default App;

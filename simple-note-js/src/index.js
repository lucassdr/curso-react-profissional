import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import About from './components/About'
import App from './components/App'
import './style/index.scss'

ReactDOM.render(
	<Router>
		<React.Fragment>
			<Route path={'/'} exact component={App} />
			<Route path={'/about'} exact component={About} />
		</React.Fragment>
	</Router>,
	document.getElementById('root')
)

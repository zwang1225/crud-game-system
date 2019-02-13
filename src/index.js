import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import GamesPage from './components/gamesPage';
import GameForm from './components/gameForm';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(logger, thunk)
    )
    );

ReactDOM.render(
<Provider store={ store }>
    <Router>
        <div className='ui container'>
            <div className='ui three item menu'>
                <NavLink exact activeClassName="active" className="item" to='/' >home</NavLink>
                <NavLink exact activeClassName="active" className="item" to='/api/games' >games</NavLink>
                <NavLink activeClassName="active" className="item" to='/games/new' >add new game</NavLink>
            </div>
            <Route exact path='/' component={ App } />
            <Route exact path='/api/games' component={ GamesPage } /> 
            <Route path='/games/new' component={ GameForm } /> 
        </div>
    </Router>
</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

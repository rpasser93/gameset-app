import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import promise from 'redux-promise';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import rootReducer from './reducers/reducer-root';

import Navigation from './components/navigation.js';
import Login from './components/login.js';
import Roster from './components/roster.js';
import Lineup from './components/lineup.js';
import LineupField from './components/lineup-field.js';
import Settings from './components/settings.js';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const App = () => {
  return (
    <div className="container-fluid app-container">

      <div>
        <Navigation />
      </div>

      <div>
        <Switch>
        <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/roster/:id" component={Roster} />
          <Route exact path="/lineup/:id" component={Lineup} />
          <Route exact path="/lineup-field/:id" component={LineupField} />
          <Route exact path="/settings/:id" component={Settings} />
        </Switch>
      </div>
    </div>
  )
}

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(rootReducer)}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

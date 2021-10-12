import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import promise from 'redux-promise';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import rootReducer from './reducers/reducer-root';

import Navbar from './components/navbar.js';
import Login from './components/login.js';
import Roster from './components/roster.js';
import Lineup from './components/lineup.js';
import LineupField from './components/lineup-field.js';
import Settings from './components/settings.js';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const App = () => {
  return (
    <div className="container">

      <div>
        <Navbar />
      </div>

      <div>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/roster" component={Roster} />
          <Route exact path="/lineup" component={Lineup} />
          <Route exact path="/lineup-field" component={LineupField} />
          <Route exact path="/settings" component={Settings} />
        </Switch>
      </div>
    </div>
  )
}

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={createStoreWithMiddleware(rootReducer)}>
        <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import promise from 'redux-promise';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import rootReducer from './reducers/reducer-root';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const App = () => {
  return (
    <h1>TEST</h1>
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

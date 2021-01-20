import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import Home from "./containers/Home/Home";
import _store from "./_store";
import socket from './socket';

socket()

ReactDOM.render(
    <Provider store={_store}>
        <Home />
    </Provider>,
  document.getElementById('root')
);


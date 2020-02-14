import React from 'react';
import './App.scss';

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import Main from "./containers/Main"

function App() {
  return (
    <Router className="app">
      <Route path="/" component={Main} />
    </Router>
  );
}

export default App;

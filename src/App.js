import React, { Component } from "react";
import Main from './components/pages/Main'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <Route path='/:paused?:year?' component={Main} />
      </Router>
    );
  }
}

export default App;

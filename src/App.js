import React from 'react';
import Details from './components/Details'
import logo from './logo.svg';
import './App.css';
import LeftDrawer from "./components/LeftDrawer";

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";


function App() {

  return (
    <div className="App">
        <Router>
            <Switch>
                <Route path="/" exact>
                    <LeftDrawer/>
                </Route>
                <Route path="/detail">
                    <Details/>
                </Route>
            </Switch>
        </Router>
    </div>
  );
}

export default App;

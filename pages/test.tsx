import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/about">
            <h2>About</h2>
          </Route>
          <Route path="/">
            <h2>Home</h2>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

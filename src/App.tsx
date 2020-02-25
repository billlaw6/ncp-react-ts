import React, { ReactElement } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./App.css";

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route
          render={(): ReactElement => (
            <div>Error</div>
          )}
        ></Route>
      </Switch>
    </Router>
  );
}

export default App;

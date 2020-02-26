import React, { ReactElement } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import routes from "./routes/index";
import "./App.css";
import RouteWithSubRoutes from "./components/RouteWithSubRoutes";

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        {routes.map((item, index) => {
          return <RouteWithSubRoutes key={item.name} {...item} />
        })}
        <Route
          render={(): ReactElement => (
            <div>Basic1</div>
          )}
        ></Route>
      </Switch>
    </Router>
  );
}

export default App;

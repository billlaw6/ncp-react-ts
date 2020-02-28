import React, { ReactElement } from "react";
import { Router, Switch, Route } from "react-router-dom";
import routes from "./routes/index";
import "./App.css";
import RouteWithSubRoutes from "./components/RouteWithSubRoutes";
import { history } from "./store/configureStore";

// 必须用同一个history
// const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        {routes.map((item, index) => {
          return <RouteWithSubRoutes key={item.name} {...item} />
        })}
        <Route
          render={(): ReactElement => (
            <div>Error Page</div>
          )}
        ></Route>
      </Switch>
    </Router>
  );
}

export default App;

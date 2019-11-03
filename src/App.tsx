import React from "react";
import "./App.css";
import Registration from "./components/Registration";
import UserManagement from "./components/UserManagement";
import InMemoryStore from "./controllers/InMemoryStore";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";

export default class App extends React.Component {
  state = {
    store: InMemoryStore.getStorage(),
    registration: true
  };

  render() {
    return (
      <Router>
        <div>
          <div className="App">
            <header className="App-header">
              <img
                className="logo"
                alt="Flok logo"
                src={require("./assets/flok_5.png")}
              />

              <span>
                <span className="header-link">
                  <Link to="/registration">Registratsioon</Link>
                </span>
                <span className="header-link">
                  <Link to="/user-management">Kasutajahaldus</Link>
                </span>
              </span>
            </header>
            <Switch>
              <Route exact path="/registration">
                <div className="container-form">
                  <Registration store={this.state.store} />
                </div>
              </Route>
              <Route exact path="/user-management">
                <div className="container-table">
                  <UserManagement store={this.state.store} />
                </div>
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

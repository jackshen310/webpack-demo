import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import routes from './routes';
import RouteWithSubRoutes from './RouteWithSubRoutes';

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Link to="/A">to A</Link>
            <br />
            <Link to="/C">to C</Link>
            {routes.map((route, i) => {
              return <RouteWithSubRoutes {...route} key={i} />;
            })}
          </div>
        </Router>
      </div>
    );
  }
}

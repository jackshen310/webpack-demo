import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import routes from './routes';
import RouteWithSubRoutes from './RouteWithSubRoutes';
import { funcA } from './util';
export default class App extends Component {
  fallback = () => {
    return <div>Loading...</div>;
  };
  // React.lazy和Suspense使用参考：https://juejin.im/post/5bd70def6fb9a05d38282c30
  render() {
    funcA();
    return (
      <div>
        this is {process.env.NODE_ENV} mode <br />
        <Router>
          <div>
            <Suspense fallback={this.fallback()}>
              {routes.map((route, i) => {
                return <RouteWithSubRoutes {...route} key={i} />;
              })}
              <Link to="/A">to A</Link>
              <br />
              <Link to="/C">to C</Link>
            </Suspense>
          </div>
        </Router>
      </div>
    );
  }
}

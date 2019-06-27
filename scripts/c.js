import React from 'react';
import { Route, Link } from 'react-router-dom';
import RouteWithSubRoutes from './RouteWithSubRoutes';

export default ({ routes }) => (
  <div>
    this is C <br />
    <Link to="/C/D">to D</Link>
    {routes.map((route, i) => {
      return <RouteWithSubRoutes {...route} key={i} />;
    })}
  </div>
);

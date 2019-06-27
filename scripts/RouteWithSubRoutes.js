import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

export default route => {
  return (
    <Route
      path={route.path}
      render={props => {
        return <route.component {...props} routes={route.routes} />;
      }}
    />
  );
};

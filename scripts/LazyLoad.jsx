import React from 'react';
import Loadable from 'react-loadable';

const Loading = () => <div>Loading...</div>;

export default loader =>
  Loadable({
    loader: loader,
    loading: Loading,
  });

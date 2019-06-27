import React from 'react';
import show from './show';
export default class D extends React.Component {
  render() {
    show(() => 'render D...');
    return <div>this is D</div>;
  }
}

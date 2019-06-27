import React from 'react';
import show from './show';
import style from './d.css';

export default class D extends React.Component {
  render() {
    show(() => 'render D...');
    return <div className={'wrapper-d'}>this is D...</div>;
  }
}

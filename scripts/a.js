import style from './a.css';
import React from 'react';
import show from './show';

export default class A extends React.Component {
  render() {
    show('render A...');
    return <div className={'wrapper-a'}>this is A...</div>;
  }
}

import React from 'react';
import Loadable from 'react-loadable';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const Loading = () => <div>Loading...</div>;

const D = Loadable({
    loader: () => import('./d'),
    loading: Loading,
})
export default class C extends React.Component {
    render() {
        return <div>
            this is  C
            <Route path="/C/D" component={D} ></Route>
            <Link to="/C/D">to D</Link>
        </div>
    }
}
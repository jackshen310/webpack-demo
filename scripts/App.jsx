import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Loadable from 'react-loadable';

const Loading = () => <div>Loading...</div>;

const A = Loadable({
    loader: () => import('./a'),
    loading: Loading,
})
const C = Loadable({
    loader: () => import('./c'),
    loading: Loading,
})
export default class App extends Component {
    render() {
        return <div>
            <Router>
                <div>
                    <Route path="/A" component={A} />
                    <Route path="/C" component={C} />
                    <Link to="/A">to A</Link><br />
                    <Link to="/C">to C</Link>
                </div>
            </Router>
        </div>
    }
}

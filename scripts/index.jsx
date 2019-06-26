import React from 'react';
import ReactDOM from 'react-dom';

import a from './a.js'
import c from './c.js'
const s = () => {
    a.init()
    a.cinit()
    c.init()
    console.log('s init')
}
s();

class App extends React.Component {
    render() {
        return <div>react init</div>
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
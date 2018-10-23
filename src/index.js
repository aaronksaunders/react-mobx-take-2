import React, { Component } from 'react';
import { render } from 'react-dom';
import Home from './Home';

import { Store } from './store';
import './style.css';


import { Provider } from 'mobx-react'
const store = new Store();

class App extends Component {
  constructor() {
    super();
    this.state = { };
  }

  render() {
    return (
      <Provider store={store}>
          <Home />
      </Provider>
    );
  }
}

render(<App />, document.getElementById('root'));

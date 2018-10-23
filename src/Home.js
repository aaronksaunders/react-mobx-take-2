import React, { Component } from 'react';

// MOBX
import { inject } from "mobx-react";
import DevTools from 'mobx-react-devtools';


// MATERIAL-UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// COMPONENTS
import MenuButton from './MenuButton'
import TabContainer from './TabContainer'


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }

  handleChange = (event, value) => {
    let { store } = this.props
    this.setState({ value });
    if (value === 0) {
      store.showProduct('SHOES')
    } else {
      store.showProduct('SOCKS')
    }
  };


  render() {
    let { value } = this.state
    return (
      <div>
        <AppBar position="static" color="default" >
          <Toolbar>
            <Typography variant="title" color="inherit" style={{ flexGrow: 1 }}>
              Mobx React Sample
            </Typography>
            <MenuButton value={value} onClick={(v) => this.setState(v)} />
          </Toolbar>
        </AppBar>
        <TabContainer value={value} onChange={this.handleChange} />
        <DevTools />
      </div>
    )
  }
}

export default inject('store')(Home)
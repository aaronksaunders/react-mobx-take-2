import React from 'react';
import { observer, inject, Observer } from "mobx-react";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';

import CatalogComponent from './CatalogComponent';
import Cart from './Cart';

const TabContainer = ({ store, value, onChange }) => {

  return (
    <>
      {
        value !== 2 &&
        <div>
          <Tabs value={value} onChange={onChange}>
            <Tab label="Shoes" href="#basic-tabs" />
            <Tab label="Socks" />
          </Tabs>
          <Typography component="div" style={{ padding: 12 * 2 }}>
            <CatalogComponent title={value === 0 ? "Shoes" : "Socks"} />
          </Typography>
        </div>
      }
      {
        value === 2 &&
        <Typography component="div" style={{ padding: 12 * 2 }}>
          <Cart />
        </Typography>

      }
    </>
  )
}

export default inject('store')(TabContainer)

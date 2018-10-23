import React from 'react';
import { observer, inject } from "mobx-react";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

const CatalogComponent = ({ name, store }) => (
  <div>
    <h3>Cart Total {formatter.format(store.cartTotal)}</h3>
      {store.cartItems.map((item,index) => (
        <ListItem
          button={true}
          onClick={() => store.removeItemFromCart(index)}
          key={item.id + ':' + index}>
          <div style={{ flex: 1 }}>
            {item.id} {item.name}
          </div>
          <div style={{ flex: .5, textAlign: 'right' }}>
            {formatter.format(item.price)}
          </div>
        </ListItem>
      )
      )}
  </div>
);

export default inject('store')(observer(CatalogComponent))
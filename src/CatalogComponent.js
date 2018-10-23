import React from 'react';
import { inject } from 'mobx-react'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

export default inject('store')(({ store, title }) => (
  <div>
    <h1>{title}</h1>
    <List>
      {store.filteredProducts.map(item => (
        <ListItem
          button={true}
          onClick={() => store.addItemToCart(item)}
          key={item.id}>
          <div style={{ flex: 1 }}>
            {item.id} {item.name}
          </div>
          <div style={{ flex: .5, textAlign: 'right' }}>
            {formatter.format(item.price)}
          </div>
        </ListItem>
      ))}
    </List>
  </div>
));

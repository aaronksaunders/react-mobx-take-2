import React from 'react';
import { observer, inject, Observer } from "mobx-react";

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
//
// value is used to let us know what view to render
//
// 0 = SHOES, 1 = SOCKS, 2 = CART
const MenuButton = ({ store, value, onClick }) => {

  return (
    <>
      {
        value !== 2 &&
        <Button color="inherit"
          onClick={() => onClick({ value: 2 })}>
          <Observer render={() => <span data-testid="cart-size-value">Cart ({store.cartSize})</span>} />
        </Button>
      }
      {
        value === 2 &&
        <Button color="inherit"
          onClick={() => onClick({ value: 0 })}>
          Back
        </Button>

      }
    </>
  )
}

export default inject('store')(MenuButton)

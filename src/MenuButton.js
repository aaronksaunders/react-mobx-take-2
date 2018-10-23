import React from 'react';
import { observer, inject, Observer } from "mobx-react";

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';

const MenuButton = ({ store, value, onClick }) => {

  return (
    <>
      {
        value !== 2 &&
        <Button color="inherit"
          onClick={() => onClick({ value: 2 })}>
          <Observer render={() => <>Cart ({store.cartSize})</>} />
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

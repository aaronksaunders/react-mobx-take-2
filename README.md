# react-mobx-take-2
 - react-mobx-take-2 from stackblitz, but with no decorators
 - Integrating [React Testing Library](https://github.com/kentcdodds/react-testing-library#readme)
 - Mobx Without Decorators from [Mobx Documentation](https://mobx.js.org/best/decorators.html)

Original store.js

```javascript
import { observable, computed, action } from "mobx";

export class Store {
  @observable cartItems = [];
  @observable products = new Map([
    ["10-SOCKS", {
      name: "blue socks",
      price: 1.99
    }], [
      "20-SOCKS", {
        name: "red tube socks",
        price: 2.99
      }],
    ["30-SOCKS", {
      name: "ankle socks",
      price: 1.00
    }
    ],
    ["10-SHOES", {
      name: "blue suede",
      price: 110.99
    }],
    [
      "20-SHOES", {
        name: "red converse all stars",
        price: 72.99
      }],
    ["30-SHOES", {
      name: "zip up ankle boot",
      price: 89.99
    }
    ]
  ])
  @observable filter = 'SHOES';


  @action showProduct(_value) {
    this.filter = _value;
  }

  @action addItemToCart(_product) {
    this.cartItems.push({
      id: _product.id,
      ...this.products.get(_product.id)
    });
  }
  @action removeItemFromCart(index) {
    let r = this.cartItems.splice(index, 1)
    return r
  }

  @action clearCart(_product) {
    this.cartItems = []
  }

  @computed get cartSize() {
    return this.cartItems.length
  }

  @computed get currentFilter() {
    return this.filter
  }

  @computed get cartTotal() {
    return this.cartItems.reduce((total, item) => {
      return total + item.price
    }, 0.00)
  }

  @computed get filteredProducts() {
    console.log("filteredProducts: " + this.filter)
    return this._filterByValue(this.products, this.filter)
  }

  _filterByValue(products, filter) {
    let result = []
    products.forEach((v, k) => {
      if ((k.indexOf(filter) !== -1) || filter === 'SHOW_ALL') {
        result.push({ ...v, id: k })
      }
    })
    return result;
  }
}
```

removed decorators

```javascript
import { observable, computed, action, decorate } from "mobx";

export class Store {
   cartItems = [];
   products = new Map([
    ["10-SOCKS", {
      name: "blue socks",
      price: 1.99
    }], [
      "20-SOCKS", {
        name: "red tube socks",
        price: 2.99
      }],
    ["30-SOCKS", {
      name: "ankle socks",
      price: 1.00
    }
    ],
    ["10-SHOES", {
      name: "blue suede",
      price: 110.99
    }],
    [
      "20-SHOES", {
        name: "red converse all stars",
        price: 72.99
      }],
    ["30-SHOES", {
      name: "zip up ankle boot",
      price: 89.99
    }
    ]
  ])
   filter = 'SHOES';


   showProduct(_value) {
    this.filter = _value;
  }

   addItemToCart(_product) {
    this.cartItems.push({
      id: _product.id,
      ...this.products.get(_product.id)
    });
  }
   removeItemFromCart(index) {
    let r = this.cartItems.splice(index, 1)
    return r
  }

   clearCart(_product) {
    this.cartItems = []
  }

   get cartSize() {
    return this.cartItems.length
  }

   get currentFilter() {
    return this.filter
  }

   get cartTotal() {
    return this.cartItems.reduce((total, item) => {
      return total + item.price
    }, 0.00)
  }

 get filteredProducts() {
    console.log("filteredProducts: " + this.filter)
    return this._filterByValue(this.products, this.filter)
  }

  _filterByValue(products, filter) {
    let result = []
    products.forEach((v, k) => {
      if ((k.indexOf(filter) !== -1) || filter === 'SHOW_ALL') {
        result.push({ ...v, id: k })
      }
    })
    return result;
  }
}

decorate(Store, {
  cartItems: observable,
  products: observable,
  filter: observable,

  // COMPUTED
  cartSize: computed,
  currentFilter: computed,
  cartTotal: computed,
  filteredProducts: computed,

  // ACTIONS
  showProduct : action,
  addItemToCart : action,
  removeItemFromCart : action,
  clearCart : action,
});
```

Working with Testing Library


import React from "react";
import {
  cleanup,
  render,
  fireEvent,
  waitForElement
} from "react-testing-library";
import MenuButton from "../MenuButton";
import Home from "../Home";

// mobx
import { Store } from "../store";
import { Provider } from "mobx-react";

afterEach(cleanup);

function renderWithMobx(ui, { store = new Store() } = {}) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store
  };
}

// SHOW EMPTY CART
test("shows 0", () => {
  const { getByLabelText, getByText, getByTestId } = renderWithMobx(
    <MenuButton value={0} />
  );

  expect(getByTestId("count-value").textContent).toBe("Cart (0)");
});

// SHOW CART w/ONE ITEM FROM CLICKING ON CATALOG LIST
test("shows adding item to cart", () => {
  const { getByLabelText, getByText, getByTestId } = renderWithMobx(
    <Home value={0} />
  );

  fireEvent.click(getByText(/10-shoes/i));
  expect(getByTestId("count-value").textContent).toBe("Cart (1)");
});

// SHOW EMPTY CART w/ONE ITEM REMOVED FROM CLICKING ON CART LIST
test("shows removing item from cart", async () => {
  const { getByLabelText, getByText, getByTestId } = renderWithMobx(
    <Home value={0} />
  );

  fireEvent.click(getByText(/10-shoes/i));
  expect(getByTestId("count-value").textContent).toBe("Cart (1)");
  fireEvent.click(getByText(/Cart/i));

  const cartNode = await waitForElement(
    () => getByText(/10-shoes/i),
    {}
  );
  expect(cartNode).toBeTruthy();
  fireEvent.click(getByText(/10-shoes/i));
  fireEvent.click(getByText(/back/i));
  expect(getByTestId("count-value").textContent).toBe("Cart (0)");
});

import {initStore} from "../../src/client/store";
import {render} from "@testing-library/react";
import events from "@testing-library/user-event";
import {CartApi, ExampleApi} from "../../src/client/api";
import {createMemoryHistory} from "history";
import {Router} from "react-router-dom";
import {Provider} from "react-redux";
import {Application} from "../../src/client/Application";
import React from "react";

describe("Корзина", () => {
  const cartData = [
    {name: "Sleek Soap", count: 1, price: 267},
    {name: "Unbranded Towels", count: 2, price: 539},
    {name: "Tasty Table", count: 2, price: 629},
  ];
  let App;
  let api;
  let cart;
  let store;
  let history;

  beforeEach(() => {
    const basename = "/hw/store";
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    cart.getState = jest.fn().mockReturnValueOnce(cartData);
    const store = initStore(api, cart);

    const history = createMemoryHistory({
      initialEntries: ["/cart"],
      initialIndex: 0,
    });

    App = (
      <Router history={history}>
        <Provider store={store}>
          <Application/>
        </Provider>
      </Router>
    );
  });

  afterEach(() => {
    api = null;
    cart = null;
    store = null;
    App = null;
    history = null;
  });

  it("Если корзина пустая,то должна отображаться ссылка на каталог товаров", async () => {
    const {findByRole} = render(App);

    const btn = await findByRole("button", {
      name: "Clear shopping cart",
    });

    await events.click(btn);

    const link = await findByRole("link", {
      name: "catalog",
    });

    expect(link.getAttribute("href")).toBe("/catalog");
  });

  it("Удаление на кнопку отчистить корзину", async () => {
    const {findByRole, queryByRole} = render(App);

    const btn = await findByRole("button", {
      name: "Clear shopping cart",
    });

    await events.click(btn);

    expect(await queryByRole("table")).toBeNull();
  });


  it("В шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней", async () => {
    const {findByTestId} = render(App);

    for (let i = 0; i < cartData.length; i++) {
      expect(await findByTestId(i)).toBeTruthy();
    }
  });

});

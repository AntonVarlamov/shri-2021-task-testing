import React from "react";
import {createMemoryHistory} from "history";
import {CartApi, ExampleApi} from "../../src/client/api";
import {initStore} from "../../src/client/store";
import {Router} from "react-router-dom";
import {Provider} from "react-redux";
import {Application} from "../../src/client/Application";
import {render} from "@testing-library/react";

describe("Страницы", () => {
  let App;

  beforeEach(() => {
    const basename = '/hw/store';
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);

    App = (initial) => {
      const history = createMemoryHistory({
        initialEntries: [initial],
        initialIndex: 0
      });

      return render(
        <Router history={history}>
          <Provider store={store}>
            <Application/>
          </Provider>
        </Router>
      );
    }
  });

  afterEach(() => {
    App = null
  })

  it("Есть главная страница", () => {
    const {container} = App("/");
    expect(container.getElementsByClassName(".Home")).toBeTruthy();
  });

  it("Есть страница доставки", async function () {
    const {container} = App("/delivery");
    expect(container.getElementsByClassName(".Delivery")).toBeTruthy();
  });

  it("Есть страница каталога", async function () {
    const {container} = App("/catalog");
    expect(container.getElementsByClassName(".Catalog")).toBeTruthy();
  });

  it("Есть страница контактов", async function () {
    const {container} = App("/contacts");
    expect(container.getElementsByClassName(".Contacts")).toBeTruthy();
  });
});
import {initStore} from "../../src/client/store";
import {render} from "@testing-library/react";
import events from "@testing-library/user-event";
import {CartApi, ExampleApi} from "../../src/client/api";
import {createMemoryHistory} from "history";
import {Router} from "react-router-dom";
import {Provider} from "react-redux";
import {Catalog} from "../../src/client/pages/Catalog";
import React from "react";
import {ProductItem} from "../../src/client/components/ProductItem";

describe("Каталог", () => {
  const basename = "/hw/store";
  const api = new ExampleApi(basename);

  const catalogData = [
    {id: 0, name: "Sleek Soap", price: 267},
    {id: 1, name: "Unbranded Towels", price: 539},
    {id: 2, name: "Tasty Table", price: 629},
  ];
  const catalog = new CartApi();
  const store = initStore(api, catalog);

  const history = createMemoryHistory({
    initialEntries: ["/catalog"],
    initialIndex: 0,
  });
  catalog.getState = jest.fn().mockReturnValueOnce(catalogData);

  it("Товары с сервера отображаются на странице", async () => {
    api.getProducts = jest.fn().mockResolvedValueOnce({data: catalogData});

    const {findAllByText} = render(<Router history={history}>
      <Provider store={store}>
        <Catalog/>
      </Provider>
    </Router>);

    for (let i of catalogData) {
      expect(await findAllByText(i.name)).toBeTruthy();
    }
  });

  it("Данные о товаре отображаются корректно", async () => {
    for (const i of catalogData) {
      const {findByText} = render(
        <Router history={history}>
          <Provider store={store}>
            <ProductItem product={i}/>
          </Provider>
        </Router>
      );

      expect(await findByText(i.name)).toBeTruthy();
      expect(await findByText(`$${i.price}`)).toBeTruthy();
    }
  });

});

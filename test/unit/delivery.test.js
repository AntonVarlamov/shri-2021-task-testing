import {initStore} from "../../src/client/store";
import {render} from "@testing-library/react";
import events from "@testing-library/user-event";
import {CartApi, ExampleApi} from "../../src/client/api";
import {createMemoryHistory} from "history";
import {Router} from "react-router-dom";
import {Provider} from "react-redux";

import React from "react";
import {Delivery} from "../../src/client/pages/Delivery";

describe("Доставка", () => {
  let App;

  const history = createMemoryHistory({
    initialEntries: ["/delivery"],
    initialIndex: 0,
  });

  beforeEach(() => {
    const basename = "/hw/store";
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);

    App = (
      <Router history={history}>
        <Provider store={store}>
          <Delivery/>
        </Provider>
      </Router>
    );
  });

  it("Корректное отображение страницы Delivery", async () => {
    const {findByRole, getByText} = render(App);

    const title = await findByRole("heading", {
      level: 1,
      name: "Delivery",
    });
    const description = await getByText(
      "Deserunt occaecati tempora. Qui occaecati est aliquam. Enim qui nulla ipsam. Incidunt impedit" +
      " enim consequuntur amet at consequuntur vero. Dolor et ad facere asperiores iste est praesentium quaerat" +
      " iure. Quibusdam mollitia autem quos voluptas quia est doloremque corporis et. Sed fuga quasi esse perspiciatis" +
      " fugit maxime. Qui quidem amet."
    );
    const description2 = await getByText(
      "Dolores magnam consequatur iste aliquam qui sint non ab. Culpa saepe omnis." +
      " Recusandae vel aperiam voluptates harum. Perspiciatis qui molestiae qui tempora quisquam." +
      " Mollitia voluptatum minus laboriosam. Dolor maiores possimus repudiandae praesentium hic eos." +
      " Veritatis et repellat."
    );

    const description3 = await getByText(
      "Pariatur nisi nobis hic ut facilis sunt rerum id error. Soluta nihil quisquam quia rerum illo." +
      " Ipsam et suscipit est iure incidunt quasi et eum. Culpa libero dignissimos recusandae. In magni sapiente" +
      " non voluptas molestias. Deserunt quos quo placeat sunt. Ea necessitatibus dolores eaque ex aperiam sunt" +
      " eius. Saepe aperiam aut. Quaerat natus consequatur aut est id saepe et aut facilis."
    );

    expect(description).toBeTruthy();
    expect(description2).toBeTruthy();
    expect(description3).toBeTruthy();
    expect(title).toBeTruthy();
  });
});

import {initStore} from "../../src/client/store";
import {render} from "@testing-library/react";
import events from "@testing-library/user-event";
import {CartApi, ExampleApi} from "../../src/client/api";
import {createMemoryHistory} from "history";
import {Router} from "react-router-dom";
import {Provider} from "react-redux";
import {Catalog} from "../../src/client/pages/Catalog";
import React from "react";
import {Delivery} from "../../src/client/pages/Delivery";
import {Contacts} from '../../src/client/pages/Contacts'

describe("Контакты", () => {
  let App;

  const history = createMemoryHistory({
    initialEntries: ["/contacts"],
    initialIndex: 0,
  });

  beforeEach(() => {
    const basename = "/hw/store";
    const cart = new CartApi();
    const api = new ExampleApi(basename);
    const store = initStore(api, cart);

    App = (
      <Router history={history}>
        <Provider store={store}>
          <Contacts/>
        </Provider>
      </Router>
    );
  });

  it("Корректное отображение страницы Contacts", async () => {
    const {findByRole, getByText} = render(App);

    const title = await findByRole("heading", {
      level: 1,
      name: "Contacts",
    });
    const description = await getByText(
      "Ut non consequatur aperiam ex dolores. Voluptatum harum consequatur est totam. Aut voluptatum" +
      " aliquid aut optio et ea. Quaerat et eligendi minus quasi. Culpa voluptatem voluptatem dolores molestiae" +
      " aut quos iure. Repellat aperiam ut aliquam iure. Veritatis magnam quisquam et dolorum recusandae aut."
    );
    const description2 = await getByText(
      "Molestias inventore illum architecto placeat molestias ipsam facilis ab quo. Rem dolore cum qui" +
      " est reprehenderit assumenda voluptatem nisi ipsa. Unde libero quidem. Excepturi maiores vel quia. Neque" +
      " facilis nobis minus veniam id. Eum cum eveniet accusantium molestias voluptas aut totam laborum aut. Ea" +
      " molestiae ullam et. Quis ea ipsa culpa eligendi ab sit ea error suscipit. Quia ea ut minus distinctio quam" +
      " eveniet nihil. Aut voluptate numquam ipsa dolorem et quas nemo."
    );


    expect(description).toBeTruthy();
    expect(description2).toBeTruthy();
    expect(title).toBeTruthy();
  });
});

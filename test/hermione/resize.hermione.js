const { assert } = require("chai");

describe("Адаптив", () => {
  const basename = "/hw/store";
  it("Вёрстка адаптируется под ширину экрана", async function () {
    await this.browser.setWindowSize(450, 700);

    await this.browser.url(`${basename}/catalog`);
    await this.browser.assertView("adaptive-catalog", ".Application", {
      ignoreElements: [".ProductItem-Name", ".ProductItem-Price"],
      compositeImage: true,
    });

    await this.browser.url(`${basename}/`);
    await this.browser.assertView("adaptive-home", ".Application", {
      compositeImage: true,
    });

    await this.browser.url(`${basename}/contacts`);
    await this.browser.assertView("adaptive-contacts", ".Application", {
      compositeImage: true,
    });

    await this.browser.url(`${basename}/delivery`);
    await this.browser.assertView("adaptive-delivery", ".Application", {
      compositeImage: true,
    });

    await this.browser.url(`${basename}/cart`);
    await this.browser.assertView("adaptive-cart", ".Application", {
      compositeImage: true,
    });
  });

  it("При выборе элемента из меню гамбургера, меню должно закрываться", async function () {
    await this.browser.setWindowSize(450, 700);

    await this.browser.url("/hw/store/");

    const burger = await this.browser.$(".navbar-toggler");
    await burger.click();

    const dropList = await this.browser.$(".navbar-collapse");
    await (await dropList.$(".nav-link")).click();

    assert.isFalse(await dropList.isDisplayed());
  });
});

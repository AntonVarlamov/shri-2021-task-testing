const { assert } = require("chai");

describe("Каталог", async function () {
  it("Каталог прогружается корректно", async function () {
    await this.browser.url("/hw/store/catalog");

    const ProductItem = await this.browser.$(".ProductItem");
    await ProductItem.waitForExist();

    await this.browser.assertView("Catalog", ".Application", {
      ignoreElements: [".nav-link", ".card-body"],
      allowViewportOverflow: true,
    });
  });
});

const { assert } = require("chai");

describe("Корзина", async () => {
  it("При перезагрузке страницы содержимое не меняется", async function () {
    await this.browser.url("/hw/store/catalog");

    await (await this.browser.$(".ProductItem-DetailsLink")).click();
    await (await this.browser.$(".ProductDetails-AddToCart")).click();

    await this.browser.url("/hw/store/cart");

    this.browser.refresh();

    await this.browser.assertView("RefreshCart", "table", {
      allowViewportOverflow: true,
      ignoreElements: [".Cart-Name", ".Cart-Price", ".Cart-Total", ".Cart-OrderPrice"],
    });
  });

  it("При нажатии на кнопку отчистить корзину - корзина отчищается", async function () {
    await this.browser.url("/hw/store/cart");

    const clearBtn = await this.browser.$(".Cart-Clear");

    await clearBtn.click();

    const cartTable = this.browser.$(".Cart-Table").isExisting();
    const catalogLink = this.browser.$("=catalog").isExisting();

    assert.isFalse(await cartTable, "Товары не отчистились");
    assert.isTrue(await catalogLink, "Ссылка на каталог не появилась");
  });
});

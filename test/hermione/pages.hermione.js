const { assert } = require("chai");

describe("Страницы", async function () {
  beforeEach(async function () {
    await this.browser.setWindowSize(1024, 832);
  });

  it("Наличие главной страницы", async function () {
    await this.browser.url("/hw/store");
    const h1 = await this.browser.$(".display-3");
    const title = await h1.getText();
    assert.equal(title, "Welcome to Example store!");
  });

  it("Наличие страницы доставки", async function () {
    await this.browser.url("/hw/store/delivery");
    const h1 = await this.browser.$("h1");
    const title = await h1.getText();
    assert.equal(title, "Delivery");
  });

  it("Наличие страницы каталога", async function () {
    await this.browser.url("/hw/store/catalog");
    const h1 = await this.browser.$("h1");
    const title = await h1.getText();
    assert.equal(title, "Catalog");
  });

  it("Наличие страницы корзины", async function () {
    await this.browser.url("/hw/store/cart");
    const h1 = await this.browser.$("h1");
    const title = await h1.getText();
    assert.equal(title, "Shopping cart");
  });

  it("Наличие страницы контактов", async function () {
    await this.browser.url("/hw/store/contacts");
    const h1 = await this.browser.$("h1");
    const title = await h1.getText();
    assert.equal(title, "Contacts");
  });

  it("Скриншоты страницы доставки совпадают", async function () {
    await this.browser.url("/hw/store/delivery");
    await this.browser.assertView("delivery-page-desktop", ".Application", {
      allowViewportOverflow: true,
    });
  });

  it("Скриншоты главной страницы совпадают", async function () {
    await this.browser.url("/hw/store");
    await this.browser.assertView("home-page-desktop", ".Application", {
      allowViewportOverflow: true,
    });
  });

  it("Скриншоты страницы контактов совпадают", async function () {
    await this.browser.url("/hw/store/contacts");
    await this.browser.assertView("contacts-page-desktop", ".Application", {
      allowViewportOverflow: true,
    });
  });
});

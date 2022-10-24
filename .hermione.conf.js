module.exports = {
  baseUrl: "http://localhost:3000/hw/store",
  gridUrl: 'http://127.0.0.1:4444/wd/hub',
  sets: {
    desktop: {
      files: 'test/hermione'
    },
  },
  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
      },
    }
  },
  plugins: {
    "html-reporter/hermione": {
      path: "hermione-html-reporter"
    },
    // "hermione-selenium-standalone-runner": true
  }

}
---
title: Testing with Puppeteer
date: 2018/01/07
description: Notes on integrating puppeteer tests with the website.
---
### Feature Aim
Check that the 'About' section looks the same on the index and posts pages on both desktop and mobile. It will also check that the search function works as expected.

### Development Notes
Install dependencies
```yaml
npm install --save-dev mocha chai puppeteer lodash
```

Add script to `package.json`.
```javascript
"scripts": {
    "test": "mocha --recursive test"
}
```

Add a dummy test in new file `/test/regression.spec.js` to check all running as expected.
```javascript
const { expect } = require('chai');

describe('sample test', function () {
  it('should work', function () {
    expect(true).to.be.true;
  });
});
```
Now we add a `/test/bootstrap.js` file to set up some globally available variables and tidy up once we are done.

```javascript
const puppeteer = require('puppeteer');
const { expect } = require('chai');
const _ = require('lodash');
const globalVariables = _.pick(global, ['browser', 'expect']);

// puppeteer options
const opts = {
  headless: false,
  slowMo: 100,
  timeout: 10000
};

// expose variables
before (async function () {
  global.expect = expect;
  global.browser = await puppeteer.launch(opts);
});

// close browser and reset global variables
after (function () {
  browser.close();

  global.browser = globalVariables.browser;
  global.expect = globalVariables.expect;
});
```

The NPM scripts needs adjusted to:
```javascript
"scripts": {
    "test": "mocha test/bootstrap.js --recursive test"
}
```

Finally we check the index page title.
```javascript
describe('About: visual regression', function () {
  
  let page;

  before (async function () {
    page = await browser.newPage();
    await page.goto('http://localhost:4000');
  });

  after (async function () {
    await page.close();
  });

  it('should have the correct page title', async function () {
    expect(await page.title()).to.eql('Patrick Grey: Web Development, E-learning & Motion Graphics');
  });

});
```

Everything up to here is a compact version of the excellent article by @ankit_m linked below in the Research section.

Now I want to introduce visual regression testing for the 'About' section.





### Research
[https://medium.com/@ankit_m/ui-testing-with-puppeteer-and-mocha-part-1-getting-started-b141b2f9e21](https://medium.com/@ankit_m/ui-testing-with-puppeteer-and-mocha-part-1-getting-started-b141b2f9e21)
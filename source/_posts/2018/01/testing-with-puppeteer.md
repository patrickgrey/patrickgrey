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

Add a dummy test to check all running as expected.
```javascript
const { expect } = require('chai');

describe('sample test', function () {
  it('should work', function () {
    expect(true).to.be.true;
  });
});
```
Everything up to here was taken from the excellent article by @ankit_m linked below in the Research section.



### Research
[https://medium.com/@ankit_m/ui-testing-with-puppeteer-and-mocha-part-1-getting-started-b141b2f9e21](https://medium.com/@ankit_m/ui-testing-with-puppeteer-and-mocha-part-1-getting-started-b141b2f9e21)
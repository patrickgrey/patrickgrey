---
title: Testing with Puppeteer
date: 2018/01/07
description: Notes on integrating puppeteer tests with the website.
tags:
- testing
- mocha
- chai
- puppeteer
- javascript
- travis
---
### Feature Aim
Check that the search function works as expected.

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

// puppeteer options - headless and sloMo commented out for quick testing.
const opts = {
  // headless: false,
  // slowMo: 100,
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

Everything up to here is a compact version of the excellent article by @ankit_m linked below in the Research section.

The NPM scripts needs adjusted to:
```javascript
"scripts": {
    "test": "mocha test/bootstrap.js --recursive test"
}
```

Finally we add the test to the search functionality. Initially I was going to hard code the search term in but that would be too fragile. I was also just going to test that the result was greater than 1 and less than the total posts. However, I wanted something more precise so I counted the matches to compare with the vue results.
```javascript
describe('Search function filters posts.', function () {
  // Allow for longer test of a timeout error occurs.
  this.timeout(20000);
  let page;
  // Open website in the headless browser
  before (async function () {
    page = await browser.newPage();
    await page.goto('http://localhost:4000/');
  });
  // Once done, close page.
  after (async function () {
    await page.close();
  });
  // Simple test to check title
  it('should have the correct page title', async function () {
    expect(await page.title()).to.eql('Patrick Grey: Web Development, E-learning & Motion Graphics');
  });
 
  // This test aims to check that the search input is working.
  // Get count of total posts
  // Get first three letters of title of first post
  // Count all posts that include those letters.
  // Type those letters in.
  // Check that there is at least one post showing but less than original total.
  // Check that the post count equals the title check count.
  it('Should filter posts based on search input', async function () {
    const VUE_POSTS_CONTAINER = '.pg-posts-container-search';
    const INPUT_SELECTOR = '#searchInput01';
    const POST_SELECTOR = 'pg-post';
    const POST_TITLE_SELECTOR = 'pg-post-goto-link';
    // How I know that vue has initialised.
    await page.waitForSelector(VUE_POSTS_CONTAINER, {visible: true});
    
    // Get all post titles
    let allPostTitlesArray = await page.evaluate((sel) => {
      let _allPostTitlesArray = [];
      let allPostTitlesElementsArray = document.getElementsByClassName(sel);
      for (let index = 0; index < allPostTitlesElementsArray.length; index++) {
        _allPostTitlesArray.push(allPostTitlesElementsArray[index].innerHTML);
      }
      return _allPostTitlesArray;
    }, POST_TITLE_SELECTOR); 
    
    // Get search term based on first title.
    let searchTerm = allPostTitlesArray[0].substr(0,3);
    // Count how many times the seachTerm should appear in posts
    let searchTermCount = 0;
    for (let index = 0; index < allPostTitlesArray.length; index++) {
      let title = allPostTitlesArray[index].toLowerCase();
      if(title.indexOf(searchTerm.toLowerCase()) >= 0) searchTermCount++;
    }

    await page.waitFor(INPUT_SELECTOR);
    await page.focus(INPUT_SELECTOR);
    await page.waitFor(100);

    // Get the maximum number of filtered results possible
    let totalListLength =  allPostTitlesArray.length;

    await page.type(INPUT_SELECTOR, searchTerm, { delay: 150 });
    await page.waitFor(100);

    // Get the length of the filtered post list.
    let newListLength =  await page.evaluate((sel) => {
                        return document.getElementsByClassName(sel).length;
                      }, POST_SELECTOR);


    await page.screenshot({ path: 'test/search.png' });
    
    expect(newListLength).to.be.lessThan(totalListLength);
    expect(newListLength).to.equal(searchTermCount);
  });
```

Then the test run script is added to the `.travis.yml` file.
```yaml
script:
  - hexo run generate
  - npm run test
```

### Research
https://medium.com/@ankit_m/ui-testing-with-puppeteer-and-mocha-part-1-getting-started-b141b2f9e21
// "use strict"

// const { expect } = require('chai');



// https://github.com/syadykin/node-mocha-image-compare

// describe('sample test', function () {
//   it('should work', function () {
//     console.log(await browser.version());
//     expect(true).to.be.true;
//   });
// });


describe('About visual regression', function () {
  
  let page;

  before (async function () {
    page = await browser.newPage();
    await page.goto('http://localhost:4000');
  });

  after (async function () {
    await page.close();
  });

  it('should have the correct page title', async function () {
    console.log(await browser.version());
    expect(await page.title()).to.eql('Patrick Grey: Web Development, E-learning & Motion Graphics');
    // expect(true).to.be.true;
  });

  it('should filter posts based on search input', async function () {
    const INPUT_SELECTOR = '#searchInput01';
    await page.waitFor(INPUT_SELECTOR);
    expect(true).to.be.true;
  });

  // searchInput01



});
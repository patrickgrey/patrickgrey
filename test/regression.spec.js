"use strict"

const { expect } = require('chai');

const mic = require('mocha-image-compare')({
  report: '/about', // path to the report folder, default 
                                    // is './report' 
  threshold: 0.002, // default detection thresold, default is 0.001 
  highlight: 'yellow' // image diff highlight color 
});

// https://github.com/syadykin/node-mocha-image-compare

// describe('sample test', function () {
//   it('should work', function () {
//     console.log(await browser.version());
//     expect(true).to.be.true;
//   });
// });


describe('About: visual regression', function () {
  
  let page;

  before (async function () {
    page = await browser.newPage();
    await page.goto('http://localhost:4000');
    const aboutElement = await page.$('.pg-about-container');
    const screenshot = await aboutElement.screenshot({path: 'about-screenshot.png'});
    await browser.close();
  });

  after (async function () {
    await page.close();
  });

  it('should have the correct page title', async function () {
    expect(await page.title()).to.eql('Patrick Grey: Web Development, E-learning & Motion Graphics');
  });

  // it('should have no change to about', function(done) {
  //   var compare = mic.test(this);
  //   // other stuff 
  //   compare('/path/to/file/to/compare/with.jpg', buffer, done);
  // });



  // it('should work', function (done) {
  //   browser
  //     .version()
  //     .then(function (v) {
  //       console.log(v);

  //       expect(true).to.be.true;
  //       done();
  //     })
  // });
});
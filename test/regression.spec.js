// const { expect } = require('chai');

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
  });

  after (async function () {
    await page.close();
  });

  it('should have the correct page title', async function () {
    expect(await page.title()).to.eql('Patrick Grey: Web Development, E-learning & Motion Graphics');
  });



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
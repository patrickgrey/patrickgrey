describe('Search function filters posts.', function () {
  this.timeout(20000);
  let page;
  // Open website on localhost in the headless browser
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
  it('should filter posts based on search input', async function () {
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
    let searchTerm = allPostTitlesArray[0].substr(0, 3);
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

});
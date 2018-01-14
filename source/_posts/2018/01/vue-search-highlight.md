---
title: Add highlighting to vue search results
description: Add highlighting to vue search results.
date: 2018-01-14
tags: 
- vue
---
### Feature aim
When I search to filter posts on my site, I wanted to highlight the search term in the results so visitors can quickly see why that result was returned.

### Development notes
I wasn't sure how to start with this so I reached for a library. https://markjs.io/ came up and looks good. However, when I integrated it into my Vue app, strange things started to happen. Text started getting jumbled up.

I think this is because I was starting to interact with the DOM when I should be doing that via Vue.

I found an example that worked in Vue here: https://jsfiddle.net/HubertWang/t5ac1quc/. I kept getting errors returned when I tried to work the example into my website. I finally clicked that the example is written in vue v1. The filter works fine




The problem was that the added spans were escaped in the HTML and showed up on the page like this:
```markup
Add <span class='highlight'>high</span>lighting to vue search results
```

A bit of Googling later and I found https://stackoverflow.com/a/46378407/1064037.

So, the final code (with classes etc removed to focus on important parts) is:

```markup
<div class="pg-post" v-for="post in filteredList">
    <h2><a :href="post.slug" v-html="$options.filters.highlight(post.title, search)"></a></h2>   
</div>
```

```javascript
Vue.filter('highlight', function(stringToSearch, searchTerm){
    if (searchTerm === '') return stringToSearch;
    var iQuery = new RegExp(searchTerm, "ig");
    return stringToSearch.toString().replace(iQuery, function(matchedText,a,b){
        return ('<span class=\'highlight\'>' + matchedText + '</span>');
    });
});
```
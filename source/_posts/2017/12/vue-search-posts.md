---
title: Hexo search posts using Vue.js
description: Adding Vue to the template and creating an app as part of the page.
date: 2017-12-30 00:00:00
tags:
---
### Feature Aim
Allow visitors to search through all posts by typing a string to search through titles.

### Development Notes
In the unlikely event someone reads this blog, I'd guess they will land on the post they want via a search engine (if you have, please go back to the [home](/) page to see what I'm talkin about). However, visitors should be able to search posts and it's a fun feature to implement.

I chose to develop with Vue.js as I wanted to better learn the framework.

I'm only listing posts by title and date to force me to give them descriptive titles. It also means it's a very lightweight approach to having them on the page. This means I can possibly list all posts on one page without having to download too much HTML or encountering rendering issues.

If I'm surprisingly prolific in my writing, I may have to change my approach - I know that mobile browsers can struggle with very long pages but at the moment I think it's OK.

I went through several user interface iterations, which started to add elements (like a 'Show All Posts' button). I eventually simplified things and, in my opinion, that gave the best user experience:

- the static HTML page lists 10 posts. This gives a fast first render of posts.
- a JSON object containing the titles, dates and slugs of all the posts is baked into the page by Hexo.
- Once Vue initializes, it removes the static first 10 posts renders all the posts.
- Visitors can then filter all posts instantly via an input element.

I still want to test this with family and friends to see if it works for them.

Vue deals with filtering and showing the number of posts found on the input label (a wee feature I quite like).

I used https://markjs.io/ to highlight the search string in the results titles.

### Technical Implementation
Adding Vue to the home page simply required a link to the vue.js 
`<%- js('scripts/vendors.min.js') %>` 
file at the bottom of the `index.ejs` hexo template file (I later combined this into a vendor minified file). This meant vue is only loaded into the home page.

In a script block after this, I print out a JSON object containing all post titles, dates and slugs:

```javascript
<script>
    var allPosts = {"posts": [
        <% site.posts.sort('date', -1).each(function(post){ %>
            {title: "<%= post.title %>", slug: "<%= post.slug %>", date: "<%= post.date %>" },
        <% }) %>      
    ]};
</script>
```

Then add a small Vue app to part of the rendered page - hopefully the code comments explain what is going on.

```javascript
<script>
    var allPosts = {"posts": [
        <% site.posts.sort('date', -1).each(function(post){ %>
            {title: "<%= post.title %>", slug: "<%= post.slug %>", date: "<%= post.date.format('dddd, Do MMMM YYYY') %>" },
        <% }) %>      
    ]};

    var app = new Vue({
        el: '#posts', // Only apply application to part of the static page.
        data: {
            search: '', //string typed in by user
            isLoaded: true, //Boolean used to show/hide the static and vue lists of posts.
            posts: allPosts.posts // All posts from JSON above.
        },
        methods: {
            highlight: function (event) { // Highlight search term in search results
                // Get the container element of the search results.
                var markInstance = new Mark(document.querySelector(".pg-posts-container-search"));
                // Remove highlights applied on previous keyup
                markInstance.unmark();
                // Add highlight.
                markInstance.mark(this.search,{acrossElements: true});
            }
        },
        computed: {
            filteredList() { // Filter posts list based on search string 
                return this.posts.filter(post => {
                    return post.title.toLowerCase().includes(this.search.toLowerCase())
                })
            },
            isSearching() { // Boolean. If not searching, add class to prevent input field effect from returning to non-searching state.
                return this.search.length > 0;
            }
        }
    })
</script>
```

- Perf results
- Browserstack

### Research

List all post titles and URLs in JSON just before main.js
https://gist.github.com/mh61503891/544d3c1eefd00b1012463b860222d34f

Vue search filter
https://codepen.io/AndrewThian/pen/QdeOVa

https://markjs.io/
possible highlight alternative:
https://jsfiddle.net/HubertWang/t5ac1quc/

Search input was inspired by this excellent resource:
https://tympanus.net/Development/TextInputEffects/
This effect uses JS to make sure it doesn't revert if it has content. I used a conditional class with vue instead of their implementation.

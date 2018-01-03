---
title: Hexo search posts using Vue.js
description: Adding Vue to the template and creating an app as part of the page.
date: 2017-12-30 00:00:00
tags:
---
### Feature Aim
Allow visitors to search through all posts by typing a string to search through titles.

### Development Notes
In the unlikely event someone reads this blog, I'd guess they will land on the post they want via a search engine. However, visitors should be able to search posts and it's a fun feature to implement.

I chose to develop with Vue.js as I wanted to better learn the framework.

I'm only listing posts by title and date to force me to give them descriptive titles. It also means it's a very lightweight approach to having them on the page. This means I can possibly list all posts on one page without having to download too much HTML or encountering rendering issues.

If I'm surprisingly prolific in my writing, I may have to change my approach - I know that mobile browsers can struggle with very long pages but at the moment, I think it's OK.

I went through several user interface iterations, which started to add elements (like a 'Show All Posts' button). I eventually simplified things and, in my opinion, that gave the best user experience:

- the static HTML page lists 10 posts.
- a JSON object containing the titles, dates and slugs of all the posts is baked into the page by Hexo.





I went through several increasingly complex user interface iterations before coming up with what seems to be a simpler solution.




For performance, I have a server generated list of 10 posts. I then created a Vue.js list



To keep performance high, I'm only showing the ten latest posts on page load. Visitors can search for posts using the input or show them all if they prefer to browse.

Steps to creating a search input:
1 


Want
- toggle visibility of two lists
- only need to hide HTML list once!!!
- don't need show all buttons if vue list visible. So, on search, hide them.
- Why not just show all posts on load?!!
- confusing for user if suddenly have more posts?
- vue list visible on search
- vue list visible on show all button
- show all buttons hide on press

Move visibility of lists to method?




0.4.1 Create app on div DONE

List all post titles and URLs in JSON just before main.js

https://gist.github.com/mh61503891/544d3c1eefd00b1012463b860222d34f

Initially show last 10 posts. On search, hide this and show results.

https://codepen.io/AndrewThian/pen/QdeOVa
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes#Polyfill

https://markjs.io/

https://jsfiddle.net/HubertWang/t5ac1quc/

Add count to under label or as part of label?

https://tympanus.net/Development/TextInputEffects/

This effect uses JS to make sure it doesn't revert if it has content. I need a conditional class with vue.

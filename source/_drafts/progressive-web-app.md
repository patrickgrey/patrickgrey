---
title: Making my website a Progressive Web App
date: 2018/01/13
description: Making my website a Progressive Web App.
tags:
- javascript
- offline
- progressive web app
- workbox
---
### Feature Aim
Make the index page available offline and allow visitors to save posts offline.

### Development Notes
- Save index offline
- Allow cache to update when new posts are added.
- Add button to save post offline?

First problem. Can't get manifest to load - note that I don't think it loads on desktop browsers but only on mobile. I had to clear the hexo database a couple of times and eventually it was found.

So I offer visitors a button to save posts offline? The alternative is to just add posts automatically. I think my pages are generally so small that automatic adding is a good approach.

However, I want visitors to know that they can access posts even if they don't have a signal. This is a design issue. My first approach will be to add a simple green block div with a tick, below the date, saying that post is available offline!


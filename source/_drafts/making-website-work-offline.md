---
title: Making my website work offline
date: 2018/01/21
description: Using service workers and caching to allow visitors to read my website offline.
tags:
- javascript
- offline
- Service workers
- Progressive Web App
---


I dived straight into learning the Service Worker code. I guess that helped familiarise myself with its capabilities but it was the wrong starting point. In the end, the biggest challenge was working out the exact user experience so I could then design the caching system. HTML pages needed a different approach from assets like CSS and Javascript. Even then, different HTML pages, like the index page needed a different approach from blog posts. It's all dependent on how often you expect the content of these assets to update.

Once the site design is v1.0.0 and settled, I don't expect things like CSS or Javascript to change that often. 



Link back to analogy.


- Save index offline
- Allow cache to update when new posts are added.
- Add button to save post offline?

First problem. Can't get manifest to load - note that I don't think it loads on desktop browsers but only on mobile. I had to clear the hexo database a couple of times and eventually it was found.

So I offer visitors a button to save posts offline? The alternative is to just add posts automatically. I think my pages are generally so small that automatic adding is a good approach.

However, I want visitors to know that they can access posts even if they don't have a signal. This is a design issue. My first approach will be to add a simple green block div with a tick, below the date, saying that post is available offline!

#### Offline
I know about [Workbox](https://developers.google.com/web/tools/workbox/) but I feel I should learn the basics before using a library.

### Research
- https://classroom.udacity.com/courses/ud899/
- https://developers.google.com/web/tools/workbox/

TODO:
- Offline analytics?
- Add revisioning to service worker.
- Set caching on firebase - max-age non-mutable content, short cache mutable.
- https://developers.google.com/web/ilt/pwa/lab-caching-files-with-service-worker 
- https://github.com/google-developer-training/pwa-training-labs.git 
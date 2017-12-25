---
title: Brutally Simple Website Design
date: 2017/12/11
description: Notes on my approach to designing my site and the CSS implementation.
---
My aim was to start with simple design that performs well. I used the Lighthouse (https://github.com/GoogleChrome/lighthouse) chrome plugin to run a performance, SEO and accessibility audit.

<img class="pg-image-post-full pg-image-post-border" src="/2017/12/brutalist-website-design/lighthouse-result-01.jpg">

This seems like a decent starting point. I'll aim to keep the scores around this as I add new features.

## Notes

I took a mobile first approach, which I've always found works well.

One tricky bit was having an 'about' section that is fixed on desktop but aligned with the rest of the content on smaller screens. Simple enough. However, on the home page I wanted this information at the top of the page but on blog post pages, such as this one, I wanted it at the bottom. I also didn't want duplicate the content.

This is where the static site generator came in handy because the same block of code can have a different class on different page types:

```javascript
<%- partial('_partial/about', {class_name: 'pg-post-about'}) %>
```

I suspect there is a better, cleaner way to do this with Flex or Grid but I will modernise this in future.

Cross-browser consistency was checked on Browserstack.
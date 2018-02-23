---
title: Brutally Simple Website Design
date: 2017/12/11
description: Notes on my approach to designing my site and the CSS implementation.
tags:
- design
- hexo
- lighthouse
---
<figure>
  <img class="pg-image-post-full pg-image-post-border" src="/2017/12/brutalist-website-design/geocities01.png" alt="Screenshot of an archived Geocities website.">
  <figcaption>Screenshot of an archived Geocities website (http://www.oocities.org/area51/1210/) plus midi music - what's not to like?</figcaption>
</figure>


I'm (clearly) not a trained designer but I really enjoy going through a process when creating a new design from scratch:

- Write out a set of requirements.
- Sketch out some high level ideas.
- Start building them out.
- Iterate, iterate, iterate as you notice things that do and don't work. This is the fun bit, chipping away at a design is like watching a sculpture emerge. Fortunately I have an undo button for when I lop the nose off.


### Requirements
I wanted to create a site that is easy to navigate, read, is accessible and is as performant as I can make it. 

### Ideas and research
My first website was on Geocities under the name "gingerbitsjock". Let's not go there. Ah man, that was in the 90's. I'm old.

I miss those days as I suspect others do. After a while, I just get bored of super slick design. So, my starting point was to keep things basic. This brings it's own benefits as you can focus on clarity for the user and it is easier to keep a website performant. OK, the 200 animated gifs on a standard Geocities page maybe weren't at the cutting edge of performance... A simple design requires less CSS and minimal interactivity keeps the JavaScript low. It makes maintenance easier too.

Brutalist design appeals to me. It is bold. I had a look round a few ideas:
- https://www.awwwards.com/brutalism-brutalist-websites.html
- http://brutalistwebsites.com/
- https://medium.com/envato/brutalism-the-ugly-web-design-trend-taking-over-the-internet-2dbc8e822e37

All of the sites were bold. Many were very clear and easy to read. Contrast is high and colours are few.

### Development Notes
Hopefully you can see some of these influences in my design; the small splash of colour, the heavy link colours. Another benefit: nicely contrasting colours for better accessibility!

I took a mobile first approach, which I've always found works well.

One tricky bit was having an 'about' section that is fixed on desktop but aligned with the rest of the content on smaller screens. Simple enough. However, on the home page I wanted this information at the top of the page but on blog post pages, such as this one, I wanted it at the bottom. I also didn't want duplicate the content.

This is where the static site generator ([Hexo is detailed in my post about static site generators](/2017/12/hexo-static-site-generator-setup/)) came in handy because the same block of code can have a different class on different page types:

```javascript
<%- partial('_partial/about', {class_name: 'pg-post-about'}) %>
```

I suspect there is a better, cleaner way to do this with Flex or Grid but I will modernise this in future.

I used the [Lighthouse](https://github.com/GoogleChrome/lighthouse) chrome plugin to run a performance, SEO and accessibility audit.

<img class="pg-image-post-full pg-image-post-border" src="/2017/12/brutalist-website-design/lighthouse-result-01.jpg" alt="Results of Lighthouse performance and accessibility audit. Performance: 98, accessibility: 100, Best practices: 94, SEO: 100.">

This seems like a decent starting point. I'll aim to keep the scores around this as I add new features.

Cross-browser consistency was checked on Browserstack.
---
title: Brutally Simple Website Design
date: 2017/12/11
description: Notes on my approach to designing my site and the CSS implementation.
---
My aim was to start with simple design that performs well. I used the Lighthouse (URL) chrome plugin to run a performance, SEO and accessibility audit.

Image of Lighthouse test locally 

This seems like a decent starting place. I'll aim to keep the scores around this as I add new features.

## Notes

The layout was tricky. I used a mobile first approach which I've always found works well. One tricky bit was to have a fixed 'about' section on desktop but which appears at the top on the home page but at the bottom on a post page when viewed on mobile. This is where the static site generator came in handy because the same block of code can have a different class on different page types.

Cross-browser consistency was checked on Browserstack.

I suspect there is a better, cleaner way to do this with Flex or Grid but I will modernise this in future. 
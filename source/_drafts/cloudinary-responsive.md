---
title: Responsive images with Cloudinary
description: Automating the creation of images targetting the current device.
date: 2018-02-24 10:44:18
tags:
---
<figure>
  <img 
    srcset="martin-reisch-199362-unsplash-370.jpg 370w,
             martin-reisch-199362-unsplash-624.jpg 624w,
             martin-reisch-199362-unsplash-1024.jpg 1024w"
    sizes="100vw,
          (min-width: 600px) 600px,
          (min-width: 1420px) 1024px"
    src="/cloudinary-responsive/martin-reisch-199362-unsplash-1024.jpg" width="100%">
  <figcaption>Photo by Martin Reisch on Unsplash</figcaption>
</figure>

I do a fair bit of driving, listening to podcasts as I go. My current web development favourites are [ShopTalk](http://shoptalkshow.com/) and [Syntax](https://syntax.fm/) (non-dev favourites are [Planet Money by NPR](https://www.npr.org/podcasts/510289/planet-money) and the brilliant [Indicator](https://www.npr.org/sections/money/567724614/the-indicator): five minute, well researched mini-documentaries).

The Syntax lads were discussing dealing with images and mentioned using Cloudinary to create responsive images by dynamically generating `<picture>` elements. They didn't go into detail - dammit, there goes my cut and paste plan. This would be a useful way to keep on top of my site performance so I decided to try and do this in Hexo.

### The Plan
- Work out how to get Cloudinary to deliver multiple versions of an image depending on screen size: https://cloudinary.com/documentation/responsive_images, https://cloudinary.com/blog/responsive_images_with_srcset_sizes_and_cloudinary 
- Create a picture element using those URL's
- Find out how to do that dynamically, maybe creating a Hexo plugin that gets the media query values from a config file.

### Justification
I have a ton of stuff on just now so is this a good use of my time. Yes, I need to keep doing new and interesting things to keep my work fresh. It's a new skill - never a bad thing, even if it doesn't seem applicable to my paying job just now.

### Research
First, what was the target markup I'm looking to create? I've lost track of whether the `<picture>` element should be used or the `srcset` attribute. Based on https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images, I had forgotten the purpose of each. `srcset` is used to deliver different size images based on media queries, the `<picture>` element is for art direction: different images e.g. portrait vs landscape depending on context.

I'll implement locally with manually created images before using Cloudinary. I need the media queries first. I did this my loading the image normally and then resizing my page to my normal break points to check what size it is.

*image here of dev tools showing image width*

Image widths according to devtools:
- Laptop = 728 (I may have a larger breakpoint on big screens, must check) - I'll use 1024
- Tablet = 624
- mobile = 370

Breakpoints in CSS:

- mobile first 100%
- tablet: 600px
- the rest: 1420px

My code looks like this:
```html
<figure>
  <img 
    srcset="martin-reisch-199362-unsplash-370.jpg 370w,
             martin-reisch-199362-unsplash-624.jpg 624w,
             martin-reisch-199362-unsplash-1024.jpg 1024w"
    sizes="(max-width: 1420px) 1024px,
            (min-width: 600px) 600px,
            100vw"
    src="/cloudinary-responsive/martin-reisch-199362-unsplash-1024.jpg" width="100%">
  <figcaption>Photo by Martin Reisch on Unsplash</figcaption>
</figure>
```

 Apparently to test this I have to use Firefox as Chrome serves cached images which means I can't test what is delivered from the network.
 
 OK, first test and mobiles are getting the largest image and full screen gets the smallest. Something may be going wrong here... Ah, I had `max-width` as the first media query, careless copy paste. I changed that and it now delivers different images in the order I expect but they are not triggered when I expect. E.g the 624px image is delivered when the screen is at 370px (that should be a clue!)
 
 Time to read the docs again as I'm not clear what the slot size part is about after the media query.
 
 I presume the order images appear matches the order of the size list. Check that.
 
 




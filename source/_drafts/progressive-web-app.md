---
title: Making my website a Progressive Web App
date: 2018/01/15
description: Making my website a Progressive Web App.
tags:
- javascript
- offline
- progressive web app
- workbox
---
### Feature Aim
Make the pages available offline.

### Development Notes

I've heard different explanations of what a Service Worker is. They are often technical, talking about them being a proxy between the browser and the server. I've also heard them called an [Alien](https://una.im/save-offline/#the-service-worker) that lives on your page. I like more human friendly descriptions like this when trying to understand a concept.

Here is my attempt at a brilliant analogy.

Sue and Bob have opened a Banjo and Booze shop. In order to make their shop (a website) more efficient, Bob (the browser) stays at the counter to take customer orders while Sue (the Server) stays in the store room upstairs - lucky Sue - waiting for a request from Bob so she can pick the alcohol and music related goods and send them down stairs via a slide. Being a good old fashioned shop, Bob simply shouts up to Sue what he needs.

As you are in need of light refreshment and a new musical hobby, you pop in and ask for a bottle of sherry and a banjo (you click a link on the website). Bob shouts up to Sue (a Network Request from the browser) and Sue pushes the goods down the slide to Bob (a Network Response from the server containing HTML, CSS, JS etc). You are a happy punter.

Now, there is a doorway (the Internet) at the top of the stairs, through which Bob has to shout. Sometimes, a [wind of change](https://www.youtube.com/watch?v=n4RjJKxsamQ) blows through the shop and the door closes (you are offline). Now Sue can't hear Bob and no matter how hard he shouts, nothing comes down the slide. You are not a happy punter and have to go home unrefreshed and find another hobby, like reading an actual real book.

Sometimes, the wind only blows the door almost shut ([li-fi](https://twitter.com/jaffathecake/status/618451541658312704)) and much hilarity ensues as Bob shouts up an order but is unable to properly hear the response of, "What, I didn't quite catch that???", "I said, 'Some Creme de Menthe and a Banjo'", "Cream of the month and...", "What??", "What!!???"... Now you have waited in the shop so long while this farce continues that you don't even have time to read an actual real book.

Sue has had enough of this nonsense and calls her friend Rita (the Service Worker) in to help out. Rita stays at the bottom of the stairs and passes Bob's requests on to Sue. Now Bob doesn't have to shout.




 in the  (a network request), while Sue (the Server) stays in the store room upstairs and sends the wine and banjo down a slide (the network response including HTML, JS, CSS etc).

When a punter (you) comes into the shop (the website), 


you order a bottle of wine and a banjo (you click the wine and banjo button on the website). In order to make their shop more efficient, Bob (the browser) takes your order (a network request), while Sue (the Server) stays in the store room upstairs and sends the wine and banjo down a slide (the network response including HTML, JS, CSS etc).



I dived straight into learning the Service Worker code. I guess that helped familiarise myself with its capabilities but it was the wrong starting point. In the end, the biggest challenge was working out the exact user experience so I could then design the caching system. HTML pages needed a different approach from assets like CSS and Javascript. Even then, different HTML pages, like the index page needed a different approach from blog posts. It's all dependent on how often you expect the content of these assets to update.

Once the site design is v1.0.0 and settled, I don't expect things like CSS or Javascript to change that often. 






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
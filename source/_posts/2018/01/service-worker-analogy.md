---
title: What is a Service Worker? (An explanation via terrible analogy).
date: 2018/01/20
description: An analogy of what a Service Worker is and what is does.
tags:
- javascript
- offline
- Service workers
---
<style>
.pg-sw-analogy {
  color: Fuchsia;
}
</style>

I've heard different explanations of what a Service Worker is. They are often technical, talking about them being a proxy between the browser and the server. I've also heard them called an [Alien](https://una.im/save-offline/#the-service-worker) that lives on your page. I like more human friendly descriptions like this when trying to understand a concept.

Here is my attempt at a brilliant analogy.

### A wee story

Sue and Bob have opened a Banjo and Booze shop. In order to make their shop <span class="pg-sw-analogy">(a website)</span> more efficient, Bob <span class="pg-sw-analogy">(the browser)</span> stays at the counter to take customer orders while Sue <span class="pg-sw-analogy">(the Server)</span> stays in the store room upstairs - lucky Sue - waiting for a request from Bob so she can pick the alcohol and music related goods and send them down stairs via a chute. Being a good old fashioned shop, Bob simply shouts up to Sue what he needs.

As you are in need of light refreshment and a new musical hobby, you pop in and ask for a bottle of sherry and a banjo <span class="pg-sw-analogy">(you click a link on the website)</span>. Bob shouts up to Sue <span class="pg-sw-analogy">(a Network Request from the browser)</span> and Sue pushes the goods down the slide to Bob <span class="pg-sw-analogy">(a Network Response from the server containing HTML, CSS, JS etc)</span> who gives them to you <span class="pg-sw-analogy">(displays what you wanted)</span>. You are a happy person.

Now, there is a doorway <span class="pg-sw-analogy">(the Internet)</span> at the top of the stairs, through which Bob has to shout. Sometimes, a [wind of change](https://www.youtube.com/watch?v=n4RjJKxsamQ) blows through the shop and the door closes <span class="pg-sw-analogy">(you are offline)</span>. Now Sue can't hear Bob and, no matter how hard he shouts, nothing comes down the chute. You are not a happy person and have to go home unrefreshed and find another hobby, like reading an actual real book.

Sometimes, the wind only blows the door almost shut <span class="pg-sw-analogy">([lie-fi](https://twitter.com/jaffathecake/status/618451541658312704))</span> and much hilarity ensues as Bob shouts up an order but is unable to properly hear the response of, "What, I didn't quite catch that???", "I said, 'Some Creme de Menthe and a Banjo'", "Cream of the month and...", "What??", "What!!???"... Now you have waited in the shop so long while this farce continues that you don't even have time to read an actual real book. Most frustrating.

Sue has had enough of this nonsense and calls her friend Rita <span class="pg-sw-analogy">(the Service Worker)</span> in to help out. Rita stays at the bottom of the stairs and passes Bob's requests on to Sue. Now Bob doesn't have to shout. Now, Rita is smart and starts to realise that things go quicker if she keeps a stack <span class="pg-sw-analogy">(the Browser Cache)</span> of the most popular goods - banjos, obviously, and probably bloody Prosecco - with her at the bottom of the stairs. Now when Bob passes on a customer request, she simply hands the goods straight through to him and doesn't have to bother Sue. 

Even better than that, if there is a problem with the upstairs door <span class="pg-sw-analogy">(connectivity)</span>, you can still choose from a selection of the most popular items. Let us drink and make sweet, sweet music! All thanks to Rita and her stack of bubbles and banjos.

Furthermore, Rita could check the sell-by date <span class="pg-sw-analogy">(the asset version)</span> on her stock. She could pass, say, a bottle of Advocaat from her stack to the customer so they can, er, read the label straight away, then check with Sue if she has anything fresher <span class="pg-sw-analogy">(an updated version of an HTML page for example)</span>. The customer can choose to replace the bottle with a newer one as, let's face it, no one wants nearly out of date Advocaat. Can you hear the analogy creaking...?

The point is that with Rita helping out, Bob and Sue have many more options on how to organise their shop and make Booze and Banjo enthusiasts happy! END
---
title: Firebase hosting setup
date: 2017/12/13
description: Steps involved in adding my website to firebase hosting.
tags:
- firebase
---
### Feature Aim
Use Firebase to host my blog.

### Development Notes
I chose firebase as it adds https://letsencrypt.org/ https certificate for free. The firebase client is also pretty handy.

Log into the console at: https://console.firebase.google.com

Add a new project. I like to give it a long enough title so that there isn't a randomly generated suffix. So, instead of patrickgrey-09CG5 I used patrickgrey-production.

Select the project and then hosting.

Open terminal (http://cmder.net/ in my case). You will require [node](https://nodejs.org/) to be installed on your machine. Enter
```javascript
npm install -g firebase-tools
```
Sign in to Google:
```javascript
firebase login
```
Initiate your project:
```javascript
firebase init
```
On init, you are guided through a wizard. Part of that is the generated content directory.

Add your generated static files to your deploy directory (the default is public).

Hexo usefully uses public as the generated content folder too! If your project outputs to a different directory, you can change it here.

I do not wish to have a Single Page App (at this stage). So select No for this option and for overwriting the index.html file already there.

Deploy your website:
```javascript
firebase deploy
```
I test the URL provided by Firebase (https://patrickgrey-production.firebaseapp.com/) and all is well. I also checked the scores on the doors with Lighthouse and were good - a couple of tweaks required and not an amazing achievement with such a simple site to be honest. Just noticed the accessibility score has dipped... as a result of not putting alt text in this image - more irony than Alanis Morissette (fixed in later releases of website).

<img class="pg-image-post-full pg-image-post-border" style="max-width:593px;" src="/2017/12/firebase-hosting/hosted-lighthouse-audit.gif" alt="Results of Lighthouse performance and accessibility audit. Performance: 97, accessibility: 94, Best practices: 94, SEO: 100.">

The next step is to point my domain name to this hosting. I selected "Connect Domain" in the firebase hosting control panel. It asks for the name of the domain you wish to connect to. I included the www as I read this was a good thing somewhere, dunno where. Proper web dev knowledge that!

I did not select the redirect option.

You are provided with a TXT value to enter on the DNS record of your domain provider ot verify ownership. I did this but was warned this can take up to 24 hours to promulgate. I then realised that on my domain host I didn't include the www host name so I added another TXT value for patrickgrey.co.uk

After two hours, the site was verified. I was then provided two *A records* (IP numbers I entered on my domain providers website - I deleted the existing ones). For host, both had www.patrickgrey.co.uk so I'm going to wait and see what happens when I just visit patrickgrey.co.uk...

When I finished the wizard, I was given the option to connect patrickgrey.co.uk as well so I guess Firebase is taking care of that!

Edit: not entirely, I still need to set it up by adding two *A records* for patrickgrey.co.uk as well.

Now when I visit www.patrickgrey.co.uk, I get a warning that the connection is not private. This is expected as the https certificate takes some time to be issued. Now I had to wait for the DNS to point to the correct hosting. 

It worked! :-)
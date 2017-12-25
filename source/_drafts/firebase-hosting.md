---
title: Firebase hosting
date: 2017/12/13
description: Steps involved in adding my website to firebase hosting.
---
Log into the console at: https://console.firebase.google.com

Add a new project. I like to give it a long enough title so that there isn't a randomly generated suffix. So, instead of patrickgrey-09CG5 I used patrickgrey-production.

Select the project and then hosting.

Open terminal (http://cmder.net/ in my case) and enter
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
I test the URL provided by Firebase (https://patrickgrey-production.firebaseapp.com/) and all is well.

I ran lighthouse against the site and this seems to be a pretty solid base to start from.

IMAGE HERE.

The next step is to point my domain name to this hosting.

---
title: Firebase hosting
date: 2017/12/11
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
Add your static files to your deploy directory (the default is public).
Deploy your website:
```javascript
firebase deploy
```

---
title: Travis Continuous Integration with Hexo
tags:
date: 2017/12/27
description: Steps to get Travis Continuous Integration up and running with my website.
---
https://github.com/ebidel/lighthouse-ci
https://docs.travis-ci.com/user/deployment/firebase/
https://github.com/GoogleChrome/puppeteer
http://kflu.github.io/2017/01/03/2017-01-03-hexo-travis/

By reading Travis documents, the service copies the repo, builds the hexo account and runs tests, just as you would locally using your command line. It can also be used to deploy to Firebase. I'll start with a simple build success then add deploy to firebase then add tests and audits if I can.

- Sign up to Travis and allow it to access GitHub account.
- Activate repository for website.
- Add a .travis.yml file to root.

For the first test, I just added:
```yaml
language: node_js
node_js:
  - "iojs"
  - "8"
```
This runs the latest stable version of node and v8.

Next I added more travis features:
```yaml
branches:
  only:
  - master
install:
- npm install
script:
- hexo generate
```
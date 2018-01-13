---
title: Travis Firebase deploy
description: Steps to get Travis Continuous Integration up and running and deploying to Firebase.
date: 2017-12-27 00:00:00
tags:
- travis
- firebase
---
### Feature Aim
Set up basic Continuous Integration to build on a push to github master branch and deploy to Firebase if successful. 

### Development Notes
I selected Travis over Jenkins as I didn't want to host my own service.

Travis copies your repo, builds it based on your travis config file and runs any tests. If the build and tests pass, the deployment can happen.

- Sign up to Travis and allow it to access GitHub account.
- Activate repository for website.
- Add a .travis.yml file to root.

.travis.yml v1:
```yaml
language: node_js
node_js:
  - "8"
  - "iojs"
```
This runs v8 of node and the latest stable version so you can see if you will have problems ahead.

Push to github and check the https://travis-ci.org/.

.travis.yml v2:
```yaml
language: node_js
node_js:
  - "8"
  - "iojs"
branches:
  only:
  - master
before_install:
  - npm install -g firebase-tools
  - npm install -g hexo
install:
  - npm install
script:
  - hexo generate
```
Only build on push to master, install dependencies and generate the site.

In order for Travis to deploy to Firebase, it needs a token for authorisation. The Travis docs recommend using firebase-tools to generate and then encrypt it using the Travis CLI. However, this is Ruby based and I am trying to stick to the node/windows environment only. Turns out I can add the token securely as an environment variable via the Travis website.

Generate a token:
```yaml
firebase login:ci
```
This opened a web page asking to give firebase CLI permission to do this. Once confirmed, a token is provided in the command line.

Add the token to the Environment Variables section with the name FIREBASE_TOKEN.

.travis.yml v3:
```yaml
language: node_js
node_js:
  - "8"
  - "iojs"
branches:
  only:
  - master
before_install:
  - npm install -g firebase-tools
  - npm install -g hexo
install:
  - npm install
script:
  - hexo generate
after_success:
  - firebase deploy --token $FIREBASE_TOKEN
```

It worked! :-) Well I never!

Postscript: well, not quite. In the Travis log (very handy), it notes that the script load for primsjs.js failed as it couldn't find the module 'node-prismjs'. It works locally. Hmmmm. I think possibly because this dependency is missing from package.json. OK, getting somewhere. Looks like I need to add all dev dependencies for the script in package.json. Yes, npm install with --save-dev for all node modules mentioned in script fixes the issue! A lot of work but shouldn't have to revisit.

References:

- https://github.com/ebidel/lighthouse-ci
- https://docs.travis-ci.com/user/deployment/firebase/
- https://github.com/GoogleChrome/puppeteer
- http://kflu.github.io/2017/01/03/2017-01-03-hexo-travis/
- https://medium.com/@jamzi/continuous-everything-with-angular-travis-ci-firebase-and-greenkeeper-6656543bd826
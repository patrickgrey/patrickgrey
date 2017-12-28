---
title: Travis Continuous Integration with Hexo
description: Steps to get Travis Continuous Integration up and running with my website.
date: 2017-12-27 00:00:00
tags:
---

From reading the Travis documents, I understand the service copies the repo, builds the hexo website and runs tests, just as you would locally using your command line. It can also be used to deploy to Firebase or check dependencies with tools like Greenkeeper. I'll start with a simple build success then add deploy to firebase then add tests and audits if I can.

- Sign up to Travis and allow it to access GitHub account.
- Activate repository for website.
- Add a .travis.yml file to root.

For the first test, I just added:
```yaml
language: node_js
node_js:
  - "iojs"
```
This runs the latest stable version of node.

I push the change and check the https://travis-ci.org/ website and see that the build is running. How exciting!

Next I added more travis features to install all node dependencies and run the hexo generate cli command:
```yaml
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
Now to try a firebase deploy which would finally make this service useful!! In order for Travis to deploy to Firebase, it needs a token for authorisation. The Travis docs recommend using firebase-tools to generate and then encrypt it using the Travis CLI. However, this is Ruby based and I am trying to stick to the node/windows environment only. Turns out I can add the token securely as an environment variable on the Travis build via the Travis website.

So the steps are to run this to get the token.
```yaml
firebase login:ci
```
This opened a web page asking to give firebase CLI permission to do this. Once confirmed, a token is provided in the command line.

In the setting section on the Travis website repo, I added the token to the Environment Variables section with the name FIREBASE_TOKEN.

In .travis.yml I added:
```yaml
after_success:
  - firebase deploy --token $FIREBASE_TOKEN
```

It worked! :-) Well I never!

Postscript: well, not quite. In the Travis log (very handy), it notes that the script load for primsjs.js failed as it couldn't find the module 'node-prismjs'. It works locally. Hmmmm. I think possibly because this dependency is missing from package.json. OK, getting somewhere. Looks like I need to add all dev dependencies for the script in package.json. Nope, now more problems. Might need to roll with the original plugin.

References:

- https://github.com/ebidel/lighthouse-ci
- https://docs.travis-ci.com/user/deployment/firebase/
- https://github.com/GoogleChrome/puppeteer
- http://kflu.github.io/2017/01/03/2017-01-03-hexo-travis/
- https://medium.com/@jamzi/continuous-everything-with-angular-travis-ci-firebase-and-greenkeeper-6656543bd826
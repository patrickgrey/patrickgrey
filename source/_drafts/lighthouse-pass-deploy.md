---
title: Only deploy if passes Lighthouse test
description: Adding a Mocha test integrating Lighthouse to check performance and accessibility before deploying to Firebase.
date: 2017-12-29 10:44:18
tags:
---
I wanted to maintain high levels of performance and accessibility on my site.

https://www.npmjs.com/package/lighthouse is a good resource for Lighthouse and it pointed me to https://github.com/justinribeiro/lighthouse-mocha-example.

If I have a staging server, I could deploy to that, then test on lighthouse?

https://github.com/ebidel/lighthouse-ci


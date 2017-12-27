---
title: updating Node On Windows
tags: node
---
I wanted to update Node on my Windows (10) machine. Searching took me to https://davidwalsh.name/nvm. Looks like a complete reinstallation might create problems on my PATH environment variable so I'd like to avoid that problem.

I looked up the [nvm GitHub page](https://github.com/creationix/nvm) and discovered this doesn't support Windows. However, it did point me to [nvm-windows](https://github.com/coreybutler/nvm-windows) and after reviewing stability, I decided to install it.

I downloaded the "nvm-setup" file and ran that. The wizard asks where the jode folder should be (C:\Program Files\nodejs). I wondered whether this would impact the currently installed version of node I have.

After proceeding, it looks like NVM takes care of this. Nice!
---
title: Hexo Static Site Generator Setup
date: 2017/12/12
description: The steps I took to set up Hexo.
---
I like Static Site Generators. Performance and security.

I wanted a node-based CMS as it's a familiar environment.

I looked at [https://nuxtent.now.sh/guide](https://nuxtent.now.sh/guide) for a static blog generator but woah, that seems overly complicated for what it&#39;s meant to do.

I chose [https://hexo.io/](https://hexo.io/) as it is stable and quick to get started with for a simple blog. 

Creating a custom theme took a little reading of the docs but I mainly looked at how the provided template worked and cannibalised the parts I needed.

<img class="pg-image-post-full pg-image-post-border" style="max-width:378px;" src="/2017/12/hexo-static-site-generator-setup/hexo-theme-templates.gif">

My theme only really contains four template files in the layout folder:

- layout.ejs: the top level template containing header, body and main container div
- index.ejs: the landing page, including a list of posts
- post.ejs: post content template
- about.ejs: a &quot;partial&quot; or chunk of HTML that is reused in the index and post pages.

To keep my post files manageable, I've grouped posts into year and month folders. I was expecting issues with this but Hexo seems to handle it fine.

I wanted to use http://prismjs.com/ as a code formatter and found a good plugin: https://github.com/ele828/hexo-prism-plugin. However, this would require an extra CSS link and I wanted to combine the relatively little CSS with my own to maximise performance (maybe not an issue with http/2 right enough).

To get round this problem, I extracted the plugin JS file, commented out the part that added the CSS link and added it to my theme scripts folder where it runs automatically.

Hexo offers several [Helpers](https://hexo.io/docs/helpers.html) but I'm avoiding contaminating post Markdown with these. This should make the site easier to transfer to another CMS in future if required.
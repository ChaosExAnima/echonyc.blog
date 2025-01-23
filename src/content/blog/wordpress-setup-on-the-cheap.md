---
title: 'WordPress Setup on the Cheap'
date: '2019-01-11'
categories:
    - 'wordpress'
tags:
    - 'help'
    - 'tech'
---

Hi there! Been a hot minute.

I just finished setting up moving over [Sinking Ship Creations](http://sinkingshipcreations.com) to their new WordPress site, away from Wix. The move was a bit bumpy, though mostly in the approvals department.

Some scattered thoughts that may or may not be useful to folks looking to do the same:

- Resist the urge to install lots of plugins. Many of the bigger plugins or even vanilla WordPress provides the functionality you want. If they don't, ask yourself whether the plugin you want will be overkill. I've seen so many sites get sluggish because of the sheer number of one-off plugins.
- You can be cheap! Most sites don't have high traffic that would require a fancy hosting plan. A basic [Dreamhost](https://www.dreamhost.com/wordpress/) or [Bluehost](https://www.bluehost.com/special/wordpress) plan can work.
- Do you have lots of areas with different visual styles? Or different subsites? Think about a [WordPress Multisite](https://codex.wordpress.org/Create_A_Network)! You can do a lot of interesting things with these subsites.

Some plugins I recommend:

- Do you really want to worry about moderating comments? No? [Disable Comments](https://wordpress.org/plugins/disable-comments/) is your friend.
- [Jetpack](https://wordpress.org/plugins/jetpack/) is very helpful. It provides a free image CDN, one click login, lazy loading images, and other neat features. It'll ask for paid plans, but I've never really felt the need to use these?
- I have very mixed feelings about [Yoast SEO](https://wordpress.org/plugins/wordpress-seo/). Yes, it's very popular and well maintained, but it's also spammy and some parts don't work well for larger sites. For smaller sites where SEO is a concern though, I'd recommend it.
- Do you have a contact form (which Jetpack provides, FYI!), but are worried about spam? Or for some reason do you want comments? Try [Akismet](https://wordpress.org/plugins/akismet/)! It should be pre-installed, but if not it's a fast signup for a free key.
- Are you setting things up and don't want your site exposed to the public yet? I use [Restricted Site Access](https://wordpress.org/plugins/restricted-site-access/), a very powerful tool to lock folks out you don't want yet.
- Do you need redirects? [Safe Redirect Manager](https://wordpress.org/plugins/safe-redirect-manager/) is really good, though I wouldn't recommend going too crazy with it. Once you get past 50 redirects thing start to bog down, so I'd look for other options there.
- Need some speed? There's a lot of plugins out there, but I tend to lean on [WP Super Cache](https://wordpress.org/plugins/wp-super-cache/) in most situations. You may not need it though, many hosts have caching set up already.

Okay, I need to go. But I hope this is helpful!

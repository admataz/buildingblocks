---
author: Adam Davis
date: 2013-12-15
description: We recently upgraded some client sites from Drupal 6 to Drupal 7. It was more work than we had hoped for. 
keywords: drupal 6, Drupal 7, migration,
title: Migrating a large active and customised Drupal 6 site to Drupal 7  
published: true
---

Migrating a large active and customised Drupal 6 site to Drupal 7
=================================================================

We had an existing customised Drupal 6 site that needed some general updates, and we thought, while we were here working on themes and features, let's to do a major upgrade the Drupal framework too!  This was a a bigger job than we had anticipated - but on reflection still the right thing to do.   

## You can't just click the "Upgrade to Drupal 7" button
Automatic scripted updates are a nice idea - particularly as they are relatively effortless and repeatable. There are some good tools with Drush that will help with your migration from Drupal 6 to Drupal 7.  They are not straightforward, and will not leave you with a complete migration - there will still be manual work to do - but they help get you started. 

The biggest problem we found with automated update scripts is that they also migrate our junk - the old ways of doing things from before we knew better, or were hacks to get around the limitations of Drupal 6. A large proportion of the value of a site redesign to us is the renewal aspect: a chance to improve the code and make things work better.  If upgrading a major version of Drupal is like moving house - automatic updates is leaving the movers to do your packing without sorting out what you want to take first.

The site was going through some major changes to the theme, architecture and functionality so we could justify a larger site rebuild. This has given us the opportunity to clean up things, and apply some better practices we had learned over the years.

## Migrating content
With a fresh base install on a new version of Drupal, the challenge turns to migrating content. There is a contributed a module called Migrate, which has support for scripting Drupal-to-Drupal migrations of content, but I could not get me head around it, so I wrote my own set of database migration scripts using node.js. It took some learning of the inner mechanics of Drupal's database but eventually I came up with a set of scripts that could be re-run at any point during the new site development to bring the latest live content to the dev version.


Here are the steps we took to migrate the site:

1. consolidation/prep phase
----------------------------
-  run some predefined SQL manually to get rid of some content I did not want to migrate (this was particular to the site in question)
-  [consolidate all features](https://drupal.org/node/1014522#comment-6458448) after applying [this patch](https://drupal.org/files/features-consolidate-1014522-75.patch) to deal with some problems when using Features.
- We were using multigroups for repeatable field groups in CCK and Drupal 6. It was only available in an alpha version of CCK, and was bound to make us suffer later. The D7 way is to use a module called Field Collection, which sets up entities as fields. To migrate multigroups to Field Collections we first had to turn them into normal ungrouped fields. We would later run a script to put them into Field Collections for Drupal 7. 
- disable unused and incompatible modules. There's no point in migrating stuff you don't want. 

Do the upgrade: 
--------------------
- enable update module if it's not enabled `drush en update`
- [Drush Site Update](https://drupal.org/project/drush_sup)
- [Follow these instructions](http://drupalcode.org/project/drush_sup.git/blob/refs/heads/7.x-2.x:/README.txt)
- run this command: `drush sup @upgrade_profile_name --core-unmodified`
- this _should_ go without hitch - and only a few confirmation steps, if any

Run some post migration tasks
--------------------------
- new D7 modules we identified as appropriate for the new site are installed
- any remaining CCK migrations and content type definitions that did not come through ok 
- Taxonomy vocabs are all auto-named in their machine name - need to be renamed manually if you want them to be meaningful
- Related to above - Fields referring to Taxonomy vocabs need to be renamed
- We wrote a script to do this (see [this post](https://drupal.org/node/1130386))
- Convert all references to entity references. NOTE: doing this in drush also converts all taxonomy fields by default, which is not desirable - if it has to be done in drush do each field manually - otherwise use the gui
- PathAuto alias patterns need to be reset to D7 tokens


Post migration content migration scripts
-----------------------------------
At this point we have a working version of the site structure and content on a new site based on Drupal 7. It's not perfect or complete, but it runs, and is a good base to continue development of new themes and modules. To give us the freedom to develop and get this right, we wrote some scripts that enable us to empty the new site of all content, and re-import everything from the old site. In theory, being scripted,  this can be run regularly during development to keep the content of the two versions of the site in sync while development continues. 


Is it worth it?
---------------
Yes. Drupal 6 was showing its age, and the benefits of Drupal 7 and our improved knowledge of it make it an easier platform for us to write good code. I am happy with how the fresh clean slate we have in a new version without so much cruft. We are now monitoring and improving performance of the site.


Staging content and managing publication of content to live using Drupal
========================================================================

A website backed by a Content Management System can be great for site owners. The CMS allows the writers editors to do what they do best; once the site is launched they can keep it up to date with great new articles and pages.  Bar the odd support call and feature addition, the web developers can be left to tend to their yachts. Everyone wins. Or so the theory goes. 

One of the most compelling arguments for using Drupal on a project is it's built-in admin interface. Drupal provides the an extendible framework for user management, permissions, site structure set up, and day-to-day content management. With many of the core concerns of interface design and security seen to, Drupal developers can extend functionality and retain consistency within the admin part of the site. 

Drupal, and many other CMS's, are built around a database. The admin interface to the CMS allows privileged users to change the content of the database, which is then reflected on the public view. In this model of publishing and Content Management changes such as new articles, or updates to the existing pages are all immediately available on the public site. For most websites this is good - it makes publishing easy and fast. 

In some cases though, this immediacy is not desirable, and content is required to go through a 'staging' preview process before being published and made available to the general public. Separation of the tasks of editing content and publishing it is  a requirement.

## In Drupal there's a module for that called Deployment. 
If you need to do this, it's worth checking out the Deployment module - which aims to meet the requirement of separating editing from publishing. Deployment allows you to assign different Drupal websites as source and destination, and provides ways of synchronising their content.  We liked what it said it would do, but for the project that needed it, it wouldn't work  - no matter how we tried. 

## Drupal as a static site generator
If Deployment doesn't work for your content either - or your content is simple enough - it may be worth considering how important it is to have a full Drupal installation on your live site at all. Drupal could, with some clever scripting, be set up to be a static site generator - and effectively publish HTML content to another site without the live site needing a database at all. Obviously this won't work where you need Drupal features such as Users, Search, or any dynamic loading of content.   

## Our solution: Repurposing the NodeExport module
NodeExport is a Drupal module that serialises content and allows you to import it again. It can be useful when manually migrating content across sites, or when upgrading a site. We found we could access the relevant methods from NodeExport for exporting content on the source server, and re-importing it on the live destination server. Our solution was to write a custom module that wrapped this and the data transfer and provided editors an automated publishing process. 

We could then get back to sailing our yacht. 






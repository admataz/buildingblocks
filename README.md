buildingblocks
==============

This is a collection of tools and scripts I am developing to help make my new website at admataz.com as a static generated 
site, with the idea that this will be a useful collection of reusable tools eventually.

So far it's experimental and I'm thinking it up as I go. 

What I want to achieve is:

- output static html site
- easy to make edits or updates to content
- try and avoid rebuilding the whole site for small changes or additions - so some dependency mapping required
- content based in markdown and json files
- separation of content, templates, style and js in src - to be compiled, built, optimised and output to dest
- use gulp.js (or grunt) to manage/automate the build


My thinking so far is this:

- this will be quite cool if I can make it work
- I need to have a central 'router' that maps content to structure and nav, templates, page-specific build scripts


I'm starting (v 0.0.0) with a series of specific scripts that generate the pages and elements I need - once I get an idea
of how these are fitting together, I'll look at abstracting this into a more robust and reusable toolset.




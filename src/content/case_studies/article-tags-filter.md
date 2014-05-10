Article list tag filter in Drupal
=================================

A site that publishes articles regularly can over time bury older relevant content. 

Here we explain the information architecture and server-side technical challenges we faced setting up new organisational structures in a Drupal site to tackle the issue of accessing older content. 

## Drupal's taxonomy system
Drupal makes it easy to tag and categorise content using Drupal's native taxonomy module. Custom vocabularies, Taxonomy Fields, and Content Types provide the tools to design a fluid and emergent 'bottom-up' organisation to content: structure emerges from the qualities and properties of the content. 

Providing end-user access to this fluid structure is less straight forward. While a list of all content tagged with a single particular term works easily out the box, getting combinations of multiple terms is not. We needed to provide a list of articles of Type A, that cover Topic B, and have been tagged with Tag X, Y and Z. 

## A form of Faceted classification
Information architects call what we are trying to do 'Faceted classification' - topics expose 'facets' to a body of content, and combinations of topics quickly reveal the intersections, and help users to cut a large body of content down to the relevant items.  

Technically in the relational database world behind Drupal, this involves composing a series of joins in our queries that return the relevant content nodes. We wrote a custom module to do this the way we wanted.

## We want nice URLs
Foremost in our decision to write our own custom module was the importance of meaningful URLs. The Views module supports multiple arguments in a Taxonomy-based query - but they need to be numeric  - something along the line of `/filter-base/123+234+321` We wanted URLs to reflect the content and context being queried, something more like `/filter-base/type-a/topic-x/tag-y`.

## Nodes as context bases
We also wanted to be able to attach this 'contextualised' capability to nodes within the site structure, so we could do something along the lines of `/main-topic-node/any/combination/of/topics` where 'main-topic-node' is a normal page node, and the URL segments provide the basis to produce a list of relevant and filtered articles for that node. These main topic nodes were to be managed by editors via the CMS (ruling out custom `hook_menu()` implementations), and to sit at the first segment of the URL.  

Drupal does not make this kind of dynamic URL routing easy. The path module will map a user-friendly URL to an internal path (like `node/123`), but doesn't support adding parameters after the path. 

## Our custom Drupal module for providing contextual base nodes and URL parameters for filtering content
To simplify slightly, our custom module does the following: 

-  In `hook_install()` it defines new custom fields that allow us to define whether a node should act as a 'contextual base' to lists of other nodes. 

-  In `hook_menu()` we gather all nodes with the above 'contextual base' flag set, and override the menu callback with a custom function. To keep this up to date, it's worth rebuilding the menu when saving nodes of the type that could be contextual bases. 

-  With a custom route and callback defined, we are able to access extra segments in the URL as parameters, and use them to run queries against the `taxonomy_term_data` and `taxonomy_index` tables to get a list of relevant nodes. 

-  We add the list of relevant nodes to the current node as a property, that can then be picked up in theme templates. 


In our development of the module, we also added: 

-   integration with search, so users could search within a context 

-  and we generated lists of links for the selected and  available taxonomy terms 


With the additions in this last point, we were able to provide a faceted navigation to the content of the site. Users could select relevant terms from the various vocabularies, and the page would refresh with a shorter list of articles, a shorter list of remaining terms relevant to the results, and the list of selected terms (also reflected in the URL path). It made it very quick to drill down to a specific cross section of site content, and provided an intuitive interface. 

> It's worth noting here that URLs are being generated with segments in any order but providing the same content. So `/type-a/topic-x/tag-y` would produce exactly the same page results as `/topic-x/tag-y/type-a`. This is not such a problem from a user's perspective, but isn't good for SEO. We need to define a canonical path for search engines to avoid penalisation here. 

## Next steps: improvements to the client-side 
All this is good, but we found there is room for improvement:  The full page refresh for each click of a tag feels like an expensive investment for users so we started looking at ways to load the results faster...

In Part Two we explain how we overhauled this feature to provide a fast-loading interface using Backbone.js.  



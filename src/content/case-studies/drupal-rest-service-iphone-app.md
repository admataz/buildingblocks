Drupal as the CMS for a restful API for an iPhone App
=====================================================

For a recent contract the client stipulated Drupal as the CMS to support the web services for their iPhone App. Our advice was to go for a lighter framework that better supports web services and gives better control over things like http headers and the json output.  But sometimes you just have to suck it in and do the best you can with what the client wants...

We made our start with a Drupal 7 minimal install profile and used a number of contributed modules to provide the bulk of the required functionality, with some enhancements via custom coded modules. 

## Views content based RESTful server
These are the core and contributed modules we used to set up the base RESTful service:

- `ctools` - a low level module with an tools required by other modules
- `entity` - provides and API for defining and managing custom Entities 
- `entityreference` - provides the ability to build relationships between entities 
- `features` - allows us to package configurations and dependencies
- `field_ui` - core module for adding fields to entities
- `file` - core module for allowing uploads to entities
- `image` - core module for managing image content
- `inline_entity_form` - interface for adding related entities within the 'parent' entity edit form
- `list` - core field input module
- `module_filter` - interface enhancement for managing modules
- `number` - core input field
- `options` - core input field
- `rest_server` - provide a RESTful server as part of services
- `services` - module to manage web services endpoints and output formats
- `services_entity` - module to make custom entities available to services
- `services_views` - module to make views available to services
- `taxonomy` - core module
- `views` - essentially a query builder with some output formatting
- `views_ui` - interface for managing views

The data output for the services endpoint in this application is defined in queries built using Views.

## Drupalisms
Using these tools has some drawbacks. If you're used to building RESTful services closer to the metal, may come as a shock. 

- all returned values are strings. The iOS devs hate it when their IDs are not numeric. We eventually did some post-processing to the JSON as it really did improve client side performance. 
- strings are escaped for HTML output - so entities like ampersands and special chars are represented as XML friendly (e.g. `&amp;` for & and `&#039;` for apostrophes). This  reflects what Drupal considers normal output. 
- empty properties are sometimes presented as an empty array, even if the expected non-empty property should be a string (or stringified number). Words fail me on this one.
- related content types are problematic to embed - so normal 'hasmany' or 'belongsto' relationships one can get easily from an MVC framework are not available. This potentially means more queries to the server than desired, which can be problematic for low bandwidth situations on mobile.
- last modified is a unix timestamp - can't seem to be able to format the output as a date

## Don't try this at home. 
I wouldn't recommend using Drupal to build web services. We took a contributed module approach with the hope that this would provide more stability in handover to the client. I'm still not sure about this - I think we could have achieved better control if we had done less 'the Drupal way' and trusted our code query the database and output the raw json, without dressing it up Views and the CMS interface, and introducing a level of cruft to the output. If you have the option to use other PHP tools, or Ruby on Rails, or something like Restify on node.js - I would recommend it. 




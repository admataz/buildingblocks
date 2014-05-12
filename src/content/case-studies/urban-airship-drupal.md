Sending location aware rich push notifications to iPhones from Drupal using Urban Airship
====================================================================

How we reinvented geofencing to offer more flexibility and customisation 

- generated a stores.plist from supplied XML 
- defined custom entities via hook_schema
	- public users
	- sendlog
	- geofence users
- setting up message schedules
- cron to do the send - instantiates the custom objects that contain the logic
- registering users' locations
- generated locations as audience segments


Custom objects - to unite a series of APIs and send messages according to predefined rules
------------
- Message processor
	- gets all active messages - loops through and sends
- Message
 	- assess date periods and deltas
 	- compose payloads for Urban Airship
 	- Send to specific tags 
 		High retention app users
        Low retention app users
        Lesson-based recommendations
        Purchase-based recommendations
        New Bestseller products
        New content
        New Lesson content
        Near Stores
        Local News Alert
        Generic Message
 
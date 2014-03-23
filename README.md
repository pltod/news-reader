**STATE**

> DEPRECATED. NOT WORKING SINCE THE API USED REQUIRES AUTHENTICATION NOW.

> STILL A VALID JAVASCRIPT SINGLE PAGE APPLICATION STRUCTURE.

> FOR A WORKING APPLICATION THAT USES GIHUB API SEE https://github.com/pltod/github-demo-app


**PURPOSE**

> Experimenting with SPA application structure using Backbone, Backbone Layout Manager, Require JS, Grunt, and Twitter Bootstrap.


**HOW TO RUN IT**


See Installation Instructions bellow.

Note that if done correctly the app will load but data will not be loaded because the used API now requires some sort of authentication.


**FOLLOW UP**

https://github.com/pltod/github-demo-app




****

Next is detailed description of the News Reader project...



#About

Just Another News Reader Application

It uses the unofficial hacker news API (http://hndroidapi.appspot.com/)
Note that the public access to the API is not allowed. So until this is valid the application is not working.
Still it shows a possible way of structuring applications with Backbone and Handlebars.

This application is a minimum viable product (MVP)! This means that all non-functional requirements were not a priority and it is only tested in the latest Chrome, Firefox and IE browsers.
For example if the Hacker News API does not return data for any reason the application must be refreshed. The technology stack includes frameworks, libraries and tools like – Underscore, jQuery, Backbone, Backbone Layoutmanager, Handlebars, Twitter Bootstrap, Twitter Bower, RequireJS, and Grunt.

The application returns news from the Hacker News homepage since the newest entries mostly do not have any comments. The application interprets ’20 top comments’ as the first 20 comments returned by the API without ordering them somehow. Moreover, the comments text is not formatted appropriately in this version. This is considered a feature that must not be part of the MVP.

The application structure is inspired by Backbone Boilerplate (https://github.com/backbone-boilerplate/backbone-boilerplate) with some modifications made on different aspects.

#Installation Instructions

Grunt and Bower are used so apart from importing the app it will require some more steps in order to run it. 

      Step 1) install node.js from here http://nodejs.org/
      
      Step 2) install Twitter Bower with  'npm install -g bower'
      
      Step 3) in the root of the project from the command line run 'bower install' to install bower components
      
      Step 4) run the application with opening index.html from the root of the project
      
      Step 5) install Grunt CLI with npm install -g grunt-cli
      
      Step 6) in the root of the project from the command line run npm install to install grunt plugins
      
      Step 7) create the production version of the app with executing the command 'grunt' from the root of the project
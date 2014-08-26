# Getting Started

`Superadmin` application using Backbone.js, Grunt & Bower


# Installation

1. Install [Node.js](http://nodejs.org/)
2. Run ```cd path/to/local/superadmin```
3. Run ```sudo npm install -g grunt-cli bower```
4. Run ```bower install``` to install vendor dependencies.
4. Run ```grunt install``` to install the required dependencies.
5. Run ```grunt staging``` to build the staging folder.
6. Run ```grunt watcher``` to watch and process src changes.


# Cloudwalkers Gruntfile

The gruntfile takes care of JS sanity testing,
compression of javascript and css files, concatinating of template files
and the templating process of the html files.

Run before first use: 		grunt install
Run for release: 			grunt release
Run for staging:			grunt staging
Change listener:			grunt watcher

Working directory: 			src
Distribution direactory: 	dist
Required files: 			package.json (all grunt plugins are listed)
Interesting read: 			http://www.html5rocks.com/en/tutorials/tooling/supercharging-your-gruntfile/


[Grunt]: http://gruntjs.com/
[Bower]: http://bower.io/
[npm]: https://www.npmjs.org/
// Require.js allows us to configure shortcut alias
require.config({
    // The shim config allows us to configure dependencies for scripts that do not call define() to register a module
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        backboneLocalstorage: {
            deps: ['backbone'],
            exports: 'Store'
        },
        'bootstrap' : {
            deps: ['jquery']
        },
		oauth2: {
            deps: ['backbone'],
            exports: 'OAuth2'
        },
    },
    paths: {
        jquery: '../vendor/jquery/dist/jquery.min',
        underscore: '../vendor/underscore/underscore',
        backbone: '../vendor/backbone/backbone',
        backboneLocalstorage: "/vendor/backbone.localStorage/backbone.localStorage-min",
        text: '../vendor/requirejs-text/text',
        bootstrap: '../vendor/bootstrap/dist/js/bootstrap.min',
        oauth2: 'plugins/backbone.oauth2',
        templates: '../templates'
    }
});

require([
    'jquery',
    'bootstrap'
], function($, _bootstrap){
    // this is where all the site code should begin
    return {};
});

require([
    'backbone',
    'views/app',
    'routes'
], function (Backbone, App, Router) {
    'use strict';

    // Initialize routing & application
    var router = new Router({ app: new App()});

    // Start Backbone.history() and extrat the root path from HTML markup
    Backbone.history.start({
        pushState: false,
        root: $('[data-main][data-root]').data('root') || '/'
    });
});

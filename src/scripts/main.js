// Require.js allows us to configure shortcut alias
require.config({
    baseUrl: '/scripts/',
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
        backboneSync: {
            deps: ['backbone']
        },
        'bootstrap': {
            deps: ['jquery']
        },
        auth: {
            deps: [
                'jquery',
                'underscore',
                'backbone'
            ]
        }
    },
    paths: {
        jquery: '../vendor/jquery/jquery.min',
        text: '../vendor/requirejs-text/text',
        underscore: '../vendor/underscore/underscore',
        backbone: '../vendor/backbone/backbone',
        bootstrap: '../vendor/bootstrap/dist/js/bootstrap.min',
        auth: 'plugins/backbone.auth',
        templates: '../templates'
    }
});

require([
    'jquery',
    'bootstrap'
], function ($, _bootstrap) {
    // this is where all the site code should begin
    return {};
});

require([
    'backbone',
    'views/app',
    'routes'
], function (Backbone, App, Router) {
    'use strict';

    // AJAX settings
    $(document).ajaxStart(function () {
        $('body').addClass('loading');
    }).ajaxComplete(function () {
        $('body').removeClass('loading');
    });

    // Initialize routing & application
    var router = new Router({ app: new App()});

    // Start Backbone.history() and extrat the root path from HTML markup
    Backbone.history.start({
        pushState: false,
        root: $('[data-main][data-root]').data('root') || '/'
    });
});

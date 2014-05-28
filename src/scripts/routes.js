define([
    'jquery',
    'backbone',
    'views/index',
    'views/login',
    'views/about',
    'views/error'
], function ($, Backbone, indexView, loginView, aboutView, errorView) {

    var Router = Backbone.Router.extend({
        routes: {
            '': 'home',
            'login': 'login',
            'about': 'about',
            '*other': 'default'
        },

        initialize: function (options) {
            this.app = options.app;
        },

        // Index
        home: function () {
            this.app.page(new indexView());
        },
		
		// Login
        login: function () {
            this.app.page(new loginView());
        },

        // About
        about: function () {
            this.app.page(new aboutView());
        },

        // Page not found
        default: function (other) {
			this.app.page(new errorView(other));
        }
    });

    // Returns the class itself
    return Router;
});

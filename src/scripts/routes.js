define([
    'jquery',
    'backbone',
    'views/index',
    'views/login',
    'views/accounts/list',
    'views/accounts/add',
    'views/docs',
    'views/error'
], function ($, Backbone, indexView, loginView, accountsListView, accountsAddView, documentationView, errorView) {

    var Router = Backbone.Router.extend({
        routes: {
            '': 'home',
            'login': 'login',
            'accounts': 'accounts',
            'accounts/add': 'accountsAdd',
            'docs': 'documentation',
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

        // Accounts list
        accounts: function () {
            this.app.page(new accountsListView(), 'accounts');
        },

        // Account add
        accountsAdd: function () {
            this.app.page(new accountsAddView(), 'accounts');
        },

        // Documentation
        documentation: function () {
            this.app.page(new documentationView(), 'docs');
        },

        // Page not found
        default: function (other) {
            console.log('Route not found on', other);
            //this.app.page(new errorView(other));
        }
    });

    // Returns the class itself
    return Router;
});

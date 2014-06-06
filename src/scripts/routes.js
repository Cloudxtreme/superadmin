define([
    'jquery',
    'backbone',
    'auth',
    'views/index',
    'views/login',
    'views/accounts/list',
    'views/accounts/add',
    'views/accounts/edit',
    'views/docs',
    'views/error'
], function ($, Backbone, Auth, indexView, loginView, accountsListView, accountsAddView, accountsEditView, documentationView, errorView) {

    var Router = Backbone.Router.extend({
        routes: {
            '': 'home',
            'login': 'login',
            'logout': 'logout',
            'accounts': 'accounts',
            'accounts/add': 'accountsAdd',
            'accounts/:id': 'accountsEdit',
            'docs': 'documentation',
            '*other': 'default'
        },

        initialize: function (options) {
            console.log('Initialize Router');
            this.app = options.app;
        },

        // Index
        home: function () {
            console.log('"/" route achieved');
            this.app.page(new indexView());
        },

        // Login
        login: function () {
            console.log('"/login" route achieved');
            this.app.page(new loginView(), 'login');
        },

        // Logout
        logout: function () {
            console.log('"/logout" route achieved');

            Backbone.Auth.logout();
            Backbone.history.navigate('/', {trigger: true});
        },

        // Accounts list
        accounts: function () {
            this.app.page(new accountsListView(), 'accounts');
        },

        // Account add
        accountsAdd: function () {
            this.app.page(new accountsAddView(), 'accounts');
        },

        // Account edit
        accountsEdit: function (id) {
            this.app.page(new accountsEditView(id), 'accounts');
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

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
], function ($, Backbone, Auth, IndexView, LoginView, AccountsListView, AccountsAddView, AccountsEditView, DocumentationView, ErrorView) {

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
            this.app.page(new IndexView());
        },

        // Login
        login: function () {
            console.log('"/login" route achieved');
            this.app.page(new LoginView(), 'login');
        },

        // Logout
        logout: function () {
            console.log('"/logout" route achieved');

            Backbone.Auth.logout();
            Backbone.history.navigate('/', {trigger: true});
        },

        // Accounts list
        accounts: function () {
            this.app.page(new AccountsListView(), 'accounts');
        },

        // Account add
        accountsAdd: function () {
            this.app.page(new AccountsAddView(), 'accounts');
        },

        // Account edit
        accountsEdit: function (id) {
            this.app.page(new AccountsEditView(id), 'accounts');
        },

        // Documentation
        documentation: function () {
            this.app.page(new DocumentationView(), 'docs');
        },

        // Page not found
        default: function (other) {
            console.log('Route not found on', other);
            //this.app.page(new ErrorView(other));
        }
    });

    // Returns the class itself
    return Router;
});

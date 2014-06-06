define([
    'jquery',
    'underscore',
    'backbone',
    'collections/accounts',
    'text!templates/accounts/list.html',
    'text!templates/accounts/table.html'
], function ($, _, Backbone, accountsCollection, accountsListTemplate, accountsItemsTemplate) {

    var accountsListView = Backbone.View.extend({
        // Compile our template
        template: _.template(accountsListTemplate),

        events: {
            "change": "change",
            "click .btn-delete": "deleteAccount"
        },

        // View constructor
        initialize: function (options) {
            console.log('Initialize accounts list View');
            console.log('Page', options.page || 1);
            this.model = new accountsCollection();
            this.model.on('sync', this.list, this);
            this.model.fetch(); // fetching the model data from /my/url
        },

        // Show data table
        list: function (data) {
            console.log('Accounts list rendering');
            this.$('#items').html(_.template(accountsItemsTemplate, {items: data.toJSON()}));
        },

        // Render the content
        render: function () {
            console.log('Render accounts list View');

            // Main view template
            this.setElement(this.template());

            // Maintains chainability
            return this;
        },

        // Delete an entry
        deleteAccount: function () {
            this.model.destroy({
                success: function () {
                    alert('Account deleted successfully');
                }
            });
            return false;
        }
    });

    // Returns the class itself
    return accountsListView;
});

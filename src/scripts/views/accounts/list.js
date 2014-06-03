define([
    'jquery',
    'underscore',
    'backbone',
    'collections/accounts',
    'text!templates/accounts/list.html'
], function ($, _, Backbone, accountsCollection, accountsListTemplate) {

    var accountsListView = Backbone.View.extend({

        // Compile our template
        template: _.template(accountsListTemplate),

        events: {
            "change": "change",
            "click .btn-delete": "deleteAccount"
        },

        // View constructor
        initialize: function () {
            this.model = new accountsCollection();
            this.model.on('change', this.render); // attempt to bind to model change event
            this.model.fetch(); // fetching the model data from /my/url

            console.log('Initialize accounts list View');
        },

        // Render the content
        render: function () {
            console.log('Render accounts list View');

            this.setElement(this.template({ items: this.model.toJSON() }));

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

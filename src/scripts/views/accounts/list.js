define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/accounts/list.html'
], function ($, _, Backbone, accountsListTemplate) {

    var accountsListView = Backbone.View.extend({

        // Compile our template
        template: _.template(accountsListTemplate),

        // View constructor
        initialize: function () {
            console.log('Initialized accounts list View');
        },

        // Render the content
        render: function () {
            console.log('Render accounts list View');
            this.setElement(this.template());

            // Maintains chainability
            return this;
        }
    });

    // Returns the class itself
    return accountsListView;
});

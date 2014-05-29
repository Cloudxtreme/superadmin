define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/accounts/item.html'
], function ($, _, Backbone, accountsItemTemplate) {

    var accountsAddView = Backbone.View.extend({

        // Compile our template
        template: _.template(accountsItemTemplate),

        // View constructor
        initialize: function () {
            console.log('Initialized accounts add View');
        },

        // Render the content
        render: function () {
            console.log('Render accounts add View');
            this.setElement(this.template());

            // Maintains chainability
            return this;
        }
    });

    // Returns the class itself
    return accountsAddView;
});

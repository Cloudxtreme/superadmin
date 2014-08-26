define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/accounts/item.html'
], function ($, _, Backbone, accountsItemTemplate) {

    var accountsEditView = Backbone.View.extend({

        // Compile our template
        template: _.template(accountsItemTemplate),

        // View constructor
        initialize: function () {
            console.log('Initialize accounts edit View');
        },

        // Render the content
        render: function () {
            console.log('Render accounts edit View');
            this.setElement(this.template());

            // Maintains chainability
            return this;
        }
    });

    // Returns the class itself
    return accountsEditView;
});

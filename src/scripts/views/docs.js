define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/docs.html'
], function ($, _, Backbone, documentationTemplate) {

    var documentationView = Backbone.View.extend({

        // Compile our template
        template: _.template(documentationTemplate),

        // View constructor
        initialize: function () {
            console.log('Initialized Documentation View');
        },

        // Render the content
        render: function () {
            console.log('Render Documentation View');
            this.setElement(this.template());

            // Maintains chainability
            return this;
        }
    });

    // Returns the class itself
    return documentationView;
});

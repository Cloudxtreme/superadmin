define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/error.html'
], function ($, _, Backbone, errorTemplate) {

    var errorView = Backbone.View.extend({

        // Compile our template
        template: _.template(errorTemplate),

        // View constructor
        initialize: function () {
            console.log('Initialize Error View');

            // Calls the view's render method
            this.render();
        },

        // Render the content
        render: function () {
            console.log('Render Error View');
            this.setElement(this.template());

            // Maintains chainability
            return this;
        }
    });

    // Returns the class itself
    return errorView;
});

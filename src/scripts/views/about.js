define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/about.html'
], function ($, _, Backbone, aboutTemplate) {

    var aboutView = Backbone.View.extend({

        // Compile our template
        template: _.template(aboutTemplate),

        // View constructor
        initialize: function () {
            console.log('Initialized About View');
        },

        // Render the content
        render: function () {
            console.log('Render About View');
            this.setElement(this.template());

            // Maintains chainability
            return this;
        }
    });

    // Returns the class itself
    return aboutView;
});

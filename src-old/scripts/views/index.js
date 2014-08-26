define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/index.html'
], function ($, _, Backbone, indexTemplate) {

    var indexView = Backbone.View.extend({

        // Compile our template
        template: _.template(indexTemplate),

        // View constructor
        initialize: function () {
            console.log('Initialize Index View');
        },

        // Render the content
        render: function () {
            console.log('Render Index View');
            this.setElement(this.template());

            // Maintains chainability
            return this;
        }
    });

    // Returns the class itself
    return indexView;
});

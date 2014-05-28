define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/footer.html'
], function ($, _, Backbone, footerTemplate) {

    var footerView = Backbone.View.extend({

        // Compile our template
        template: _.template(footerTemplate),

        // View constructor
        initialize: function () {
            console.log('Initialized Footer View');

            // Calls the view's render method
            this.render();
        },

        // Render the content
        render: function () {
            console.log('Render Footer View');
            this.setElement(this.template());

            // Maintains chainability
            return this;
        }
    });

    // Returns the class itself
    return footerView;
});
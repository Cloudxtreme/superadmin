define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/header.html',
], function ($, _, Backbone, headerTemplate) {

    var headerView = Backbone.View.extend({

        // Compile our template
        template: _.template(headerTemplate),

        // View constructor
        initialize: function () {
            console.log('Initialized Header View');
        },

        // Render the content
        render: function () {
            console.log('Render Header View');
            this.setElement(this.template());

            // Maintains chainability
            return this;
        },

        selectMenuItem: function (menuItem) {
            $('.nav li').removeClass('active');
            if (menuItem) {
                $('.' + menuItem).addClass('active');
            }
        }
    });

    // Returns the class itself
    return headerView;
});
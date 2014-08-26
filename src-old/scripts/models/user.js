define([
    'underscore',
    'backbone'
], function (_, Backbone) {

    var UserModel = Backbone.Model.extend({

        // Default values for all of the Model attributes
        defaults: {
            user: null,
            completed: false
        },

        initialize: function () {
            console.log('Initialize Me Model');

            // Load data
            this.once('change', this.activate);
        },

        parse: function () {
            console.log('Parse User Model');

        },

        activate: function () {
        },

        // Gets called automatically by Backbone when the set and/or save methods are called
        validate: function (attrs) {
        }
    });

    // Returns the class itself
    return UserModel;
});
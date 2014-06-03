define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var AccountModel = Backbone.Model.extend({
        defaults: {
            id: null,
            name: '',
            description: ''
        },

        initialize: function () {
            this.on('change:name', function () {
                console.log('Account has been changed. Name: ' + this.get('name'));
            });
        }
    });

    return AccountModel;
});
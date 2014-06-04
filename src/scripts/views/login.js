define([
    'underscore',
    'backbone',
    'config',
    'text!templates/login.html'
], function (_, Backbone, config, loginTemplate) {

    var loginView = Backbone.View.extend({
        // Variables
        template: _.template(loginTemplate),

        // View constructor
        initialize: function () {
            console.log('Initialize Login View');

            if (!Backbone.Auth.active()) {
                Backbone.Auth.login({
                    clientId: config.api.clientId,
                    authUrl: config.api.url + config.api.auth,
                    redirectUrl: config.api.redirectUrl,
                    state: config.api.state,
                    width: 450,
                    height: 450
                });
            } else {
                Backbone.history.navigate('/', {trigger: true});
            }
        },

        // Render the content
        render: function () {
            console.log('Render Login View');

            this.setElement(this.template());

            // Maintains chainability
            return this;
        }
    });

    // Returns the class itself
    return loginView;
});

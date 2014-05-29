define([
    'jquery',
    'underscore',
    'backbone',
    'config',
    'oauth2',
    'text!templates/login.html'
], function ($, _, Backbone, config, OAuth2, loginTemplate) {

    var loginView = Backbone.View.extend({

        // Compile our template
        template: _.template(loginTemplate),

        // View constructor
        initialize: function () {
            console.log('Initialized Login View');

            this.oauth = new Backbone.OAuth2({
                clientId: config.api.clientId,
                authUrl: config.api.url + config.api.authUrl,
                redirectUrl: config.api.redirectUrl,
                state: config.api.state,
                width: 450,
                height: 450,
                onSuccess: function (params) {
                    console.log('Success', params);
                    Backbone.history.navigate('', {trigger: true});
                },
                onFailure: function (params) {
                    console.log('Failure', params);
                }
            });
        },

        // Render the content
        render: function () {
            console.log('Render Login View');
            this.setElement(this.template());

            this.oauth.auth();

            // Maintains chainability
            return this;
        }
    });

    // Returns the class itself
    return loginView;
});

define([
    'underscore',
    'backbone',
    'oauth2',
    'config'
], function (_, Backbone, OAuth2, config) {

    var SessionModel = Backbone.Model.extend({
        // Default values for all of the Model attributes
        defaults: {
            session: null
        },

        initialize: function () {
            console.log('Initialize Session Model');
        },


        auth: function(){
            console.log('Initialize Auth function');
            Backbone.Auth.login({
                clientId: config.api.clientId,
                authUrl: config.api.url + config.api.auth,
                redirectUrl: config.api.redirectUrl,
                state: config.api.state,
                width: 450,
                height: 450,
                store: this.store,
                tokenName: config.app.tokenName,
                sessionName: config.app.sessionName
            });
        },
		
		active: function () {
            // try loading the session
            var localSession = Backbone.Auth.getAccessToken();
            return !_.isNull(localSession) ? localSession : null;
		}
    });

    // Returns the class itself
    return SessionModel;
});
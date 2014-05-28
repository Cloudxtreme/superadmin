define([
    'jquery',
    'underscore',
    'backbone',
    'oauth2',
    'text!templates/login.html'
], function ($, _, Backbone, OAuth2, loginTemplate) {

    var loginView = Backbone.View.extend({

        // Compile our template
        template: _.template(loginTemplate),

        // View constructor
        initialize: function () {
            console.log('Initialized Login View');
			
			this.oauth = new Backbone.OAuth2({
				clientId: 'oauth2537f198a5ce488.49560531',
				authUrl: 'http://engine.bmg.birkof.dev/oauth2/authorize',
				redirectUrl: 'http://superadmin.bmg.birkof.dev/oauth.html',
				state: 'xyz',
				width: 350,
				height: 350,
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

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        return define(['underscore', 'backbone', 'config'], function (_, Backbone) {
            return factory(_ || root._, Backbone || root.Backbone);
        });
    } else {
        return factory(_, Backbone, config);
    }
}(this, function (_, Backbone) {
    // Parse hash helper method used for parsing location.hash.
    var parseHash = function (hash) {
        var params = {},
            queryString = hash.substring(1),
            regex = /([^&=]+)=([^&]*)/g, m;

        while (m = regex.exec(queryString)) {
            params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }

        return params;
    }

    // Add a public method so that anything else can also create the header
    Backbone.Auth = {
        login: function (options) {
            // Override any default option with the options passed to the constructor.
            _.extend(this, options);

            var params = {},
                that = this,
                url = this.authUrl
                    + '?client_id=' + this.clientId
                    + '&redirect_uri=' + this.redirectUrl
                    + '&response_type=token',
                left = (screen.width / 2) - (this.width / 2) || 0,
                top = (screen.height / 2) - (this.height / 2) || 0;

            if (this.scope) {
                url += '&scope=' + this.scope;
            }
            if (this.state) {
                url += '&state=' + this.state;
            }

            if (!Backbone.Auth.active()) {
                console.log('NO TOKEN!!!');
                var popup = window.open(url, '_blank', 'resizable=no,location=no,toolbar=no,width=' + (this.width || 800) + ',height=' + (this.height || 600) + ',left=' + left + ',top=' + top);
            } else {
                console.log('Token is already here!');
            }
        },
        // Application-level logout: we simply discard the token.
        logout: function () {
            window.localStorage.removeItem('session');
        },
        // Headers for Bearer Authorization
        headers: function () {
            return {
                'Authorization': 'Bearer ' + Backbone.Auth.getAccessToken(),
                'Accept': 'application/json'
            };
        },
        // Return if the session is active
        active: function () {
            return !_.isNull(this.getAccessToken()) ? true : false;
        },

        // Get the access_token from localStorage
        getAccessToken: function () {
            if (typeof(window.localStorage) !== 'undefined') {
                var data = JSON.parse(window.localStorage.getItem('session'));
                return !_.isNull(data) ? (data.shift()).params.access_token : null;
            }

            return null;
        },

        // Fires on popup redirects
        onRedirect: function (hash) {
            var params = parseHash(hash);
            if (params['access_token']) {
                Backbone.Auth.success(params);
            } else {
                Backbone.Auth.error(params);
            }
        },
        // Fires onSuccess
        success: function (params) {
            console.log('OAuth2 onSuccess', params);

            if (typeof(window.localStorage) !== 'undefined') {
                window.localStorage.setItem('session', JSON.stringify([
                    {auth: true, params: params}
                ]));

                Backbone.history.navigate('', {trigger: true});
            }
        },
        // Fires onError
        error: function (params) {
            console.log('OAuth2 onError', params);
        }
    };

    // Make the onRedirect function publicy available.
    window.OAuth2Redirect = Backbone.Auth.onRedirect;

    // Store a copy of the original Backbone.sync
    var originalSync = Backbone.sync;

    // Override Backbone.sync
    Backbone.sync = function (method, model, options) {
        options = options || {};
        options.headers = options.headers || {};

        // Extending headers
        _.extend(options.headers, Backbone.Auth.headers());

        // Perform the sync
        return originalSync.call(model, method, model, options);
    };

    return Backbone.OAuth2;
}));
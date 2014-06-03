;
(function (root, factory) {
    if (typeof exports === 'object' && typeof require === 'function') {
        return module.exports = factory(require('jquery'), require('underscore'), require('backbone'));
    } else if (typeof define === 'function' && define.amd) {
        return define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
            return factory($ || root.$, _ || root._, Backbone || root.Backbone);
        });
    } else {
        return factory($, _, Backbone);
    }
}(this, function ($, _, Backbone) {
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

            var params = {}
                , that = this
                , url = this.authUrl
                    + '?client_id=' + this.clientId
                    + '&redirect_uri=' + this.redirectUrl
                    + '&response_type=token'
                , left = (screen.width / 2) - (this.width / 2) || 0
                , top = (screen.height / 2) - (this.height / 2) || 0;

            if (this.scope) url += '&scope=' + this.scope;
            if (this.state) url += '&state=' + this.state;

            if (!Backbone.Auth.getAccessToken()) {
                console.log('NO TOKEN!!!');
                var popup = window.open(url, '_blank', 'resizable=no,location=no,toolbar=no,width=' + (this.width || 800) + ',height=' + (this.height || 600) + ',left=' + left + ',top=' + top);

                /*$(popup).on('load', function (event) {
                 console.log('popup loaded');
                 var url = event.url || event.target.URL;
                 console.log('popup loaded with url:', url);
                 if (url.indexOf('access_token=') > 0) {
                 params[that.tokenName] = that.extractToken(url);
                 that.onSuccess(params);
                 this.close();
                 } else {
                 that.onError(params);
                 }
                 });*/
            } else {
                console.log('Token is already here!');
            }
        },
        test: function (hash) {
            console.log(hash);
        },
        // Application-level logout: we simply discard the token.
        logout: function () {
            window.localStorage.removeItem('session');
        },
        // Headers for Bearer Authorization
        headers: function () {
            return {
                'Authorization': 'Bearer UNKNOWN',
                'Accept': 'application/json'
            };
        },
        // Extract auth token response from redirect endpoint
        extractToken: function (hash) {
            var match = hash.match(/access_token=(\w+)/);
            return !!match && match[1];
        },
        getAccessToken: function () {
            var data = JSON.parse(window.localStorage.getItem('session'));
            return (data ? (data.shift()).token : null);
        },
        // Detect if we have a successful auth and save it to Store.
        authSuccess: function (params) {
            return params[this.tokenName];
        },
        onRedirect: function (hash) {
            var params = parseHash(hash);
            console.log('params', params);
            console.log(Backbone.Auth.authSuccess(params));
            if (Backbone.Auth.authSuccess(params)) {
                Backbone.Auth.onSuccess(params);
            } else {
                Backbone.Auth.onError(params);
            }
        },
        // Fires onSuccess
        onSuccess: function (params) {
            console.log('Params onSuccess', params);
            window.localStorage.setItem('session', JSON.stringify([
                {id: config.api.clientId, token: params[config.app.tokenName]}
            ]));
            Backbone.history.navigate('', {trigger: true});
        },

        // Fires onError
        onError: function (params) {
            console.log('Params onError', params);
        }
    };

    // Make the onRedirect function publicy available.
    window.OAuth2Redirect = Backbone.Auth.onRedirect;


    // Extend Backbone with OAuth2 functionality.
    Backbone.OAuth2 || (Backbone.OAuth2 = {});
    // The base OAuth2 class.
    Backbone.OAuth2 = function (options) {

        // Override any default option with the options passed to the constructor.
        _.extend(this, options);
    };
    // Add a public method so that anything else can also create the header
    _.extend(Backbone.OAuth2.prototype, {
        login: function () {
            if (!this.tokenName) throw new Error('No access token name given');
            if (!this.sessionName) throw new Error('No session name given');
            if (!this.authUrl) throw new Error('No auth url given');
            if (!this.redirectUrl) throw new Error('No redirect url given');

            var params = {}
                , that = this
                , url = this.authUrl
                    + '?client_id=' + this.clientId
                    + '&redirect_uri=' + this.redirectUrl
                    + '&response_type=token'
                , left = (screen.width / 2) - (this.width / 2) || 0
                , top = (screen.height / 2) - (this.height / 2) || 0;

            if (this.scope) url += '&scope=' + this.scope;
            if (this.state) url += '&state=' + this.state;

            if (!this.getAccessToken()) {
                console.log('NO TOKEN!!!');
                var popup = window.open(url, '_blank', 'resizable=no,location=no,toolbar=no,width=' + (this.width || 800) + ',height=' + (this.height || 600) + ',left=' + left + ',top=' + top);
                $(popup).on('load', function (event) {
                    console.log('popup loaded');
                    var url = event.url || event.target.URL;
                    console.log('popup loaded with url:', url);
                    if (url.indexOf('access_token=') > 0) {
                        params[that.tokenName] = that.extractToken(url);
                        that.onSuccess(params);
                        this.close();
                    } else {
                        that.onError(params);
                    }
                });
            } else {
                console.log('Token is already here!');
            }
        },

        // Extract auth token response from redirect endpoint
        extractToken: function (hash) {
            var match = hash.match(/access_token=(\w+)/);
            return !!match && match[1];
        },


        onRedirect: function (hash) {
            var params = parseHash(location.hash);
            if (this.authSuccess(params)) {
                this.onSuccess(params);
            } else {
                this.onError(params);
            }
        },


        // Detect if we have a successful auth and save it to Store.
        authSuccess: function (params) {
            return params[this.tokenName];
        },

        // Get auth token from storage
        getAccessToken: function () {
            var data = JSON.parse(this.store.get(this.sessionName));
            return (data ? (data.shift()).token : null);
        },

        // Extend header object with bearer
        headers: function () {
            return {
                'Authorization': 'Bearer ' + this.getAccessToken(),
                'Accept': 'application/json'
            };
        },

        // Application-level logout: we simply discard the token.
        logout: function () {
            this.store.clear(this.sessionName);
        },


    });


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
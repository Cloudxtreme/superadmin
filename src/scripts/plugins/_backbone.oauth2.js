/*
 * backbone.oauth2.js v0.2
 * Copyright (C) 2014 Daniel STANCU
 * Backbone OAuth2 may be freely distributed under the MIT license.
 */
(function (window) {
    "use strict";

    // Alias backbone, underscore and jQuery.
    var Backbone = window.Backbone,
        _ = window._,
        $ = window.$;

    // Extend Backbone with OAuth2 functionality.
    Backbone.OAuth2 || (Backbone.OAuth2 = {});

    // The base OAuth2 class.
    Backbone.OAuth2 = function (options) {

        // Override any default option with the options passed to the constructor.
        _.extend(this, options);
    };

    // Inject methods and properties.
    _.extend(Backbone.OAuth2.prototype, {
        // Open the OAuth2 dialog and wait for a redirect.
        auth: function () {
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

        test: function(hash){
          console.log(hash);
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
        headers: function (options) {
            if (!options) options = {};
            if (!options.headers) options.headers = {};

            options.headers['Authorization'] = 'Bearer ' + this.getAccessToken();
            options.headers['Accept'] = 'application/json';

            return options;
        },

        // Application-level logout: we simply discard the token.
        logout: function () {
            this.store.clear(this.sessionName);
        },

        // Fires onSuccess
        onError: function (params) {
        },

        // Fires onError
        onSuccess: function (params) {
        }
    });
})(this);
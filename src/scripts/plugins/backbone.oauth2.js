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

    //============================================================================

    // Extend Backbone with OAuth2 functionality.
    Backbone.OAuth2 || (Backbone.OAuth2 = {});

    // The base OAuth2 class.
    Backbone.OAuth2 = function (options) {

        // Override any default option with the options passed to the constructor.
        _.extend(this, options);

        // Make the onRedirect function publicy available.
        _.bind(this.onRedirect, this);
        window.OAuth2Redirect = this.onRedirect;
    };

    // Inject methods and properties.
    _.extend(Backbone.OAuth2.prototype, {
        // Default for most applications.
        tokenName: 'access_token',

        // Open the OAuth2 dialog and wait for a redirect.
        auth: function () {
            if (!this.tokenName) throw new Error('No access token name given');
            if (!this.authUrl) throw new Error('No auth url given');
            if (!this.redirectUrl) throw new Error('No redirect url given');

            var url = this.authUrl
                    + '?client_id=' + this.clientId
                    + '&redirect_uri=' + this.redirectUrl
                    + '&response_type=token'
                , left = (screen.width / 2) - (this.width / 2) || 0
                , top = (screen.height / 2) - (this.height / 2) || 0;

            if (this.scope) url += '&scope=' + this.scope;
            if (this.state) url += '&state=' + this.state;

            if (!this.getToken()) {
                this.dialog = window.open(url, '_blank', 'resizable=no,location=no,toolbar=no,width=' + (this.width || 800) + ',height=' + (this.height || 600) + ',left=' + left + ',top=' + top);
            } else {
                var params = {};
                params[this.tokenName] = this.getToken();
                this.onSuccess(params);
            }
        },

        // Called on redirection inside the OAuth2 dialog window. This indicates,
        // that the dialog auth process has finished. It has to be checked, if
        // the auth was successful or not.
        onRedirect: function (hash) {
            var params = parseHash(hash);
            console.log(params);
            console.log(params[this.tokenName]);
            if (this.authSuccess(params)) {
                console.log('onSuccess');
                this.onSuccess(params);
            } else {
                this.onError(params);
                console.log('onError');
            }
        },

        // Detect if we have a successful auth and save it to Store.
        authSuccess: function (params) {
            console.log(params);
            window.localStorage.setItem('token', JSON.stringify([
                {id: this.clientId, token: params[this.tokenName]}
            ]));
            return params[this.tokenName];
        },

        // Get auth token from localstorage
        getToken: function () {
            var data = JSON.parse(window.localStorage.getItem('token'));
            return (data ? (data.shift()).token : null);
        },

        // Extend header object with bearer
        headers: function (options) {
            if (!options) options = {};
            if (!options.headers) options.headers = {};

            options.headers['Authorization'] = 'Bearer ' + this.getToken();
            options.headers['Accept'] = 'application/json';

            return options;
        },

        // Application-level logout: we simply discard the token.
        logout: function () {
            window.localStorage.clear();
        },

        // These following methods have to be implemented by the OAuth2 application.
        onError: function () {
        },
        onSuccess: function () {
        }
    });
})(this);
define({
    environment: 'development',

    // API settings
    app: {
        tokenName: 'access_token',
        sessionName: 'session'
    },
    api: {
        alwaysUseHTTPS: true,
        auth: 'oauth2/authorize',
        //url: 'http://cloudwalkers-website.local/',
        url: 'http://cloudwalkers-engine.local/',
        //admin : 'json/admin',
        admin: '1/admin',
        redirectUrl: 'http://cloudwalkers-superadmin.local/oauth.html',
        clientId: 'oauth2537f198a5ce488.49560531',
        state: 'xyz',
        scope: ''
    }
});

define({
    environment: 'production',

    // API settings
    api: {
        url: 'http://cloudwalkers-engine.local/',
        dataPath : 'json/admin',
        authPath: 'oauth2/authorize',
        redirectUrl: 'http://cloudwalkers-superadmin.local/oauth.html',
        clientId: '',
        state: 'xyz',
        scope: null
    }
});

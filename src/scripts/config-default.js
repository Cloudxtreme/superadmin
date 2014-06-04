define({
    environment: 'development',

    // API settings
    app: {
        tokenName: 'access_token',
        sessionName: 'session'
    },
    api: {
        url: 'http://cloudwalkers-website.local/',
        path : 'json/admin',
        authPath: 'oauth2/authorize',
        redirectUrl: 'http://cloudwalkers-superadmin.local/oauth.html',
        clientId: '680f7d83014fa3aca5ca054e3ebda5f70538ed73d',
        state: 'xyz',
        scope: ''
    }
});

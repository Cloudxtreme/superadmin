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
        url: 'https://devapi.cloudwalkers.be/',
        //url: 'http://cloudwalkers-engine.local/',
        //admin : 'json/admin',
        admin: '1/admin',
        redirectUrl: 'http://cloudwalkers-superadmin.local/oauth.html',
        clientId: '680f7d83014fa3aca5ca054e3ebda5f70538ed73d',
        state: 'xyz',
        scope: ''
    }
});

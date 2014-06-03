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
        url: 'http://engine.bmg.birkof.dev/',
        //url: 'http://platform.bmg.birkof.dev/',
        //admin: '1/admin',
        admin : 'json/admin',
        redirectUrl: 'http://superadmin.bmg.birkof.dev/oauth.html',
        clientId: 'oauth2537f198a5ce488.49560531',
        state: 'xyz',
        scope: ''
    }
});

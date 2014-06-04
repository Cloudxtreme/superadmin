define(['config', 'models/account'], function (config, AccountList) {
    var AccountsCollection = Backbone.Collection.extend({
        model: AccountList
        , url: config.api.url + config.api.path + '/accounts'
    });

    return AccountsCollection;
});
define(['backbone', 'config', 'models/account'], function (Backbone, config, AccountList) {
    var AccountsCollection = Backbone.Collection.extend({
        model: AccountList,
        url: config.api.url + config.api.dataPath + '/accounts'
    });

    return AccountsCollection;
});
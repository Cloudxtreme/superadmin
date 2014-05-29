define(['models/accounts/accounts'], function(TaskList) {
    var AccountLists = Backbone.Collection.extend({
        model: AccountList
        , url: '/1/admin/accounts'
    });

    return AccountLists;
});
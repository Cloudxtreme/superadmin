define(function() {
    var Account = Backbone.Model.extend({
        url: '/1/admin/accounts'
    });

    return Account;
});
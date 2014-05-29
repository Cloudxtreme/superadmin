define(function() {
    var AccountList = Backbone.Model.extend({
        url: '/1/admin/accounts'
    });

    return AccountList;
});
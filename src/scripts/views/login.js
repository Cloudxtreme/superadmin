define([
    'underscore',
    'backbone',
    'text!templates/login.html'
], function (_, Backbone, loginTemplate) {

    var loginView = Backbone.View.extend({
        // Variables
        template: _.template(loginTemplate),

        // View constructor
        initialize: function () {
            console.log('Initialize Login View');
        },

        // Render the content
        render: function (session) {
            console.log('Render Login View');




            if (!session.active()) {
                session.auth();
                this.setElement(this.template());
            } else {
                Backbone.history.navigate('/', {trigger: true, replace: true});
            }

            /*if (!session.active()) {
                session.auth();
                this.setElement(this.template());
            } else {
                Backbone.history.navigate('', {trigger: true});
            }*/

            // Maintains chainability
            return this;
        }
    });

    // Returns the class itself
    return loginView;
});

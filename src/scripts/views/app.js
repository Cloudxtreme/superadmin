define([
    'jquery',
    'underscore',
    'backbone',
    'views/header',
    'views/footer',
    'models/session',
    'common'
], function ($, _, Backbone, headerView, footerView, Session, Common) {

    var App = Backbone.View.extend({
        view: null,
        header: null,
        footer: null,
        el: '#superadmin',

        // Constructor
        initialize: function () {
            console.log('Initialized Main View');

            this.session = new Session();
            this.header = new headerView();
            this.footer = new footerView();
        },

        // Re-rendering the Superadmin app
        render: function () {
            console.log('Render Main View');

            // Emergency break
            if (!this.view) return null;

            // Session verification
            if (!this.session.get('session')) {
                Backbone.history.navigate('login', {trigger: true});
            } else {
                this.$el.before(this.header.render().el)
            }

            // Insert main content & footer
            this.$el
                .html(this.view.render().el)
                .after(this.footer.render().el);

            // Tell your view
            this.view.$el.trigger('rendered');
        },

        page: function (view) {

            if (this.view) this.view.remove();

            this.view = view;

            // Calls the view's render method
            this.render();
        }
    });

    // Returns the class itself
    return App;
});

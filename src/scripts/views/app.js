define([
    'jquery',
    'underscore',
    'backbone',
    'views/header',
    'views/footer',
    'models/session',
    'common'
], function ($, _, Backbone, Header, Footer, Session, Common) {

    var App = Backbone.View.extend({
        view: null,
        header: null,
        footer: null,
        session: null,
        el: '#superadmin',

        // Constructor
        initialize: function () {
            console.log('Initialize Main View');

            this.session = new Session();
            this.header = new Header();
            this.footer = new Footer();
        },

        // Re-rendering the Superadmin app
        render: function () {
            console.log('Render Main View');

            // Emergency break
            if (!this.view) return null;

            // Session verification
            if (!this.session.active()) {
                console.log('Navigate to <</login>> path');
                this.$el.prev('header').remove();
                Backbone.history.navigate('login', {trigger: true, replace: true});
            } else {
                console.log('Navigate to the <<view>> path');

                this.$el.before(this.header.render().el)
            }

            // Insert main content & footer
            this.$el
                .html(this.view.render(this.session).el)
                .after(this.footer.render().el);

            // Menu item selection
            this.header.selectMenuItem(this.view.menu);

            // Tell your view
            this.view.$el.trigger('rendered');
        },

        page: function (view, menuItem) {

            if (this.view) this.view.remove();

            this.view = view;
            this.view.menu = menuItem || 'home';

            // Calls the view's render method
            this.render();
        }
    });

    // Returns the class itself
    return App;
});

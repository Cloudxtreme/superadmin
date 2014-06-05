define([
    'jquery',
    'underscore',
    'backbone',
    'config',
    'views/header',
    'views/footer',
    'common'
], function ($, _, Backbone, config, Header, Footer, Common) {

    var App = Backbone.View.extend({
        view: null,
        header: null,
        footer: null,
        el: '#app',

        // Constructor
        initialize: function () {
            console.log('Initialize Main View');

            this.header = new Header();
            this.footer = new Footer();
        },

        // Re-rendering the Superadmin app
        render: function () {
            console.log('---> Main VIEW render()');

            // Emergency break
            if (!this.view) return null;

            // Layout reset
            $('header[role="navigation"]').remove();
            $('footer[role="footer"]').remove();

            // Session verification
            if (!Backbone.Auth.active() && this.view.menu != 'login') {
                console.log('Invalid SESSION, redirecting to login page...');
                Backbone.history.navigate('/login', {trigger: true});
            }

            // Header injection
            if (Backbone.Auth.active() && this.view.menu != 'login') {
                this.$el.before(this.header.render().el);
            }

            console.log('-> Rendering view <<' + this.view.menu + '>>');

            // Insert main content & footer
            this.$el
                .html(this.view.render().el)
                .after(this.footer.render().el);

            // Menu item selection
            this.header.selectMenuItem(this.view.menu);

            // Tell your view
            this.view.$el.trigger('rendered');
        },

        page: function (view, menuItem) {
            console.log('---> Main VIEW page()');
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

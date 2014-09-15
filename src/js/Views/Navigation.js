define (
	['backbone', 'mustache', 'Session'],
	function (Backbone, Mustache, Session)
	{
		var Navigation = Backbone.View.extend(
		{
			events: {},
			
			initialize: function ()
			{
				this.$header = $('.navbar-fixed-top').first();
			},
			
			render: function ()
			{
				var data;
				
				this.$el.html (Mustache.render(Templates.navigation, data));
				
				this.handleSidebarMenu();
				this.handleHeader();
				
				return this;
			},
			
			handleHeader: function () {
				
				this.$header.find('.profile-avatar').css('background-image', 'url(' + Session.user.get('avatar') + ')');
		    },
		    
			handleSidebarMenu: function () {
				
				var path = Backbone.history.fragment;
				
				// Ignore Dashboard start
				if(!path) return null;
				
				this.setActive(path);
		    },
		
		    setActive: function (path) {
				
				// Toggle .active class
				$('#sidebar .active').removeClass ('active');
				$('a[href="#' + path + '"]').parents('#sidebar .page-sidebar-menu *').addClass ('active');
		    }
		});
		
		return Navigation;
	}
);
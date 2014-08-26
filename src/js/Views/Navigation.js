Cloudwalkers.Views.Navigation = Backbone.View.extend({
	
	'events' : {},

	'initialize' : function ()
	{

	},
	
	'render' : function ()
	{

		var data;
		
		this.$el.html (Mustache.render(Templates.navigation, data));
		
		this.handleSidebarMenu();
		
		return this;
	},
	
	'handleSidebarMenu' : function () {
		
		var path = Backbone.history.fragment;
		
		// Ignore Dashboard start
		if(!path) return null;
		
		this.setActive(path);
    },
    
    'setActive' : function (path) {
		
		// Toggle .active class
		$('#sidebar .active').removeClass ('active');
		$('a[href="#' + path + '"]').parents('#sidebar .page-sidebar-menu *').addClass ('active');
    }
});
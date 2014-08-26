
Cloudwalkers.Views.Widgets.InboxList = Backbone.View.extend({
	
	'events' : {
		'remove' : 'destroy',
		'click .reload' : 'render'
	},
	
	'initialize' : function (options)
	{
		if(options) $.extend(this, options);
	},
	

	'render' : function ()
	{	
		// Template data
		var params = {};
		
		// Get template
		this.$el.html (Mustache.render ("Hello World.")); //(Templates.statuslist, params));
				
		return this;
	}
	
	/*	
		GitHub status
		function apiStatus(data) {
			console.log(data.status);
		}
		
		https://status.github.com/api/status.json?callback=apiStatus
		
		Mandrill Status
		Dploy.io Status
		Ai-Applied Status
				
		Twitter API Status
		Facebook API Status
		Linkedin API Status
		Sendible API Status
		Klout API Status
		
	*/
	
});
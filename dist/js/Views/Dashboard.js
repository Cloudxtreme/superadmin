Cloudwalkers.Views.Dashboard = Cloudwalkers.Views.Pageview.extend({

	'title' : "Dashboard",
	
	'widgets' : [
		
	],
	
	'initialize' : function()
	{

	},
		
	'render' : function ()
	{
		var widgets = this.widgets;

		// Pageview
		this.$el.html (Mustache.render ("Templates.pageview", { 'title' : this.title }));
		this.$container = this.$el.find("#container").eq(0);
		
		// Add status widget
		var status = new Cloudwalkers.Views.Status3dParty({model: this.model});
		
		this.appendWidget(status, 4);
		
		
		
		return this;
	}
});
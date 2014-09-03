$(function()
{
	Cloudwalkers.Views.Dashboard = Cloudwalkers.Views.Pageview.extend({
	
		title : "Dashboard",
		
		widgets : [
			
		],
		
		initialize : function()
		{
			
		},
			
		render : function ()
		{
			// Pageview
			this.$el.html (Mustache.render (Templates.pageview, { 'title' : this.title }));
			this.$container = this.$el.find("#container").eq(0);

			// Add recent accounts widget
			var recent = new Cloudwalkers.Views.RecentAccounts();
			
			this.appendWidget(recent, 8);
			
			// Add status widget
			var status = new Cloudwalkers.Views.Status3dParty();
			
			this.appendWidget(status, 4);
			
			return this;
		}
	});
});
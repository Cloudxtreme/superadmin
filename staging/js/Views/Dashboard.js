$(function()
{
	Cloudwalkers.Views.Dashboard = Cloudwalkers.Views.Pageview.extend({
	
		title : "Dashboard",
		
		widgets : [
			
		],
		
		initialize : function()
		{
			this.accounts = new Cloudwalkers.Collections.Accounts();
			
			this.listenTo(this.accounts, 'sync', this.fillAccounts);
		},
			
		render : function ()
		{
			// Load models
			this.accounts.fetch();
			
			// Pageview
			this.$el.html (Mustache.render (Templates.pageview, { 'title' : this.title }));
			this.$container = this.$el.find("#container").eq(0);
			
			// Add status widget
			var status = new Cloudwalkers.Views.Status3dParty();
			
			this.appendWidget(status, 4);
			
			// Add recent accounts widget
			var recent = new Cloudwalkers.Views.RecentAccounts();
			
			this.appendWidget(recent, 8);
			
			return this;
		},
		
		fillAccounts : function (collection)
		{
			
		}
	});
});
define (
	['mustache', 'Views/Pageview', 'Views/Panels/AccountsGrid', 'Views/Panels/Status3dParty'],
	function (Mustache, Pageview, AccountsGrid, Status3dParty)
	{
		var Dashboard = Pageview.extend(
		{
			title : "Dashboard",
				
			render : function ()
			{
				// Pageview
				this.$el.html (Mustache.render (Templates.pageview, { 'title' : this.title }));
				this.$container = this.$el.find("#container").eq(0);
	
				// Add recent accounts widget
				// var recent = new AccountsGrid({editable: false, limit: 10, title: 'Recent Accounts'});
				
				// this.appendWidget(recent, 9);
				
				// Add status widget
				var status = new Status3dParty();
				
				this.appendWidget(status, 3);
				
				return this;
			}
		});
		
		return Dashboard;
	}
);
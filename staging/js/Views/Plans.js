define (
	['mustache', 'Views/Pageview', 'Views/Panels/PlansGrid'],
	function (Mustache, Pageview, PlansGrid)
	{
		var Dashboard = Pageview.extend(
		{
			title : "Account Plans",
				
			render : function ()
			{
				// Pageview
				this.$el.html (Mustache.render (Templates.pageview, { 'title' : this.title }));
				this.$container = this.$el.find("#container").eq(0);
	
				// Add recent accounts widget
				var recent = new PlansGrid({editable: true, limit: 20, title: false});
				
				this.appendWidget(recent, 12);
				
				return this;
			}
		});
		
		return Dashboard;
	}
);
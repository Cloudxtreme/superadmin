define (
	['mustache', 'Views/Pageview'],
	function (Mustache, Pageview)
	{
		var DispatchLogs = Pageview.extend(
		{
			title : "Scheduling Performance",
				
			render : function ()
			{
				// Pageview
				this.$el.html (Mustache.render (Templates.pageview, { 'title' : this.title }));
				this.$container = this.$el.find("#container").eq(0);
	
				
				
				
				// Add recent accounts widget
				//var recent = new PlansGrid({editable: true, limit: 20, title: false});
				
				//this.appendWidget(recent, 12);
				
				return this;
			}
		});
		
		return Dashboard;
	}
);
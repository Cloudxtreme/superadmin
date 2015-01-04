define (
	['mustache', 'Views/Pageview', 'Views/Panels/Status', 'Collections/DispatchLogs'],
	function (Mustache, Pageview, StatusPanel, Collection)
	{
		var DispatchLogs = Pageview.extend(
		{
			title : "Scheduling Performance",
			
			initialize : function (options)
			{
				if (options) $.extend(this, options);
				
				// Logs collection
				this.collection = new Collection ();
				
				// Listen to model
				this.listenTo(this.collection, 'seed', this.fill);
			},
				
			render : function ()
			{
				// Pageview
				this.$el.html (Mustache.render (Templates.pageview, { 'title' : this.title }));
				this.$container = this.$el.find("#container").eq(0);
				
				// Add loading panel
				this.status = new StatusPanel({description: "Loading Schedules..."});
				
				this.appendWidget(this.status, 12);
				
				// Get Disptachlogs
				this.collection.fetch ();
				
				return this;
			},
			
			fill : function ()
			{
				this.status.updatecontent ({description: "Scheduling status", label: "Running", labelstyle: "success"});
			}
			
		});
		
		return DispatchLogs;
	}
);
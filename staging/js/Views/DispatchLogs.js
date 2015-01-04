define (
	['mustache', 'Views/Pageview', 'Views/Panels/Status', 'Views/Panel', 'Collections/DispatchLogs'],
	function (Mustache, Pageview, StatusPanel, Panel, Collection)
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
				this.listenTo(this.collection, 'sync', this.fill);
				this.listenTo(this.collection, 'error', this.fill);
			},
				
			render : function ()
			{
				// Pageview
				this.$el.html (Mustache.render (Templates.pageview, { 'title' : this.title }));
				this.$container = this.$el.find("#container").eq(0);
				
				// Add loading panel
				this.status = new StatusPanel({description: "Loading Schedules..."});
				this.list = new Panel ({title: "Overview"});
				
				this.appendWidget(this.status, 12);
				this.appendWidget(this.list, 12);
				
				// Get Disptachlogs
				this.collection.fetch ();
				
				return this;
			},
			
			fill : function (coll, list)
			{
				
				// Schedule running?
				var schedule = _.findWhere (list, {name: 'schedule'});
				
				// Status
				this.status.updatecontent (schedule.running?
					{description: "Scheduling status", label: "Running", labelstyle: "success"}:
					{description: "Scheduling status", label: "Stopped", labelstyle: "danger"}
				);
				
				if (!schedule.running)
					
					return null;
				
				// Add list
				this.list.render ({valuelist: list});
				
			}
			
		});
		
		return DispatchLogs;
	}
);
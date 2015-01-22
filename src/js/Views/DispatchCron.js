define (
	['mustache', 'Views/Pageview', 'Views/Panels/Status', 'Views/Panel'],
	function (Mustache, Pageview, StatusPanel, Panel)
	{
		var DispatchCron = Pageview.extend(
		{
			title : "Cron Overview",
			
			events : 
			{
				'click .panel-body .label.label-warning' : 'kill',
				'click .panel-body .label.label-success' : 'fill'
			},
				
			render : function ()
			{
				// Pageview
				this.$el.html (Mustache.render (Templates.pageview, { 'title' : this.title }));
				this.$container = this.$el.find("#container").eq(0);
				
				// Add loading panel
				this.status = new StatusPanel({description: "Loading cronner..."});
				this.list = new Panel ({title: "Overview"});
				
				this.appendWidget(this.status, 12);
				this.appendWidget(this.list, 12);
				
				
				// Status
				this.status.updatecontent ({description: "Cronner", label: "Run", labelstyle: "success"});
				
				return this;
			},
			
			fill : function ()
			{
				this.status.updatecontent ({description: "Cronner", label: "Stop", labelstyle: "warning"});
				
				
				
				
				/*
				if (!schedule.running)
					
					return null;
				
				for (var n in list)
					
					list[n].description += "<br><small><i>" + list[n].text + "</i></small>";
				
				// Add list
				this.list.render ({valuelist: list});*/
				
			},
			
			kill : function ()
			{
				this.status.updatecontent ({description: "Cronner", label: "Run", labelstyle: "success"});

			},
			
		});
		
		return DispatchCron;
	}
);
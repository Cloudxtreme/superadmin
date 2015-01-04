define (
	['Views/Panel', 'mustache'],
	function (Panel, Mustache)
	{
		var Status = Panel.extend({
		
			render: function (bk, data)
			{	
				
				// Template data
				var params = data? data : {
					title: this.title,
					description: this.descrition
				};
				
				// Get template
				this.$el.html (Mustache.render (Templates.status, params));
				this.$container = this.$el.find(".panel-body").eq(0);
				
				return this;
			}
		});
		
		return Status;
	}
);
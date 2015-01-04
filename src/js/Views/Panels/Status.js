define (
	['Views/Panel', 'mustache'],
	function (Panel, Mustache)
	{
		var Status = Panel.extend({
			
			title: null,
			
			render: function ()
			{	
				
				// Template data
				var params = this.params? this.params:
				{
					title: this.title,
					description: this.description
				};
				
				// Get template
				this.$el.html (Mustache.render (Templates.status, params));
				this.$container = this.$el.find(".panel-body").eq(0);
				
				return this;
			},
			
			updatecontent : function (params)
			{
				this.params = params;
				this.render ();
			}
			
		});
		
		return Status;
	}
);
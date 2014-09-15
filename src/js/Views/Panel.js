define (
	['backbone', 'mustache'],
	function (Backbone, Mustache)
	{
		var Panel = Backbone.View.extend({
			
			title: 'Panel',
			
			events: {
				'remove' : 'destroy',
			},
		
			initialize: function (options)
			{
				if(options) $.extend(this, options);
			},
		
			render: function ()
			{	
				// Template data
				var params = {
					title: this.title
				};
				
				// Get template
				this.$el.html (Mustache.render (Templates.panel, params));
				this.$container = this.$el.find(".panel-body").eq(0);
								
				return this;
			}
		});
		
		return Panel;
	}
);
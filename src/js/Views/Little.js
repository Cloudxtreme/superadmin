define (
	['mustache', 'Views/Pageview'],
	function (Mustache, Pageview)
	{
		var Little = Pageview.extend({
		
			title : "Little Ken",
			
			initialize : function()
			{
				
			},
				
			render : function ()
			{
				// Pageview
				this.$el.html (Mustache.render (Templates.little_ken, { 'title' : this.title }));
				this.$container = this.$el.find("#container").eq(0);
				
				// Request test response
				$.ajax('/tests/run.php', {success: this.fill.bind(this), error: this.fail});
							
				return this;
			},
			
			fill : function (response)
			{
				// Little Ken Results
				this.$container.append(response);
			},
			
			fail : function(err)
			{
				this.$container.append("Woops. Little Ken tripped.");
			}
		});
		
		return Little;
});

function assert(expr, msg)
{
	if (!expr) throw new Error(msg || 'failed');
}
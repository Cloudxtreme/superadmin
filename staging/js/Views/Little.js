define (
	['mustache', 'Session', 'Views/Pageview'],
	function (Mustache, Session, Pageview)
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
				$.ajax('/call-ken.php', {success: this.fill.bind(this), error: this.fail, headers: {
		            'Authorization': 'Bearer ' + Session.authenticationtoken,
		            'Accept': "application/json"
		        }});
							
				return this;
			},
			
			fill : function (response)
			{
				// Clean out response
				var lines = response.split("\n");
				lines.shift();
				lines.shift();
				
				// Little Ken header
				this.$container.find('.alert-info').html(lines.shift());
				lines.shift();
				
				// Little Ken output
				this.$container.find('.highlight code').append(lines.join('<br>'));
			},
			
			fail : function(err)
			{
				this.$container.find('.alert-info').removeClass('alert-info').addClass('alert-danger').html("Woops. Little Ken tripped.");
			}
		});
		
		return Little;
});

function assert(expr, msg)
{
	if (!expr) throw new Error(msg || 'failed');
}
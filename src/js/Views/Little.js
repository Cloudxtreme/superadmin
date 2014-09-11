$(function()
{
	Cloudwalkers.Views.Little = Cloudwalkers.Views.Pageview.extend({
	
		title : "Little Ken",
		
		initialize : function()
		{
			
		},
			
		render : function ()
		{
			// Pageview
			this.$el.html (Mustache.render (Templates.little_ken, { 'title' : this.title }));
			/**this.$container = this.$el.find("#container").eq(0);

			mocha.setup({ui: 'bdd'});
			mocha.checkLeaks();
			mocha.globals(['jQuery']);
			
			setTimeout(function(){mocha.run(); console.log('run')}, 100);*/
			
			return this;
		}
	});
});

function assert(expr, msg)
{
	if (!expr) throw new Error(msg || 'failed');
}
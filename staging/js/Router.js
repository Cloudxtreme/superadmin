Cloudwalkers.Router = Backbone.Router.extend ({

	routes :
	{
		'statistics' : 'statistics',
		'accounts' : 'accounts',
		'accounts/plans' : 'accounts_plans',
		'users' : 'users',
		'users/roles' : 'users_roles',
		'streams' : 'streams',
		'streams/scheduling' : 'streams_scheduling',
		'performance' : 'performance',
		'performance/servers' : 'performance_servers',
		'performance/logs' : 'performance_logs',

		'*path' : 'dashboard'
	},

	initialize : function (){},
	
	/**
	 *	General
	 **/

	dashboard : function ()
	{	
		Cloudwalkers.RootView.setView (new Cloudwalkers.Views.Dashboard());
	},
	
	statistics : function ()
	{	
		this.navigate("#dashboard", true);
	},
	
	firsttime : function ()
	{	
		Cloudwalkers.RootView.setView (new Cloudwalkers.Views.Firsttime());
	},
	
	home : function ()
	{	
		Cloudwalkers.Session.reset();
		window.location = "/";
		
		return false;
	},
	
	exception : function (errno)
	{ 
		var red = "/";
		
		/*switch(errno)
		{
			case 401 : red = "/401.html";
			case 503 : red = "/503.html";

			default : window.location = red;
		}*/
	},
	
	/**
	 *	Accounts
	 **/

	accounts : function ()
	{	
		this.navigate("#dashboard", true);
	},
	
	accounts_plans : function ()
	{	
		this.navigate("#dashboard", true);
	},
	
	/**
	 *	Users
	 **/

	users : function ()
	{	
		this.navigate("#dashboard", true);
	},
	
	users_roles : function ()
	{	
		this.navigate("#dashboard", true);
	},
	
	/**
	 *	Streams
	 **/

	streams : function ()
	{	
		this.navigate("#dashboard", true);
	},
	
	streams_scheduling : function ()
	{	
		this.navigate("#dashboard", true);
	},
	
	/**
	 *	Performance
	 **/

	performance : function ()
	{	
		this.navigate("#dashboard", true);
	},
	
	performance_servers : function ()
	{	
		this.navigate("#dashboard", true);
	},
	
	performance_logs : function ()
	{	
		this.navigate("#dashboard", true);
	}
});
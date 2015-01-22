define(
	['backbone', 'Session', 'Views/Dashboard', 'Views/Accounts', 'Views/Plans', 'Views/Little', 'Views/DispatchLogs', 'Views/DispatchCron'],
	function (Backbone, Session, DashboardView, AccountsView, PlansView, LittleView, DispatchLogsView, DispatchCronView)
	{
		var Router = Backbone.Router.extend (
		{
			routes :
			{
				'statistics' : 'statistics',
				'accounts' : 'accounts',
				'accounts/plans' : 'accounts_plans',
				'users' : 'users',
				'users/roles' : 'users_roles',
				'performance/little' : 'little_ken',
				'performance' : 'performance',
				'performance/servers' : 'performance_servers',
				'performance/logs' : 'performance_logs',
				'performance/logs-dev' : 'performance_logs_dev',
				'performance/cron' : 'performance_cron',
		
				'logout' : 'logout',
				'*path' : 'dashboard'
			},
			
			/**
			 *	General
			 **/
		
			dashboard : function ()
			{
				Cloudwalkers.RootView.setView (new DashboardView());
			},
			
			statistics : function ()
			{	
				this.navigate("#dashboard", true);
			},
			
			firsttime : function ()
			{	
				Cloudwalkers.RootView.setView (new Cloudwalkers.Views.Firsttime());
			},
			
			exception : function (errno)
			{ 
				var red = "/";
			},
			
			/**
			 *	Accounts
			 **/
		
			accounts : function ()
			{	
				Cloudwalkers.RootView.setView (new AccountsView());
			},
			
			accounts_plans : function ()
			{	
				Cloudwalkers.RootView.setView (new PlansView());
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
		
			little_ken : function ()
			{	
				Cloudwalkers.RootView.setView (new LittleView());
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
				Cloudwalkers.RootView.setView (new DispatchLogsView ());
			},
			
			performance_logs_dev : function ()
			{	
				Cloudwalkers.RootView.setView (new DispatchLogsView ({dev: true}));
			},
			
			performance_cron : function ()
			{	
				Cloudwalkers.RootView.setView (new DispatchCronView ());
			},
			
			logout : function ()
			{	
				$.ajax({ url: Cloudwalkers.config.authurl + "revoke", headers : {
		            'Authorization': 'Bearer ' + Session.authenticationtoken,
		            'Accept': "application/json"
		        },
		        success: function()
		        {
		        	window.location = "/";
		        }});
				
				Cloudwalkers.RootView.view.remove();
				Cloudwalkers.RootView.navigation.remove();
				
				window.localStorage.clear();
			}
		});
		
		return Router;
	}
);
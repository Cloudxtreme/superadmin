define(
	['backbone', 'Session', 'Router', 'config', 'Views/Root'],
	function (Backbone, Session, Router, config, RootView)
	{
		//var RootView = new RootView();
		
		var Cloudwalkers = {

			init : function ()
			{
				// Authentication
				var token = window.localStorage.getItem('token');
				
				// Check if there is authentication
				if(token && token.length > 9)
				{	
					Session.authenticationtoken = token;
					
				} else window.location = "/login.html";
				
				// First load essential user data
				Session.loadEssentialData (function ()
				{
					// Root view
					// Cloudwalkers.RootView = RootView;
					Cloudwalkers.RootView = new RootView ();
		
					// And then rout the router.
					Cloudwalkers.RouterInstance = new Router ();
					Backbone.history.start();
		
				});
				
				// Set config
				this.config = config;
				
				return this;
			},
			
			getRootView: function ()
			{
				return RootView;
			},
			
			hasToken : function ()
			{
				Store.get("settings", "token", function(entry)
				{
					if(entry) Cloudwalkers.hello();
					
					else
					{
						Cloudwalkers.setloginwindow();
						window.addEventListener("message", Cloudwalkers.receiveToken, false);	
					}
				});
			},
			
			receiveToken: function (event)
			{
				if (event.origin !== window.location.origin)
				return;
				
				Store.set("settings", {key: "token", value: event.data}, hello);
			},
			
			setloginwindow : function ()
			{
				$("iframe").get(0).src = config.authurl + "authorize?response_type=token&state=xyz&client_id=" + config.appid + "&redirect_uri=" + encodeURIComponent(origin() + "/auth.html");
			},
			
			hello : function ()
			{
				window.location = "/";
			},
		
		};
		
		/*
		 *	Add authorization headers to each Backbone.sync call
		 */
		Backbone.ajax = function()
		{
			// Is there a auth token?
			if(Session.authenticationtoken)
				
				arguments[0].headers = {
		            'Authorization': 'Bearer ' + Session.authenticationtoken,
		            'Accept': "application/json"
		        };
		
			return Backbone.$.ajax.apply(Backbone.$, arguments);
		};
		
		
		 /**
		 *	Model functions
		 *
		 **/
		
		Backbone.Model = Backbone.Model.extend({
			
			'url' : function (params)
		    {
		        return this.endpoint?
		        
		        	Cloudwalkers.config.apiurl + 'resellers/' + this.typestring + '/' + this.id + this.endpoint :
		        	Cloudwalkers.config.apiurl + this.typestring + '/' + this.id;
		    },
		    
		    'sync' : function (method, model, options)
			{
				// Hack
				if(method == "update") return false;
				
				return Backbone.sync(method, model, options);
			}
		});

    	return Cloudwalkers;
	}
);



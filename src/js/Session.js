define(
	['Cloudwalkers', 'Models/Me', 'Collections/Accounts'],
	function (Cloudwalkers, Me, Accounts)
	{
		Session = 
		{
			
			'user' : null,
			'resynced' : false,
			
			'initialize' : function ()
			{
				// Collect Accounts
				this.accounts = new Accounts();
				//Store.filter("accounts", null, function(list) { this.accounts.add(list); }.bind(this));
					
			},
		
			'isLoaded' : function ()
			{
				return this.user != null;
			},
			
			'loadEssentialData' : function (callback)
			{
				
				this.user = new Me();
				this.user.fetch({success: callback, error: this.logout});
				
			},
			
			'refresh' : function ()
			{
				console.log("Session.refresh triggered")
			},
			
			'reset' : function ()
			{
				window.localStorage.clear();
			},
			
			'home' : function()
			{
				Cloudwalkers.Router.Instance.home();	
			},
			
			'logout' : function ()
			{
				window.localStorage.clear();
				if(this.authenticationtoken)	Store.remove("settings", "token", function(){ console.log("logged out") }/*Cloudwalkers.Router.home*/);
				//else							window.location = "/";
			},
			
			'updateSetting' : function(attribute, value, callbacks)
			{
				
				if( Session.user.attributes.settings[attribute] != value)
				{
					// Update session and save on user
					Session.user.attributes.settings[attribute] = value;
					
					callbacks = ($.extend(callbacks, {patch: true}) || {patch: true});
					
					Session.user.save({settings: Session.user.attributes.settings}, callbacks);
				}
			},
			
			'get' : function(attribute)
			{
				// Update session
				return this.user.get("settings")[attribute];
			},
			
			'clone' : function(obj)
			{
				if(obj == null || typeof(obj) != 'object') return obj;
				
				var output = obj.constructor();
				
				for (var key in obj)
					output[key] = this.clone(obj[key]);
				
				return output;
			},
			
			'viewsettings' : function(value, content)
			{
				// Split into accounts
				var pointer = "account_" + this.getAccount().id;
				
				if(!Session.user.attributes.settings.viewsettings)
					Session.user.attributes.settings.viewsettings = {};
				
				if(!Session.user.attributes.settings.viewsettings[pointer])
					Session.user.attributes.settings.viewsettings[pointer] = Cloudwalkers.RootView.navigation.mapViews();
				
				var viewsettings = this.clone(this.get("viewsettings"));
				
				if(!content) return viewsettings[pointer][value];
				
				else if(value && content)
				{
					viewsettings[pointer][value] = $.extend(viewsettings[pointer][value], content);
					this.updateSetting("viewsettings", viewsettings);
					
					return viewsettings[pointer][value];
				
				} else throw TypeError ("Not the right parameters were met for function viewsettings");
			},
			
			/**
			 *	Manage storage
			 **/
		
			'manage' : function ()
			{
		
				// Limit messages
				
				var messagecount = Store.count("messages");
				
				if(messagecount > 200)
					Store.filter("messages", null, function(list)
					{
						// Sort list timestamp ASC
						list.sort(function (a, b) {
							if (a.stamp > b.stamp) return 1;
							if (a.stamp < b.stamp) return -1;
							return 0;
						});
						
						// Save newest, remove oldest
						list = list.slice(0, 100);
						Store.write("messages", list);
						
						// Clean touch id-lists
						Store.filter("touches", null, function(list)
						{
							var cursor = Session.getPing().cursor;
							
							list = list.filter(function(touch){ return touch.ping == cursor; });
							
							Store.write("touches", list);
						});
					});
					
					
				// Limit reports
				
				var reportcount = Store.count("reports");
				
				if(reportcount > 25)
					Store.filter("reports", null, function(list)
					{
						// Sort list timestamp ASC
						list.sort(function (a, b) {
							if (a.stamp > b.stamp) return 1;
							if (a.stamp < b.stamp) return -1;
							return 0;
						});
						
						// Save newest, remove oldest
						list = list.slice(0, 10);
						Store.write("messages", list);
					});
		
			},
		
			/**
			 *	Role permissions
			 *  Checks for permission or returns the authorized list
			 **/
		
			'isAuthorized' : function(actions)	
			{
				return (actions)? this.user.isauthorized(actions): this.user.authorized;
			},
		
			/* 	Generate permission tokens for templates */
			'censuretemplate' : function(data)
			{
				if(!data)	data = {};
		
				var authorized = this.getUser().censuretokens;		
		
				data.authorized = authorized;
			},
			
			/**
			 *	Ping shortcut function
			 **/
		
			'getPing' : function ()
			{
				return this.user.account.ping;
			},
			
			'ping' : function (callback)
			{
				this.user.account.ping.forceping(callback);
			},
			
			/**
			 *	Accounts shortcut functions
			 **/
		
			'getAccount' : function (id)
			{
				return (id)? this.user.accounts.get(id):  this.user.account;
			},
		
			
		
			'getAccounts' : function (id)
			{
				return this.user.accounts;
			},
			
			/**
			 *	Channels shortcut functions
			 **/
			
			'getChannel' : function (id)
			{
				return (typeof id == "number")? this.user.account.channels.get(id): this.user.account.channels.findWhere({type: id});
			},
			
			'getChannels' : function (id)
			{
				return this.user.account.channels;
			},
			
			'storeChannel' : function(channel)
			{
				// Store child channels
				if( channel.channels && channel.channels.length)
					channel.channels = channel.channels.map(function(el)
					{ 
						Session.storeChannel(el);
						return el.id;
					});
				
				// Store child streams
				if( channel.streams && channel.streams.length)
					channel.streams = channel.streams.map(function(el)
					{ 
						Store.post("streams", el);
						return el.id;
					});

				Store.post("channels", channel);
			},
			
			
			/**
			 *	Streams shortcut functions
			 **/
			
			'getStream' : function (id)
			{
				return (typeof id == "number")?  this.user.account.streams.get (id):  this.user.account.streams.findWhere({token: id});
			},
			
			'getStreams' : function ()
			{
				return this.user.account.streams;
			},
			
			
			/**
			 *	Users shortcut functions
			 **/
			
			'getUser' : function (id)
			{
				return (id)? this.user.account.users.get (id):  this.user;
			},
			
			'getUsers' : function ()
			{
				return this.user.account.users;
			},
			
			/**
			 *	Contacts shortcut functions
			 **/
			
			'getContact' : function (id)
			{
				return this.user.account.contacts.get (id);
			},
			
			'getContacts' : function ()
			{
				return this.user.account.contacts;
			},
			
			/**
			 *	Messages shortcut functions
			 **/
			
			'getMessage' : function (id)
			{
				return this.user.account.messages.get (id);
			},
			
			'getMessages' : function ()
			{
				return this.user.account.messages;
			},
		
			/**
			 *	Messages shortcut functions
			 **/
			
			'getCannedResponse' : function (id)
			{
				return this.user.account.cannedresponses.get(id);
			},
			
		
			'getCannedResponses' : function ()
			{
				return this.user.account.cannedresponses;
			},
			
			/**
			 *	Notifications shortcut functions
			 **/
			
			'getNotification' : function (id)
			{
				return this.user.account.notifications.get (id);
			},
			
			'getNotifications' : function ()
			{
				return this.user.account.notifications;
			},
			
			/**
			 *	Statistics shortcut functions
			 **/
			
			'getStatistic' : function (id)
			{
				return this.user.account.statistics.get (id);
			},
			
			'getStatistics' : function ()
			{
				return this.user.account.statistics;
			},
			
			/**
			 *	Reports shortcut functions
			 *	Deprectated?
			 **/
			
			'getReport' : function (id)
			{
				return this.user.account.reports.get (id);
			},
			
			'getReports' : function ()
			{
				return this.user.account.reports;
			},
			
			/**
			 *	Messages shortcut functions - deprecated
			 **/
			
			'getComment' : function (id)
			{
				return this.user.account.comments.get (id);
			},
			
			'getComments' : function ()
			{
				return this.user.account.comments;
			},
		
			/* setLang - get default language */
			'setLang' : function(callback)
			{
				var lang = this.user.attributes.locale;
				var extendLang;
		
				moment.lang(lang);
				
				extendLang = new Polyglot();
				extendLang.fetch({
					success: function (){
						this.translationLang = extendLang.get("translation");
						this.polyglot = new Polyglot({phrases: this.translationLang});
						this.trigger("translation:done");
					}.bind(this)
				});
		
			}
		}
		
		// Add events
		_.extend(Session, Backbone.Events);
		
		return Session;
	}
);
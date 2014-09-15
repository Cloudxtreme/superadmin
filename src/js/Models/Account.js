define (
	['backbone', 'Cloudwalkers', 'Session'],
	function (Backbone, Cloudwalkers, Session)
	{
		var Account = Backbone.Model.extend(
		{
			typestring : "accounts",
			
			parse : function (response)
			{		
				return response.account? response.account: response;
			},
			
			url : function ()
			{		
				return Cloudwalkers.config.apiurl + 'json/account/' + this.id + this.endpoint;
			},
			
			sync : function (method, model, options)
			{
				return Backbone.sync(method, model, options);
			},
			
			firstload : function()
			{
				// Store channels and their children
				$.each(this.get("channels"), function(n, channel){ Session.storeChannel(channel); });
			},
			
			activate : function ()
			{	
				// First load
				if(!Store.exists("channels")) this.firstload();
				
				// Fetch Canned Responses
				//this.cannedresponses.fetch({parameters: {records: 50}});
				
				// Load Streams (first, so channels find them)
				Store.filter("streams", null, function(list) { this.streams.add(list); }.bind(this));
				
				// Load Channels
				Store.filter("channels", null, function(list) { this.channels.add(list); }.bind(this));
				
				// Load Campaigns
				Store.filter("campaigns", null, function(list){ this.campaigns.add(list); }.bind(this));
				
				// Load Users
				Store.filter("users", null, function(list){ this.users.add(list); }.bind(this));
				
				// Load Messages
				Store.filter("messages", null, function(list){ this.messages.add(list); }.bind(this));
				
				// Load Statistics
				Store.filter("statistics", null, function(list){ this.statistics.add(list); }.bind(this));
				
				// Load Reports // Deprecated?
				Store.filter("reports", null, function(list){ this.reports.add(list); }.bind(this));
				
				// Filter limits
				if( this.get("plan"))
					this.limits = this.get("plan").limits;
				
				// Connect ping to account
				this.ping = new Session.Ping({id: this.id});
		
			},
			
			monitorlimit : function(type, current, target)
			{
				if(current >= this.limits[type])
				{
					$('.alert-info').remove();
						
					Cloudwalkers.RootView.information ("Upgrade?", "You're fresh out of " + type /*type.slice(0, -1)*/ + " slots, maybe you should upgrade.");
				
					if(target)
					{
						if(typeof target == "string") target = $(target);
						target.addClass("limited").attr("disabled", true);
					}
							
					return true;
				}
				
				// Or remove
				if($("[disabled].limited").size())
				{
					$("[disabled].limited").removeClass("limited").attr("disabled", false);
					$("[data-dismiss=alert]").click();
				}
				
				return false;
			},
			
			addcampaign : function (name, callback)
			{
				var campaigns = this.get("campaigns");
				
				if (campaigns.map(function(c){ return c.name }).indexOf(name) < 0)
				{
					campaigns.push({name: name});
					this.save({campaigns: campaigns}, {patch: true, wait: true, success: callback});
				}
			},
			
			removecampaign : function (id, callback)
			{
				var campaigns = this.get("campaigns");
				
				campaigns.forEach (
					function(campaign, n) { if(campaign.id == id) campaigns.splice(n, 1)}
				);
			
				this.save({campaigns: campaigns}, {patch: true, wait: true, success: callback});
			}
		});
	
		return Account;
	}
);
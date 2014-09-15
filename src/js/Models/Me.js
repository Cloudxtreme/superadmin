define (
	['Cloudwalkers', 'Session', 'Collections/Accounts', 'Models/User'],
	function (Cloudwalkers, Session, Accounts, User)
	{
		var Me = User.extend(
		{	
			initialize: function (data)
			{
				// Load data
				this.once('change', this.activate);
				
				// Prevent conflicting user login
				this.on ('change:id', function(id){ if(this.previous("id")) Session.home(); });
			},
		
			url: function ()
			{
				//return '/me.json';
				return "https://devapi.cloudwalkers.be/1/users/me?include_accounts=ids";
			},
			
			parse: function (response)
			{
				return response.user;
			},
			
			firstload: function (me)
			{
				// Check default account
				if(!me.settings.currentAccount)
					me.settings = {currentAccount: me.accounts[0].id};
								
				return me;
			},
			
			activate: function (data)
			{
				// Prevent dislodged user access
				if(!this.get("accounts").length)
					return Cloudwalkers.RootView.exception(401);
				
				// Get stored accounts
				Store.filter("accounts", null, function(accounts)
				{
					this.accounts = new Accounts(accounts);
					
					// Set current account
					this.account = this.getCurrentAccount();
					this.account.activate();
					
					// Set current user level & permissions
					this.set('level', Number(this.account.get("currentuser").level));
					this.set('rolegroup', Number(this.account.get("currentuser").rolegroup));

					// Role permissions
					this.authorized = this.account.get("currentuser").authorized;
					this.removerole('ACCOUNT_TAGS_MANAGE');
					this.removerole('ACCOUNT_TAGS_VIEW');
		
					this.parseauthorized();
					this.censuretokens = this.censure(this.authorized);			
		
					// Call callback
					this.trigger("activated");
					//setTimeout(this.trigger, 100, 'activated');
		
				}.bind(this));
			},
		
			// Can perform ANY of the actions?
			isauthorized: function(actions)
			{	
				if(!_.isArray(actions))		return _.contains(this.authorized, actions);
				else 						return _.intersection(this.authorized, actions).length !== 0;
			},
		
			removerole: function(role)
			{	
				var index = this.authorized.indexOf(role);
		
				if(index >= 0)
					this.authorized.splice(index-1, index+1)
			},
		
			censure: function(permissions)
			{	
				var censures = {};
		
				for(var n in permissions){
					censures[permissions[n]] = true;
				}
		
				return censures;
			},
		
			parseauthorized: function()
			{
				if(this.isauthorized(['MESSAGE_OUT_EDIT_OWN', 'MESSAGE_ACTIONS'])) this.authorized.push('_CW_COWORKERS_VIEW');
				if(this.isauthorized([
					'MESSAGE_READ_INBOX_MESSAGES',
					'MESSAGE_READ_INBOX_NOTIFICATIONS', 
					'MESSAGE_READ_SCHEDULE', 
					'MESSAGE_READ_DRAFTS', 
					'ACCOUNT_NOTES_VIEW'
				])) this.authorized.push('_CW_INBOX_VIEW');
			},
			
			offline: function ()
			{
				// If Me exists local, use when offline.
				if (Store.exists("me")) this.trigger("change");
			},
			
			getCurrentAccount: function()
			{
				// Get current account view
				var current = Session.get("currentAccount");	
				
				if(!current)
				{
					current = this.accounts.at(0).id;
					this.save({settings: {currentAccount: current}});
				}
		
				var account = this.accounts.get(Number(current));
				
				// Emergency check, force full reload
				if(!account || !account.id)
				{	
					 this.save({settings: {currentAccount: this.accounts.at(0).id}});
					 
					 return Session.home();
				}
		
				return account;
			}
		});
		
		return Me;
	}
);
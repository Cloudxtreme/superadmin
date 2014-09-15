define (
	['backbone', 'backbone.paginator', 'Models/Account'],
	function(Backbone, PageableCollection, Account)
	{
		var Accounts = PageableCollection.extend(
		{
			typestring : "accounts",
			
			model: Account,
			
			url : function(a)
			{	
				// local
				//if(true) return '/accounts.json';

				// Get parent model
				if(this.parentmodel && !this.parenttype) this.parenttype = this.parentmodel.get("objectType");
				
				var url = (this.parentmodel)?
			
					Cloudwalkers.config.apiurl + 'resellers/1/' + this.parenttype + "/" + this.parentmodel.id :
					Cloudwalkers.config.apiurl + 'resellers/1/' + this.typestring;
						
				if(this.endpoint)	url += "/" + this.endpoint;
			
				return this.parameters? url + "?" + $.param (this.parameters): url;
			},
			
			sync : function (method, model, options)
			{
				// Hack
				if(method == "update") return false;
		
				return Backbone.sync(method, model, options);
			},
			
			parse: function (response)
			{	
				// Hack for double array		
				/*if (response.length == 1)
					response = response[0];*/
				
				return response.reseller.accounts;
			},
			
			updates: function (ids)
			{
				for(var n in ids)
				{
					var model = this.get(ids[n]);
					
					if(model)
					{
						// Store with outdated parameter
						Store.set(this.typestring, {id: ids[n], outdated: true});
						
						// Hard relaod data
						model.fetch();
					}
				}
			},
		
			outdated: function(id)
			{
				// Collection
				if(!id) return this.filter(function(model){ return model.outdated});
				
				// Update model
				var model = this.updates([id]);
			}
		});
		
		return Accounts;
	}
);
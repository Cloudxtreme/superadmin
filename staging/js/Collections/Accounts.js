Cloudwalkers.Collections.Accounts = Backbone.Collection.extend({

	'model' : Cloudwalkers.Models.Account,
	
	'initialize' : function ()
	{
		if (Cloudwalkers.Session.accounts)
			Cloudwalkers.Session.accounts.listenTo(this, "add", Cloudwalkers.Session.accounts.distantAdd)	
	},
	
	'parse' : function (response)
	{	
		console.log(response)
		
		/*if(this.parentmodel && !this.parenttype)
			this.parenttype = this.parentmodel.get("objectType");
		
		// Solve response json tree problem
		if (this.parentmodel)
			response = response[this.parenttype];
		
		// Get paging
		if(response)
			this.setcursor(response.paging);
		
		// Ready?
		if(!response.paging) this.ready();
		
		return response[this.typestring];*/
		
		return response;
	},
	
	/*'fetch' : function(method, model, options) 
	{
		return Cloudwalkers.Session.user.get("accounts");
	},*/
	
	'updates' : function (ids)
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

	'outdated' : function(id)
	{
		// Collection
		if(!id) return this.filter(function(model){ return model.outdated});
		
		// Update model
		var model = this.updates([id]);
	}
});
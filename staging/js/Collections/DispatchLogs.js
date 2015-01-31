define (
	['backbone', 'backbone.paginator', 'Models/DispatchLog'],
	function(Backbone, PageableCollection, DispatchLog)
	{
		var DispatchLogs = PageableCollection.extend(
		{
			typestring : "dispatchlogs",
			
			model: DispatchLog,
			
			initialize : function (options)
			{
				if(options) $.extend(this, options);
			},
			
			url : function(a)
			{	
				
				this.parameters = {bearer: Session.authenticationtoken}; 
				
				// API 1.1 /dispatchlogs
				var url =  (this.dev? Cloudwalkers.config.devlapiurl: Cloudwalkers.config.lapiurl) + 'logs/digest';
			
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
				return response.dispatchlogs;
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
		
		return DispatchLogs;
	}
);
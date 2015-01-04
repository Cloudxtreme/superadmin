define (
	['backbone', 'Cloudwalkers', 'Session'],
	function (Backbone, Cloudwalkers, Session)
	{
		var DispatchLog = Backbone.Model.extend(
		{
			typestring : "dispatchlogs",
			
			parse : function (response)
			{		
				return response.account? response.account: response;
			},
			
			url : function ()
			{		
				return Cloudwalkers.config.lapiurl + 'dispatchlogs/' + this.id + this.endpoint;
			},
			
			sync : function (method, model, options)
			{
				return Backbone.sync(method, model, options);
			}
		});
	
		return DispatchLog;
	}
);
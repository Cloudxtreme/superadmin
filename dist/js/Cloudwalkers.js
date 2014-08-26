var Cloudwalkers = {

	'Views' : {},
	'Router' : {},
	'Models' : {},
	'Collections' : {},
	'Utilities' : {},

	'init' : function ()
	{

		// First load essential user data
		Cloudwalkers.Session.loadEssentialData (function ()
		{
			// Root view
			Cloudwalkers.RootView = new Cloudwalkers.Views.Root ();

			// And then rout the router.
			Cloudwalkers.Router.Instance = new Cloudwalkers.Router ();
			Backbone.history.start();

		});
	}
};

/**
 *	Cloudwalkers level Exceptions
 **/

function AuthorizationError (message)
{
	this.name = "Not Authorized";
	this.message = (message || "Not authorized for the current user (no matching authorization token)")
	this.stack = (new Error()).stack;
}

AuthorizationError.prototype = new Error();
AuthorizationError.prototype.constructor = AuthorizationError;


 /**
 *	Model functions
 *
 *	url				create Cloudwalkers API friendly endpoints
 *	parse			pepare incoming object
 *	sync			handle fetch requests and prevent trigger-happy update requests
 *	stamp			add timestamp to model and store
 **/

Backbone.Model = Backbone.Model.extend({
	
	'url' : function (params)
    {
        return this.endpoint?
        
        	CONFIG_BASE_URL + 'json/' + this.typestring + '/' + this.id + this.endpoint :
        	CONFIG_BASE_URL + 'json/' + this.typestring + '/' + this.id;
    },
    
    'sync' : function (method, model, options)
	{
		options.headers = {
            'Authorization': 'Bearer ' + Cloudwalkers.Session.authenticationtoken,
            'Accept': "application/json"
        };
		
		// Hack
		if(method == "update") return false;
		
		return Backbone.sync(method, model, options);
	}
});
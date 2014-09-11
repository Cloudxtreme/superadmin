var Cloudwalkers = {

	'apiurl' : 'https://devapi.cloudwalkers.be/1/',
	'appid' : 'oauth253df6850dec638.12776363',

	'Views' : {},
	'Router' : {},
	'Models' : {},
	'Collections' : {},
	'Utilities' : {},

	'init' : function ()
	{
		// Authentication
		var token = window.localStorage.getItem('token');
		
		// Check if there is authentication
		if(token && token.length > 9)
		{	
			Cloudwalkers.Session.authenticationtoken = token;
			
		} else window.location = "/login.html";

		// Define API root
		Cloudwalkers.Session.api = config.apiurl;
		
		// First load essential user data
		Cloudwalkers.Session.loadEssentialData (function ()
		{
			// Root view
			Cloudwalkers.RootView = new Cloudwalkers.Views.Root ();

			// And then rout the router.
			Cloudwalkers.Router.Instance = new Cloudwalkers.Router ();
			Backbone.history.start();

		});
		
		// Set config
		this.config = config;

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


/*
 *	Add authorization headers to each Backbone.sync call
 */
Backbone.ajax = function()
{
	// Is there a auth token?
	if(Cloudwalkers.Session.authenticationtoken)
		
		arguments[0].headers = {
            'Authorization': 'Bearer ' + Cloudwalkers.Session.authenticationtoken,
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
        
        	Cloudwalkers.config.apiurl + 'admin/' + this.typestring + '/' + this.id + this.endpoint :
        	Cloudwalkers.config.apiurl + this.typestring + '/' + this.id;
    },
    
    'sync' : function (method, model, options)
	{
		// Hack
		if(method == "update") return false;
		
		return Backbone.sync(method, model, options);
	}
});

/**
 *	Collection functions
 *
 **/

Backbone.Collection = Backbone.Collection.extend({

	'typestring' : "accounts",

	'distantAdd' : function(model)
	{
		if(!this.get(model.id)) this.add(model);	
	},
	
	'url' : function(a)
	{	
		// Get parent model
		if(this.parentmodel && !this.parenttype) this.parenttype = this.parentmodel.get("objectType");
		
		var url = (this.parentmodel)?
	
			Cloudwalkers.config.apiurl + 'admin/' + this.parenttype + "/" + this.parentmodel.id :
			Cloudwalkers.config.apiurl + 'admin/' + this.typestring;
				
		if(this.endpoint)	url += "/" + this.endpoint;
	
		return this.parameters? url + "?" + $.param (this.parameters): url;
	},
	
	'sync' : function (method, model, options)
	{
		// Hack
		if(method == "update") return false;

		return Backbone.sync(method, model, options);
	},
	
	'parse' : function (response)
	{	
		if(this.parentmodel && !this.parenttype)
			this.parenttype = this.parentmodel.get("objectType");
		
		// Solve response json tree problem
		if (this.parentmodel)
			response = response[this.parenttype];
		
		// Get paging
		if(response)
			this.setcursor(response.paging);
		
		// Ready?
		if(!response.paging) this.ready();
		
		return response[this.typestring];
	},
	
	'setcursor' : function (paging) {
		
		// Without paging, it's a models call (ignore)
		if(!paging) return false;
	
		this.cursor = paging.cursors? paging.cursors.after: false;
	},
	
	'updates' : function (ids)
	{
		for(var n in ids)
		{
			var model = this.get(ids[n]);
			
			if(model && model.get("objectType"))
			{
				// Store with outdated parameter
				Store.set(this.typestring, {id: ids[n], outdated: true});
				
				// Trigger active models
				model.outdated = true;
				model.trigger("outdated");
			}
		}
	},

	'outdated' : function(id)
	{
		// Collection
		if(!id) return this.filter(function(model){ return model.outdated});
		
		// Update model
		var model = this.updates([id]);
	},
	
	'touch' : function(model, params)
	{	
		// Work data
		this.parentmodel = model;
		this.endpoint = this.modelstring + "ids";
		this.parameters = params;

		// Check for history (within ping lifetime), temp disabled
		// Store.get("touches", {id: this.url(), ping: Cloudwalkers.Session.getPing().cursor}, this.touchlocal.bind(this));
		
		// Hard-wired request (no caching)
		this.fetch({success: this.touchresponse.bind(this, this.url())});
	},
	
	'touchlocal' : function(touch)
	{
		// Is there a local touch list (and filled)?
		if (touch && touch.modelids.length)
		{
			this.cursor = touch.cursor;
			this.seed(touch.modelids);
			this.ready();
		
		} else this.fetch({success: this.touchresponse.bind(this, this.url())});
	},
	
	'touchresponse' : function(url, collection, response)
	{	
		// Get ids
		var ids = response[this.parenttype][this.typestring];

		// Store results based on url
		Store.set("touches", {id: url, modelids: ids, cursor: this.cursor, ping: Cloudwalkers.Session.getPing().cursor});
		
		// Seed ids to collection
		this.seed(ids);
	},
	

	/**
		Temp: non-caching seed
	**/
	'seed' : function(ids)
	{
		// Ignore empty id lists
		if(!ids) ids = [];
	
		var list = [];
		var fresh = _.compact( ids.map(function(id)
		{
			// In current Collection
			var model = this.get(id);
			
			// Or in Session collection
			if(!model)
				model = Cloudwalkers.Session.user.account[this.typestring].get (id);
			
			// Or create new
			if(!model) model = this.create({id: id});
			else this.add(model);
				
			list.push(model);
			
			return id;
		
		}, this));
				
		// Get list based on ids
		if(fresh.length)
		{
			this.endpoint = this.parentmodel? this.typestring: null;
			this.parameters = {ids: fresh.join(",")};
			
			this.fetch({remove: false});
		}
		// Trigger listening models
		this.trigger("seed", list);
		
		return list;
	},
	
	'more' : function(model, params)
	{
		if(!this.cursor) return false;
		
		params.after = this.cursor;
		this.touch(model, params)
		
		return this;
	},
	
	'ready' : function()
	{	
		setTimeout(function(collection){ collection.trigger("ready", collection); }, 1, this);
	}
});

var origin = function ()
{
	return (window.location.origin)? window.location.origin : window.location.protocol + "//" + window.location.hostname;
}
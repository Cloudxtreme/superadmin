/**
 * Require dependencies
 * /
require.config({
	baseUrl: '/js/',
	paths: {
		'jquery': 'lib/jquery/jquery',
		'underscore': 'lib/underscore/underscore',
		'backbone': 'lib/backbone/backbone',
		'bootstrap': 'lib/bootstrap/dist/js/bootstrap',
		'mustache': 'lib/mustache/mustache'
	},
	shim: {
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: ['underscore', 'jquery', 'mustache'],
			exports: 'Backbone'
		},
		'bootstrap': {
			deps: ['jquery'],
			exports: 'bootstrap'
		}
	}
});
	
require(
	['jquery', 'underscore', 'backbone', 'mustache', 'bootstrap', 'Cloudwalkers'],
	function($, _, backbone, mustache, bootstrap, templates, Cloudwalkers)
	{
		
		console.log(Cloudwalkers)
		$(function()
		{
			// IDB Store
			Store = new StorageClassIDB("cwdSuperDB", 2, function()
			{
				Cloudwalkers.init();
			});
		});
	}
);*/

/**
 *	Cloudwalkers level Exceptions
 */
function AuthorizationError (message)
{
	this.name = "Not Authorized";
	this.message = (message || "Not authorized for the current user (no matching authorization token)")
	this.stack = (new Error()).stack;
}

AuthorizationError.prototype = new Error();
AuthorizationError.prototype.constructor = AuthorizationError;

/**
 * Origin function
 */
var origin = function ()
{
	return (window.location.origin)? window.location.origin : window.location.protocol + "//" + window.location.hostname;
}
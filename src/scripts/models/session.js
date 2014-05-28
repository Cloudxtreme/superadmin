define([
    'underscore',
    'backbone',
	'models/user'
], function (_, Backbone, userModel) {

    var SessionModel = Backbone.Model.extend({
		urlRoot: '/echo/json/',
        // Default values for all of the Model attributes
        defaults: {
            session: null,
            completed: false
        },

        initialize: function () {
            console.log('Initialized Session Model');
			
			if( typeof localStorage != "undefined" && localStorage !== null ){
				// choose localStorage
				this.store = this.localStorage;
			} else {
				// otherwise we need to store data in a cookie
				this.store = this.cookie;
			}
			
			
			// try loading the session
			var localSession = this.store.get('session');
			this.session = !_.isNull(localSession) ? localSession : null;
			
			//this.user = new userModel();
			//this.user.once('activated', callback);
			//this.user.fetch();

			//var e = localStorage.getItem('user');
            //this.set('user', e ? JSON.parse(e) : ['']);
        },

        // Gets called automatically by Backbone when the set and/or save methods are called
        validate: function(attrs) {

        },
		
		active: function () {
			return this.session != null;
		},

        /*get: function (attr) {
            return this.user.get('settings')[attr];
        },*/
		
		getAuth: function(callback) {
			this.fetch({
				//success: callback
				success: function (user) {
					console.log(user.toJSON());
				}
			});
		},
		
		localStorage : {
			get : function( name ) {
				return localStorage.getItem( name );
			},
			set : function( name, val ){
				return localStorage.setItem( name, val );
			},
			check : function( name ){
				return ( localStorage.getItem( name ) == null );
			},
			clear: function( name ){
				// actually just removing the session...
				return localStorage.removeItem( name );
			}
		},
		cookie : {
			get : function( name ) {
				var i,key,value,cookies=document.cookie.split(";");
				for (i=0;i<cookies.length;i++){
					key=cookies[i].substr(0,cookies[i].indexOf("="));
					value=cookies[i].substr(cookies[i].indexOf("=")+1);
					key=key.replace(/^\s+|\s+$/g,"");
					if (key==name){
						return unescape(value);
					}
				}
			},
	 
			set : function( name, val ){
				// automatically expire session in a day
				var expiry = 86400000;
				var date = new Date( ( new Date() ).getTime() + parseInt(expiry) );
				var value=escape(val) + ((expiry==null) ? "" : "; expires="+date.toUTCString());
				document.cookie=name + "=" + value;
			},
	 
			check : function( name ){
				var cookie=this.get( name );
				if (cookie!=null && cookie!=""){
					return true;
				} else {
					return false;
				}
			},
	 
			clear: function( name ) {
				document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
			}
		}
    });

    // Returns the class itself
    return SessionModel;
});
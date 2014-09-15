define (
	['underscore', 'backbone', 'Cloudwalkers', 'Session'],
	function (_, Backbone, Cloudwalkers, Session)
	{
		var User = Backbone.Model.extend({
		
			typestring: 'users',
			
			url: function ()
			{
				if (this.parent)
		        	return Cloudwalkers.config.apiurl + this.parent.typestring + '/' + this.parent.id + "/" + this.typestring + "/" + this.id;
		        
		        else return Cloudwalkers.config.apiurl + this.typestring + this.id;
			},
		
			filterData: function (type)
			{
				var data = this.attributes;
				
				if(type == "listitem")
				{
					data.arrow = true;
					
				} else {
					
					data.role = this.getRole();
				}
		
				return data;
			},
			
			getRole: function ()
			{	
				var roles = Session.getAccount().get('roles'); 	
				var userrole = this.get('rolegroup');
		
				if(!roles || _.isUndefined(userrole))
					return Cloudwalkers.RootView.resync('#'+Backbone.history.fragment);
		
				var role = roles.filter(function(el){ return el.id == userrole});
				return role.length? role[0]: null;
			}
		});
		
		return User;
	}
);
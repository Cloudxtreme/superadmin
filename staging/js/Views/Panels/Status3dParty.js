define (
	['Views/Panel', 'mustache'],
	function (Panel, Mustache)
	{
		var Status3dParty = Panel.extend({

			services: [
				{title: "3d Party Services"},
				{name: "GitHub API", api: "https://status.github.com/api/status.json?callback=apiStatus", link: '#', jsonp: true, callback: "githubstatus"},
				{name: "Dploy.io API", api: null, callback: null},
				{name: "Mandrill API", api: null, callback: null},
				{name: "Ai-Applied API", api: null, callback: null},
				{title: "Social Content Services"},
				{name: "Titter API", api: null, callback: null},
				{name: "Facebook API", api: null/*"https://www.facebook.com/feeds/api_status.php"*/, callback: "facebookstatus"},
				{name: "LinkedIn API", api: null, callback: null},
				{name: "Sendible API", api: null, callback: null},
				{name: "Klout API", api: null, callback: null}
			],
		
			initialize: function (options)
			{
				if(options) $.extend(this, options);
			},
		
			render: function ()
			{	
				// Template data
				var params = {};
				
				// Get template
				this.$el.html (Mustache.render (Templates.statusexternal, params));
				this.$container = this.$el.find(".list-group").eq(0);
				
				// Iterate the services
				this.services.forEach(function(service)
				{
					var $el;
					
					if (service.title) $el = $('<div></div>').html(service.title).addClass('list-group-item list-group-item-info');
					else
					{
						$el = $('<a></a>').html(service.name).addClass('list-group-item');
						
						if(service.api)
						{
							$el.attr("href", service.link);
							
							$.ajax({url: service.api, dataType: 'jsonp', success: this[service.callback].bind(this, $el)});	
		
						} else $el.addClass('disabled');
					}
					
					this.$container.append($el);
					
				}.bind(this));
				
				return this;
			},
			
			/* Service callbacks */
			
			githubstatus : function($el, data)
			{
				var $badge = $('<span class="badge"></span>').html(data.status).addClass(data.status=="good"? "badge-green": "badge-red");
				
				$el.prepend($badge);
				
			},
			
			/* Service callbacks */
			
			facebookstatus : function($el, data)
			{
				console.log(data)
				
				var $badge = $('<span class="badge"></span>').html(data.status).addClass(data.status=="good"? "badge-green": "badge-red");
				
				$el.prepend($badge);
				
			},
			
			
			/*	
				GitHub status
				function apiStatus(data) {
					console.log(data.status);
				}
				
				https://status.github.com/api/status.json?callback=apiStatus
				
				Mandrill Status
				Dploy.io Status
				Ai-Applied Status
						
				Twitter API Status
				Facebook API Status
				Linkedin API Status
				Sendible API Status
				Klout API Status
				
			*/
			
		});
		
		return Status3dParty;
	}
);
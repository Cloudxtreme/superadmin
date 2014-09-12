
Cloudwalkers.Views.RecentAccounts = Backbone.View.extend({
	
	'events' : {
		'remove' : 'destroy',
		'click .reload' : 'render'
	},
	
	'initialize' : function (options)
	{
		if(options) $.extend(this, options);
		
		// Load models
		this.accounts = new Cloudwalkers.Collections.Accounts();
		this.listenTo(this.accounts, 'sync', this.render);		
		
	},

	'render' : function ()
	{	
		console.log(this)
		// Template data
		var params = {};
		
		// Get template
		this.$el.html (Mustache.render (Templates.recentaccounts, params));
		
		// Backgrid
		this.collection = new Cloudwalkers.Collections.Accounts();
		
		// Example
		var Territory = Backbone.Model.extend({});
		
		var Territories = Backbone.Collection.extend({
			model: Territory,
			url: "/js/territories.json",
			parse: function(response) {
				return response;
			}
		});
		
		var territories = new Territories();
		
		var columns = [{
		    name: "id", // The key of the model attribute
		    label: "ID", // The name to display in the header
		    editable: false, // By default every cell in a column is editable, but *ID* shouldn't be
		    // Defines a cell type, and ID is displayed as an integer without the ',' separating 1000s.
		    cell: Backgrid.IntegerCell.extend({
		      orderSeparator: ''
		    })
		  }, {
		    name: "name",
		    label: "Name",
		    // The cell type can be a reference of a Backgrid.Cell subclass, any Backgrid.Cell subclass instances like *id* above, or a string
		    cell: "string" // This is converted to "StringCell" and a corresponding class in the Backgrid package namespace is looked up
		  }, {
		    name: "pop",
		    label: "Population",
		    cell: "integer" // An integer cell is a number cell that displays humanized integers
		  }, {
		    name: "percentage",
		    label: "% of World Population",
		    cell: "number" // A cell type for floating point value, defaults to have a precision 2 decimal numbers
		  }, {
		    name: "date",
		    label: "Date",
		    cell: "date"
		  }, {
		    name: "url",
		    label: "URL",
		    cell: "uri" // Renders the value in an HTML anchor element
		}];
		
		// Initialize a new Grid instance
		var grid = new Backgrid.Grid({
		  columns: columns,
		  collection: territories
		});
		
		// Render the grid and attach the root to your HTML document
		this.$el.find("#backgrid").append(grid.render().el);
		
		// Fetch some countries from the url
		territories.fetch();
		
		return this;
	}
});

/*
	var columns = [
		{
			name: "id",
			label: "ID",
			editable: false,
			cell: Backgrid.IntegerCell.extend({orderSeparator: ''})
		}, {
			name: "name",
			label: "Name",
			cell: "string"
		}, {
			name: "plan",
			label: "Plans",
			cell: "array"
		}, {
			name: "roles",
			label: "User Roles",
			cell: "array"
		}, {
			name: "firstTime",
			label: "Virgin",
			cell: "integer"
		}, {
			name: "avatar",
			label: "Icon",
			cell: "uri"
		}];
*/
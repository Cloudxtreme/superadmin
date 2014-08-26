
Cloudwalkers.Views.RecentAccounts = Backbone.View.extend({
	
	'events' : {
		'remove' : 'destroy',
		'click .reload' : 'render'
	},
	
	'initialize' : function (options)
	{
		if(options) $.extend(this, options);
	},

	'render' : function ()
	{	
		// Template data
		var params = {};
		
		// Get template
		this.$el.html (Mustache.render (Templates.recentaccounts, params));
		
		// BACKGRID
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

		
		var PageableAccounts = Backbone.PageableCollection.extend({
			state:
			{
				pageSize: 10
			},
			mode: "client"
		});
		
		PageableAccounts = PageableAccounts.extend(Cloudwalkers.Collections.Accounts)
		
		var pageableAccounts = new PageableAccounts();
		
		// Set up a grid to use the pageable collection
		var pageableGrid = new Backgrid.Grid({
			columns: [{
				// enable the select-all extension
				name: "",
				cell: "select-row",
				headerCell: "select-all"
			}].concat(columns),
		collection: pageableAccounts
		});
		
		// Render the grid
		var $example2 = this.$el.find('#backgrid');
		$example2.append(pageableGrid.render().el)
		
		// Initialize the paginator
		var paginator = new Backgrid.Extension.Paginator({
		collection: pageableAccounts
		});
		
		// Render the paginator
		$example2.after(paginator.render().el);
		
		// Initialize a client-side filter to filter on the client
		// mode pageable collection's cache.
		var filter = new Backgrid.Extension.ClientSideFilter({
		collection: pageableAccounts,
		fields: ['name']
		});
		
		// Render the filter
		$example2.before(filter.render().el);
		
		// Add some space to the filter and move it to the right
		$(filter.el).css({float: "right", margin: "20px"});
		
		// Fetch some data
		pageableAccounts.fetch({reset: true});
		
		
				
		return this;
	}	
});
define (
	['Views/Panel', 'mustache', 'backgrid', 'paginator', 'backgrid-object-cell', 'Collections/Plans'],
	function (Panel, Mustache, Backgrid, Paginator, ObjectCell, Plans)
	{
		var PlansGrid = Panel.extend({
			
			limit: 20,
			editable: true,
			
			render : function ()
			{	
				// Template data
				var params = {title: this.title};
				
				// Get template
				this.$el.html (Mustache.render (Templates.accountsgrid, params));
				
				// Backgrid
				this.collection = new Plans([], {
					state: {
						order: -1,
						pageSize: this.limit,
						firstPage: 0,
						currentPage: 0
					},
					queryParams:
					{
						currentPage: "current_page",
						pageSize: "records"
					}
				});

				var LimitsCell = Backgrid.Extension.ObjectCell.extend(
				{
					formatter: {
						fromRaw: function(array) {

							newlimit = [];
							_.map(array, function(k,v){
								newlimit.push({name:v, value:k});
							});

							return _.map(newlimit, function(object) {
								return object.name + ": " + object.value;
							}).join(", ");
							
						}
					},
					schema: [
						{name: "admins", label: "Admins", cell: "number"},
						{name: "following", label: "Following", cell: "number"},
						{name: "keywords", label: "Keywords", cell: "number"},
						{name: "services", label: "Services", cell: "number"},
						{name: "users", label: "Users", cell: "number"}
					]
				});
		
				var columns = [
					{
						name: "id",
						label: "id",
						editable: false,
						cell: Backgrid.IntegerCell.extend ({orderSeparator: ''})
					},
					{ name: "name", label: "Name", cell: "string", editable: this.editable },
					{ name: "limits", label: "Limits", cell: LimitsCell, editable: this.editable}
				];
				
				// Initialize a new Grid instance
				var grid = new Backgrid.Grid({
				  columns: columns,
				  collection: this.collection,
				  width: '100%'
				});
				
				var paginator = new Backgrid.Extension.Paginator({
		        	collection: this.collection
				});
		     
				this.$el.find(".backgrid-container").append(grid.render().el);
				this.$el.find(".backgrid-paginator").append(paginator.render().$el);
				
				this.collection.fetch({reset: true});
				
				return this;
			}
		});
		
		return PlansGrid;
	}
);

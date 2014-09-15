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
				
				var PlanCell = Backgrid.Extension.ObjectCell.extend(
				{
					formatter: {
						fromRaw: function(object) { return object.name; }
					},
					schema: [
						{name: "id", label: "id"},
						{name: "name", label: "Plan"},
						{name: "limits", label: "Limits"}
					]
				});

				var RolesCell = Backgrid.Extension.ArrayObjectCell.extend(
				{
					formatter: {
						fromRaw: function(array) {
							return _.map(array, function(object) { return object.name; }).join(", ");
						}
					},
					gridOptions: {
						className: "backgrid table-bordered",
						columns: [
							{name: "id", label: "id", cell: "string"},
							{name: "name", label: "Role", cell: "string"},
							{name: "template", label: "template", cell: "string"}
						]
					}
				});
		
				var columns = [
					{
						name: "id",
						label: "id",
						editable: false,
						cell: Backgrid.IntegerCell.extend ({orderSeparator: ''})
					},
					{ name: "name", label: "Name", cell: "string", editable: this.editable }
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

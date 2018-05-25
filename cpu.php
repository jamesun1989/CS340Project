<!DOCTYPE html>
<html>

<head>
	<link rel="stylesheet" href="https://cdn.datatables.net/1.10.16/css/jquery.dataTables.min.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<!--<link href = 'test.css' rel = 'stylesheet' />-->
	<script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.js"></script>
	<script type="text/javascript" src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>
	<link rel="stylesheet" type="text/css" href="bootstrap.techie.css">
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>

<body>
	<div class="container">
		<?php include '_nav.html'; ?>

<div id="objectProperties" class="objectProperties"></div>

<div class="well">
	<p class="lead text-muted">Choose a CPU</p>
</div>


<div id="tableInputs"></div>
<br>

<div class="row">
      <div class="col-sm-12 col-lg-12">
        <div class="row">
          <div class="col-sm-4 col-lg-4">
          	<div class="col-sm-4 col-lg-4">
            	<p class="lead text-muted">MANUFACTURER</p>
            	<div class="checkbox">
              	<label>
                	<input type="checkbox" value="" checked="">
                	ALL
              	</label>
            	</div>
            	<div class="checkbox">
              	<label>
                	<input type="checkbox" value="">
                	AMD
              	</label>
            	</div>
            	<div class="checkbox">
              	<label>
                	<input type="checkbox" value="">
                	Intel
              	</label>
            	</div>
        	</div>
        	<div class="col-sm-4 col-lg-4">
            	<p class="lead text-muted">SERIES</p>
            	<div class="checkbox">
              	<label>
                	<input type="checkbox" value="" checked="">
                	AMD Ryzen 3
              	</label>
            	</div>
            	<div class="checkbox">
              	<label>
                	<input type="checkbox" value="">
                	Intel Core i7
              	</label>
            	</div>
            	<div class="checkbox">
              	<label>
                	<input type="checkbox" value="">
                	Intel Core i9
              	</label>
            	</div>
        	</div>
          </div>
          <div class="col-sm-8 col-lg-8">
            <p class="lead text-muted">Parts</p>
            <table id="ajaxExample" class="table table-bordered" data-effect="fade">
              <thead>
				<tr>
					<th>Name</th>
					<th>Cores</th>
					<th>Threads</th>
					<th>Socket</th>
					<th>Clock Speed</th>
					<th>Manufacturer</th>
				</tr>
			</thead>
			<tfoot>
			<tr>
				<th>Name</th>
				<th>Cores</th>
				<th>Threads</th>
				<th>Socket</th>
				<th>Clock Speed</th>
				<th>Manufacturer</th>
			</tr>
		</tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>



<script>
function getUrlParameters()
{
	var sPageURL = decodeURIComponent(window.location.search.substring(1)),
	sURLVariables = sPageURL.split('&'),
	sParameterName,
	i;

	var object = {};
	for(i = 0; i < sURLVariables.length; i++)
	{
		sParameterName = sURLVariables[i].split('=');

		if(sParameterName[0] !== '' && sParameterName[1] !== undefined)
		{
			object[sParameterName[0]] = sParameterName[1];
		}
	}

	return object;
}

$(document).ready(function() {
	//get a object repsenting the url variables and their paramters
	//then visualize it by adding them to our objectProperties div
	var data = getUrlParameters();
	$.each(data, function(index, value)
	{
		$('#objectProperties').append(`<p>${index}: ${value}</p>`);
	});

	//create a DataTable using the ajaxExample table
	$('#ajaxExample').DataTable(
	{
		'columns': [
			{ 'data': 'name', 'width': '%20'},
			{ 'data': 'cores', 'width': '%5' },
			{ 'data': 'threads', 'width': '%5' },
			{ 'data': 'socket', 'width': '%10' },
			{ 'data': 'clockSpeed', 'width': '%10'},
			{ 'data': 'manufacturer', 'width': '20%'}
		],
		'columnDefs': [
		{
			"targets": 0,
			"createdCell": function(td, cellData, rowData, row, col){
				$(td).html(`<a href='#'>${rowData.name}</a>`);
			}
		}],
		"deferRender": true,
		"order": []
	});

	//foreach header column in our table, create a input tag
	$('#ajaxExample thead th').each(function()
	{
		//grab the header column's name and use that as the search text
		var title = $(this).text();
		$('#tableInputs').append(`<input type="text" placeholder="Search ${title}" />`);
	});

	//foreach column in our table, attach a search function to the input tags we just created
	//input tag 1 will do a equals search on column 1 (and only column 1)
	$('#ajaxExample').DataTable().columns().every(function(index)
	{
		var that = this;

		//everytime they type or paste into the input box lets call this search function
		$('#tableInputs input').eq(index).on('keyup change', function()
		{
			//column.search() returns the queued item that it will be searched on
			//does not take effect until the table is updated with something like draw()

			//if the item that is being 'searched' is not equal to the value in this input tag
			//then update the search with our input tags value
			if(that.search() !== this.value)
			{
				that.search(this.value).draw();
			}
		});
	});

	//make a ajax call to get some remote data
	$.ajax({
		method: "GET",
		data: {
			//"manufacturer": "Intel"
		},
		url: 'https://web.engr.oregonstate.edu/~hammockt/cs340/Project/Dev/API/getCPUs.php',
		dataType: "json"
	})
	.done(function(data)
	{
		//store the result in localStorage and then load it into our DataTable to be displayed
		localStorage.setItem('dataTablesData', JSON.stringify(data));
		$('#ajaxExample').DataTable().clear();
		$('#ajaxExample').DataTable().rows.add(data).draw();
	});
});
</script>
</div>
</body>

</html>

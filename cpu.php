<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<link rel="icon" href="img/favicon.ico">

	<!--<link rel="stylesheet" href="https://cdn.datatables.net/1.10.16/css/jquery.dataTables.min.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.js"></script>
	<script type="text/javascript" src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>
	<link rel="stylesheet" type="text/css" href="bootstrap.techie.min.css">
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>-->

	<link rel="stylesheet" type="text/css" href="Bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="DataTables/datatables.min.css">
	<link rel="stylesheet" type="text/css" href="bootstrap.techie.min.css">

	<script type="text/javascript" src="jQuery/jquery.min.js"></script>
	<script type="text/javascript" src="Bootstrap/js/bootstrap.bundle.min.js"></script>
	<script type="text/javascript" src="DataTables/datatables.min.js"></script>
</head>

<body>
	<div class="container">
		<?php include '_nav.html'; ?>

<div class="well">
	<p class="lead text-muted">Choose a CPU</p>
</div>

<br>

<div class="row">
      <div class="col-sm-12 col-lg-12">
        <div class="row">
          <div class="col-sm-4 col-lg-4">
          	<div class="col-sm-4 col-lg-4">
            	<p class="lead text-muted">MANUFACTURER</p>
            	<div class="radio">
              	<label>
                	<input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked="">
                	ALL
              	</label>
            	</div>
            	<div class="radio">
              	<label>
                	<input type="radio" name="optionsRadios" id="optionsRadios1" value="option1">
                	Intel
              	</label>
            	</div>
            	<div class="radio">
              	<label>
                	<input type="radio" name="optionsRadios" id="optionsRadios1" value="option1">
                	AMD
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

function getData(getcpu){
	$.ajax({
		method: "GET",
		url: getcpu,
		dataType: "json"
	})
	.done(function(data)
	{
		//store the result in localStorage and then load it into our DataTable to be displayed
		localStorage.setItem('dataTablesData', JSON.stringify(data));
		$('#ajaxExample').DataTable().clear();
		$('#ajaxExample').DataTable().rows.add(data).draw();
	});
}

$(document).ready(function() {

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
				link = './tables.html?';
				myIndex = 0;
				$.each(rowData, function(index, value){
					if(myIndex == 0)
						link += `${index}=${value}`;
					else
						link += `&${index}=${value}`;
					myIndex++;
				})
				$(td).html(`<a href='${link}'>${rowData.name}</a>`);
			}
		}],
		"deferRender": true,
		"order": []
	});

	//make a ajax call to get some remote data
	$.ajax({
		method: "GET",
		url: "./config.json",
		datatype: "json"
	})
	.done(function(data){
		getData(data.getCPU);
	});
});

</script>
</div>
</body>

</html>

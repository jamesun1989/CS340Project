<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<link rel="icon" href="img/favicon.ico">

	<link rel="stylesheet" type="text/css" href="Bootstrap3/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="DataTables/datatables.min.css">
	<link rel="stylesheet" type="text/css" href="TechieBootstrap/bootstrap.techie.min.css">

	<script type="text/javascript" src="jQuery/jquery.min.js"></script>
	<script type="text/javascript" src="Bootstrap3/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="DataTables/datatables.min.js"></script>
</head>

<body>
	<div class="container">
		<?php include '_nav.html'; ?>

<div id="objectProperties" class="objectProperties"></div>

<div class="well">
	<p class="lead">Choose Storage</p>
</div>


<div id="tableInputs"></div>
<br>

<div class="row">
      <div class="col-sm-12 col-lg-12">
        <div class="row">
          <div class="col-sm-4 col-lg-4">
          	<div class="col-sm-2 col-lg-2">
            	<p class="lead">MANUFACTURER</p>
            	<div class="checkbox">
              	<label>
                	<input type="checkbox" value="" checked="">
                	ALL
              	</label>
            	</div>
            	<div class="checkbox">
              	<label>
                	<input type="checkbox" value="">
                	ADATA
              	</label>
            	</div>
            	<div class="checkbox">
              	<label>
                	<input type="checkbox" value="">
                	Kingston
              	</label>
            	</div>
        	</div>
          </div>
          <div class="col-sm-8 col-lg-8">
            <p class="lead">Parts</p>
            <table id="ajaxExample" class="table table-bordered" data-effect="fade">
              <thead>
				<tr>
					<th>Manufacturer</th>
					<th>Size</th>
					<th>Form Factor</th>
					<th>Series</th>
					<th>RPM</th>
					<th>SSD</th>
					<th>HDD</th>
				</tr>
			</thead>
			<tfoot>
			<tr>
				<th>Manufacturer</th>
					<th>Size</th>
					<th>Form Factor</th>
					<th>Series</th>
					<th>RPM</th>
					<th>SSD</th>
					<th>HDD</th>
			</tr>
		</tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>



<script>
function getData(getstorage){
	$.ajax({
		method: "GET",
		url: getstorage,
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
			{ 'data': 'manufacturer', 'width': '20%'},
			{ 'data': 'size', 'width': '10'},
			{ 'data': 'formFactor', 'width': '10'},
			{ 'data': 'series', 'width': '10'},
			{ 'data': 'RPM', 'width': '10'},
			{ 'data': 'ssd', 'width': '10'},
			{ 'data': 'hdd', 'width': '10'},
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
				$(td).html(`<a href='${link}'>${rowData.manufacturer}</a>`);
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
		getData(data.getStorage);
	});
});
</script>
</div>
</body>

</html>
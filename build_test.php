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
  <script type="text/javascript" src="config.js"></script>
  <script type="text/javascript" src="authorizedAjax.js"></script>
</head>

<body>
<div class="container">
	<?php include '_nav.html'; ?>

<div class="well">
	<p class="lead">Build Parts</p>
</div>

<table id="caseID" class="table table-bordered" data-effect="fade">
	<thead>
		<tr>
			<th colspan="3">Case</th>
		</tr>
		<tr>
			<th width="34%">PartID</th>
			<th width="33%">Name</th>
			<th width="33%">Operations</th>
		</tr>
	</thead>
	<tbody>
	</tbody>
</table>

<table id="cpuID" class="table table-bordered" data-effect="fade">
	<thead>
		<tr>
			<th colspan="3">CPU</th>
		</tr>
		<tr>
			<th width="34%">PartID</th>
			<th width="33%">Name</th>
			<th width="33%">Operations</th>
		</tr>
	</thead>
	<tbody>
	</tbody>
</table>

<table id="cpuCoolerID" class="table table-bordered" data-effect="fade">
	<thead>
		<tr>
			<th colspan="3">CPU Cooler</th>
		</tr>
		<tr>
			<th width="34%">PartID</th>
			<th width="33%">Name</th>
			<th width="33%">Operations</th>
		</tr>
	</thead>
	<tbody>
	</tbody>
</table>

<table id="gpuID" class="table table-bordered" data-effect="fade">
	<thead>
		<tr>
			<th colspan="3">GPU</th>
		</tr>
		<tr>
			<th width="34%">PartID</th>
			<th width="33%">Name</th>
			<th width="33%">Operations</th>
		</tr>
	</thead>
	<tbody>
	</tbody>
</table>

<table id="motherboardID" class="table table-bordered" data-effect="fade">
	<thead>
		<tr>
			<th colspan="3">Motherboard</th>
		</tr>
		<tr>
			<th width="34%">PartID</th>
			<th width="33%">Name</th>
			<th width="33%">Operations</th>
		</tr>
	</thead>
	<tbody>
	</tbody>
</table>

<table id="psuID" class="table table-bordered" data-effect="fade">
	<thead>
		<tr>
			<th colspan="3">PSU</th>
		</tr>
		<tr>
			<th width="34%">PartID</th>
			<th width="33%">Name</th>
			<th width="33%">Operations</th>
		</tr>
	</thead>
	<tbody>
	</tbody>
</table>

<table id="ramID" class="table table-bordered" data-effect="fade">
	<thead>
		<tr>
			<th colspan="3">RAM</th>
		</tr>
		<tr>
			<th width="34%">PartID</th>
			<th width="33%">Name</th>
			<th width="33%">Operations</th>
		</tr>
	</thead>
	<tbody>
	</tbody>
</table>

<table id="storageID" class="table table-bordered" data-effect="fade">
	<thead>
		<tr>
			<th colspan="3">Storage ID</th>
		</tr>
		<tr>
			<th width="34%">PartID</th>
			<th width="33%">Name</th>
			<th width="33%">Operations</th>
		</tr>
	</thead>
	<tbody>
	</tbody>
</table>

<script>
$(document).ready(function()
{
	var ajaxProperties =
	{
		method: "GET",
		url: CONFIG.getUserBuild + "?buildID=4",
		content: "application/json",
		dataType: "json"
	};

	var doneCallback = function(data)
	{
		$.each(data, function()
		{
			var partType = this.partType;
			console.log(this);
			$.each(this.partIDs, function()
			{
				$("#" + partType + " tbody")
				.append("<tr><td>" + this +  "</td><td></td><td></td></tr>");
			});
		});
	};

	var request = new AuthorizedAjax("build_test.php", ajaxProperties, doneCallback);
	request.start();
});
</script>
</body>
</html>

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

<p class="lead">Parts</p>
<table id="buildParts" class="table table-bordered" data-effect="fade">
	<thead>
		<tr>
			<th>Component</th>
			<th>PartID</th>
		</tr>
	</thead>
	<tbody>
		<tr id="caseID" data-max="1">
			<td>Case</td>
		</tr>
		<tr id="cpuID" data-max="1">
			<td>CPU</td>
		</tr>
		<tr id="cpuCoolerID" data-max="1">
			<td>CPU Cooler</td>
		</tr>
		<tr id="gpuID" data-max="4">
			<td>GPU</td>
		</tr>
		<tr id="motherboardID" data-max="1">
			<td>Motherboard</td>
		</tr>
		<tr id="psuID" data-max="1">
			<td>Power Supply</td>
		</tr>
		<tr id="ramID" data-max="4">
			<td>RAM</td>
		</tr>
		<tr id="storageID" data-max="4">
			<td>Storage</td>
		</tr>
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
		let rowSpans = {};
		$('#buildParts tbody tr').each(function()
		{
			rowSpans[this.id] = 1;
		});

		$.each(data, function()
		{			
			let partType = this.partType
			let row = $('#'+partType);
			let output = '';
			let before = rowSpans[partType];

			$.each(this.partIDs, function()
			{
				if(rowSpans[partType] == 1)
					row.append('<td>'+this+'</td>');
				else
					output += '<tr><td>'+this+'</td></tr>';

				row.children().first().prop('rowspan', rowSpans[partType]);
				rowSpans[partType]++;
			});

			if(rowSpans[partType] < row.prop('dataset').max || rowSpans[partType] == before)
			{
				if(rowSpans[partType] == 1)
					row.append('<td><a href="#">test</a></td>');
				else
					output += '<tr><td><a href="#">test</a></td></tr>';

				row.children().first().prop('rowspan', rowSpans[partType]);
				rowSpans[partType]++;
			}

			row.after(output);
		});
	};

	var request = new AuthorizedAjax("build_test.php", ajaxProperties, doneCallback);
	request.start();
});
</script>
</body>
</html>

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
  <script type="text/javascript" src="Bootbox/bootbox.min.js"></script>
  <script type="text/javascript" src="config.js"></script>
  <script type="text/javascript" src="authorizedAjax.js"></script>
  <script type="text/javascript" src="build.js"></script>
</head>

<body>
<div class="container">
	<?php include '_nav.html'; ?>

<div class="well">
	<p class="lead">Build Parts</p>
</div>

<table data-max="1" id="Case" class="table table-bordered" data-effect="fade">
	<thead>
		<tr>
			<th colspan="3">Case</th>
		</tr>
		<tr>
			<th width="42%">Name</th>
			<th width="42%">Part ID</th>
			<th>Operations</th>
		</tr>
	</thead>
	<tbody>
	</tbody>
</table>

<table data-max="1" id="CPU" class="table table-bordered" data-effect="fade">
	<thead>
		<tr>
			<th colspan="3">CPU</th>
		</tr>
		<tr>
			<th width="42%">Name</th>
			<th width="42%">Part ID</th>
			<th>Operations</th>
		</tr>
	</thead>
	<tbody>
	</tbody>
</table>

<table data-max="1" id="CPUCooler" class="table table-bordered" data-effect="fade">
	<thead>
		<tr>
			<th colspan="3">CPU Cooler</th>
		</tr>
		<tr>
			<th width="42%">Name</th>
			<th width="42%">Part ID</th>
			<th>Operations</th>
		</tr>
	</thead>
	<tbody>
	</tbody>
</table>

<table data-max="4" id="GraphicsCard" class="table table-bordered" data-effect="fade">
	<thead>
		<tr>
			<th colspan="3">Graphics Card</th>
		</tr>
		<tr>
			<th width="42%">Name</th>
			<th width="42%">Part ID</th>
			<th>Operations</th>
		</tr>
	</thead>
	<tbody>
	</tbody>
</table>

<table data-max="1" id="Motherboard" class="table table-bordered" data-effect="fade">
	<thead>
		<tr>
			<th colspan="3">Motherboard</th>
		</tr>
		<tr>
			<th width="42%">Name</th>
			<th width="42%">Part ID</th>
			<th>Operations</th>
		</tr>
	</thead>
	<tbody>
	</tbody>
</table>

<table data-max="1" id="PowerSupply" class="table table-bordered" data-effect="fade">
	<thead>
		<tr>
			<th colspan="3">Power Supply</th>
		</tr>
		<tr>
			<th width="42%">Name</th>
			<th width="42%">Part ID</th>
			<th>Operations</th>
		</tr>
	</thead>
	<tbody>
	</tbody>
</table>

<table data-max="4" id="RAM" class="table table-bordered" data-effect="fade">
	<thead>
		<tr>
			<th colspan="3">RAM</th>
		</tr>
		<tr>
			<th width="42%">Name</th>
			<th width="42%">Part ID</th>
			<th>Operations</th>
		</tr>
	</thead>
	<tbody>
	</tbody>
</table>

<table data-max="4" id="Storage" class="table table-bordered" data-effect="fade">
	<thead>
		<tr>
			<th colspan="3">Storage</th>
		</tr>
		<tr>
			<th width="42%">Name</th>
			<th width="42%">PartID</th>
			<th>Operations</th>
		</tr>
	</thead>
	<tbody>
	</tbody>
</table>
<br>
<hr>
<?php include 'footer.html'; ?>\
</body>
</html>

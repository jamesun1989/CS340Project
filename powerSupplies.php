<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<link rel="icon" href="img/favicon.ico">

	<link rel="stylesheet" type="text/css" href="Bootstrap3/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="DataTables/datatables.min.css">
	<link rel="stylesheet" type="text/css" href="TechieBootstrap/bootstrap.techie.min.css">
	<link rel="stylesheet" type="text/css" href="Bootstrap-Slider/bootstrap-slider.min.css">
	<link rel="stylesheet" type="text/css" href="searchPages.css">

	<script type="text/javascript" src="jQuery/jquery.min.js"></script>
	<script type="text/javascript" src="Bootstrap3/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="DataTables/datatables.min.js"></script>
	<script type="text/javascript" src="Bootstrap-Slider/bootstrap-slider.min.js"></script>
	<script type="text/javascript" src="Bootbox/bootbox.min.js"></script>
	<script type="text/javascript" src="config.js"></script>
	<script type="text/javascript" src="authorizedAjax.js"></script>
	<script type="text/javascript" src="searchPages.js"></script>
	<script type="text/javascript" src="powerSupplies.js"></script>
</head>

<body>
<div class="container">
	<?php include '_nav.html'; ?>

<div class="well">
	<p class="lead">Choose a Power Supply</p>
</div>

<br>

<div class="row">
	<div class="col-sm-12 col-lg-12">
		<div class="row">
			<div class="col-sm-3 col-lg-3">
				<div class="row">
					<div class="col-sm-11 col-lg-11" id="manufacturerSelect"></div>
				</div>
				<br>
				<div class="row">
					<div class="col-sm-11 col-lg-11" id="eightyPlusSelect"></div>
				</div>
				<br>
				<div class="row">
					<div class="col-sm-11 col-lg-11" id="modularSelect"></div>
				</div>
				<br>
				<div class="row">
					<div class="col-sm-10 col-lg-10" id="wattageRange"></div>
				</div>
			</div>
			<div class="col-sm-9 col-lg-9">
				<p class="lead text-muted">Parts</p>
				<table id="partTable" class="table table-bordered" data-effect="fade">
					<thead>
						<tr>
							<th width="25%">Name</th>
							<th>Series</th>
							<th>Manfacturer</th>
							<th>Efficiency</th>
							<th>Watts</th>
							<th>Modular</th>
							<th></th>
						</tr>
					</thead>
					<tfoot>
						<tr>
							<th>Name</th>
							<th>Series</th>
							<th>Manfacturer</th>
							<th>Efficiency</th>
							<th>Watts</th>
							<th>Modular</th>
							<th></th>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	</div>
</div>

</div>
</body>

</html>

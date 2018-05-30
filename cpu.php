<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<link rel="icon" href="img/favicon.ico">

	<link rel="stylesheet" type="text/css" href="Bootstrap3/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="DataTables/datatables.min.css">
	<link rel="stylesheet" type="text/css" href="TechieBootstrap/bootstrap.techie.min.css">
	<link rel="stylesheet" type="text/css" href="searchPages.css">

	<script type="text/javascript" src="jQuery/jquery.min.js"></script>
	<script type="text/javascript" src="Bootstrap3/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="DataTables/datatables.min.js"></script>
	<script type="text/javascript" src="config.js"></script>
	<script type="text/javascript" src="searchPages.js"></script>
	<script type="text/javascript" src="cpu.js"></script>
</head>

<body>
<div class="container">
	<?php include '_nav.html'; ?>

<div class="well">
	<p class="lead">Choose a CPU</p>
</div>

<br>

<div class="row">
	<div class="col-sm-12 col-lg-12">
		<div class="row">
			<div class="col-sm-3 col-lg-3">
				<div class="row">
					<label id="test">
						<span>5</span>
						<input id="test" type="range" min=0 max=10 value=5></input>
					</label>
				</div>
				<div class="row">
					<div class="col-sm-3 col-lg-3" id="manufacturerSelect"></div>
				</div>
				<div class="row">
					<div class="col-sm-3 col-lg-3" id="socketSelect"></div>
				</div>
				<div class="row">
					<div class="col-sm-3 col-lg-3" id="familySelect"></div>
				</div>
			</div>
			<div class="col-sm-9 col-lg-9">
				<p class="lead text-muted">Parts</p>
				<table id="partTable" class="table table-bordered" data-effect="fade">
					<thead>
						<tr>
							<th width="20%">Name</th>
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

</div>
</body>

</html>

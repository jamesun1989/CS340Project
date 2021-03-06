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

	<script type="text/javascript" src="jQuery/jquery.min.js"></script>
	<script type="text/javascript" src="Bootstrap3/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="DataTables/datatables.min.js"></script>
	<script type="text/javascript" src="Bootbox/bootbox.min.js"></script>
	<script type="text/javascript" src="config.js"></script>
    <script type="text/javascript" src="authorizedAjax.js"></script>
	<script type="text/javascript" src="listBuilds.js"></script>
</head>

<body>
<div class="container">
	<?php include '_nav.html'; ?>

<div class="well">
	<p class="lead">Builds</p>
</div>

<table id="buildList" class="table table-bordered" data-effect="fade">
	<thead>
		<tr>
		    <th>Name</th>
		    <th>Shared</th>
		    <th></th>
		    <th></th>
		</tr>
    </thead>
    <tbody></tbody>
</table>

<button id="createBuildButton" type="button" class="btn btn-default">
	<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
	Add Build
</button>
<br>
<hr>
<?php include 'footer.html'; ?>

</div>

</body>

</html>

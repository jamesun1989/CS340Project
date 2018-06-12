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
	<script type="text/javascript" src="Bootstrap-Slider/bootstrap-slider.min.js"></script>
	<script type="text/javascript" src="config.js"></script>
</head>

<body>
	<div class="container">
	<?php include '_nav.html'; ?>

	<div class="well">
		<p class="lead">Personal Information</p>
	</div>

	<div class="col-sm-10 col-lg-10">
		<div class="col-sm-5 col-lg-15">
			<table id="" class="table table-bordered" data-effect="fade">
				<thead>
	                <tr>
	                	<th>Username</th>
	                </tr>
	            </thead>
	            <tfoot>
	            	<tr>
	                	<th>Username</th>
	                </tr>
	            </tfoot>
	        </table>
	    </div>

		<div class="col-sm-10 col-lg-10" data-effect="slide-right">
			<hr>
			<p class="lead text-muted">Update personal information</p>
			<br>
			<form class="form-horizontal">
				<div class="form-group">
					<label for="username" class="col-lg-2 control-label">Username</label>
					<div class="col-lg-4">
						<input type="text" class="form-control" id="usernmae" placeholder="user name">
					</div>
				</div>
				<div class="form-group">
					<div class="col-lg-offset-2 col-lg-10">
						<button type="submit" class="btn btn-primary">Update</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</body>
<br>
<hr>
<?php include 'footer.html'; ?>

</html>

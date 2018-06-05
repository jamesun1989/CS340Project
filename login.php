<!DOCTYPE html>
<html lang="en">

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
	<script type="text/javascript" src="login.js"></script>
</head>

<body>
<div class="container">
	<?php include '_nav.html'; ?>

<div class="well">
	<p class="lead">Please Log In</p>
</div>

<br>

<div class="row">
	<div class="col-sm-12 col-lg-12">
		<form id="loginform" class="form-horizontal jumbotron">
			<div class="form-group">
				<label for="username" class="col-lg-1 control-label">Username</label>
				<div class="col-lg-4">
					<input type="email" class="form-control" name="username">
				</div>
			</div>
			<div class="form-group">
				<label for="password" class="col-lg-1 control-label">Password</label>
				<div class="col-lg-4">
					<input type="password" class="form-control" name="password">
				</div>
			</div>
			<div class="form-group">
				<div class="col-lg-offset-1 col-lg-11">
					<button type="submit" class="btn btn-primary">Sign In</button>
				</div>
			</div>
		</form>
	</div>
</div>

<footer>
	<p>&copy; 2018 CS340 Group 5 members: Trevor Hammock, Sung Kim and Xiaoli Sun.</p>
</footer>

</div>
</body>
</html>

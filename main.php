<!DOCTYPE html>
<html>

<head>
	<link rel="stylesheet" href="https://cdn.datatables.net/1.10.16/css/jquery.dataTables.min.css">
	<link rel="icon" href="img/favicon.ico">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.js"></script>
	<script type="text/javascript" src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>
	<link rel="stylesheet" type="text/css" href="bootstrap.techie.css">
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>

<body>
	<div class="container">
		<?php include '_nav.html'; ?>

		<div class="jumbotron">
			<h1>PC Builds</h1>
			<p>A website that help creating your own PC builds</p>
			<p><a class="btn btn-primary btn-lg" href="#" role="button">Sign Up Now</a></p>
		</div>

		<div class="row">
			<div class="col-sm-6 col-lg-6">
				<h3>Sample Builds</h3>
				<div class="panel-group" id="accordion-panel">
					<div class="panel panel-default">
            			<div class="panel-heading">
            				<h4 class="panel-title">
            					<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion-panel" href="#samplebuildspanelone">
                  					Sample Builds #1
                				</a>
              				</h4>
            			</div>
            			<div id="samplebuildspanelone" class="panel-collapse collapse in">
            				<div class="panel-body">
                				Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
              				</div>
            			</div>
          			</div>
          			<div class="panel panel-default">
          				<div class="panel-heading">
          					<h4 class="panel-title">
          						<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion-panel" href="#samplebuildspaneltwo">
                  				Sample Builds #2
                				</a>
              				</h4>
            			</div>
            				<div id="samplebuildspaneltwo" class="panel-collapse collapse">
              					<div class="panel-body">
                					Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
              					</div>
            				</div>
          			</div>
        		</div>
      		</div>
      	</div>

		<hr>

		<footer>
			<p>&copy; 2018 CS340 Group 5 members: Trevor Hammock, Sung Kim and Xiaoli Sun.</p>
		</footer>
	</div>
</body>
</html>
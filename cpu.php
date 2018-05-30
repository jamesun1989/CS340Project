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
	<script type="text/javascript" src="cpu.js"></script>
</head>

<body>
	<div class="container">
		<?php include '_nav.html'; ?>

<div class="well">
	<p class="lead text-muted">Choose a CPU</p>
</div>

<br>

<div class="row">
      <div class="col-sm-12 col-lg-12">
        <div class="row">
          <div class="col-sm-4 col-lg-4">
          	<div class="col-sm-4 col-lg-4">
            	<p class="lead text-muted">MANUFACTURER</p>
            	<div class="radio">
              	<label>
                	<input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked="">
                	ALL
              	</label>
            	</div>
            	<div class="radio">
              	<label>
                	<input type="radio" name="optionsRadios" id="optionsRadios1" value="option1">
                	Intel
              	</label>
            	</div>
            	<div class="radio">
              	<label>
                	<input type="radio" name="optionsRadios" id="optionsRadios1" value="option1">
                	AMD
              	</label>
            	</div>
        	</div>
          </div>
          <div class="col-sm-8 col-lg-8">
            <p class="lead text-muted">Parts</p>
            <table id="ajaxExample" class="table table-bordered" data-effect="fade">
              <thead>
				<tr>
					<th>Name</th>
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

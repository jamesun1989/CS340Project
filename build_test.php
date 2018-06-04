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
	<div id=test></div>
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
		console.log(data);
	};

	var request = new AuthorizedAjax("build_test.php", ajaxProperties, doneCallback);
	request.start();
});
</script>
</body>
</html>

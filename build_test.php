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
</head>

<body>
	<div id=test></div>
<script>
	function GetAuthToken(){
		var authData = {
			refreshToken: localStorage.getItem("refreshToken")
		};
		$.ajax(
		{
			method: "POST",
			url: CONFIG.authToken,
			data: JSON.stringify(authData),
			content: "application/json",
			dataType: "json"
		})
		.done(function(data){
			localStorage.setItem("authToken", data.authToken);
		})
		.fail(function(jqXHR){
			if(jqXHR.status == 403 || jqXHR.status == 401){
				localStorage.setItem("loginRedirect", "build_test.php");
				window.location.replace("login.php");
			}
		});
	}

	$(document).ready(function()
	{
		if(localStorage.getItem("authToken") === null)
		{
			GetAuthToken();
		}
		
		$.ajax(
		{
			method: "GET",
			url: CONFIG.getUserBuild+"?buildID=4&"+"authToken="+localStorage.getItem("authToken"),
			content: "application/json",
			dataType: "json"
		})
		.done(function(data)
		{
			console.log(data);
		})
		.fail(function(jqXHR, textStatus, errorThrown)
		{
			console.log(jqXHR.status);
			if(jqXHR.status == 403 || jqXHR.status == 401){
				GetAuthToken();
				window.location.replace("build_test.php");
			}
		});		
	});
</script>
</body>
</html>
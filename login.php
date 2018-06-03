<!DOCTYPE html>

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
        <h2>Please Sign-in</h2>
        <form id="loginform" class="jumbotron" >
            Username:<br> <input type="email" name="username"> <br>
            Password:<br> <input type="password" name="password"><br>
            <input type="submit" value="Submit">
        </form>

        <footer>
			<p>&copy; 2018 CS340 Group 5 members: Trevor Hammock, Sung Kim and Xiaoli Sun.</p>
		</footer>
    </div>
</body>
</html>

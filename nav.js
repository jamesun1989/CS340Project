$(document).ready(function()
{
	$('.navbar a').each(function()
	{
		let fileName = this.href.split(/(\/|#)/).pop();

		if(localStorage.getItem('refreshToken') === null)
		{
			switch(fileName)
			{
				case "listBuilds.php": $(this).addClass('hidden'); break;
				case "logout": $(this).addClass('hidden'); break;
			};
		}
		else
		{
			switch(fileName)
			{
				case "login.php":
				case "signup.php": $(this).addClass('hidden'); break;
			}

			$('#logout').click(function(e)
			{
				e.preventDefault();

				localStorage.removeItem('refreshToken');
				localStorage.removeItem('authToken');
				localStorage.setItem('loginRedirect', 'main.php');

				window.location.replace("main.php");
			});
		}
	});
});


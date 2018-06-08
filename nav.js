$(document).ready(function()
{
	$('.navbar a').each(function()
	{
		let fileName = this.href.split('/').pop();

		if(localStorage.getItem('refreshToken') === null)
		{
			switch(fileName)
			{
				case "listBuilds.php": $(this).addClass('hidden'); break;
			};
		}
		else
		{
			switch(fileName)
			{
				case "login.php":
				case "signup.php": $(this).addClass('hidden'); break;
			}
		}
	});
});


$(document).ready(function()
{
	$('.navbar a').each(function()
	{
		//console.log(this.href.split('/').pop());
		let fileName = this.href.split('/').pop();

		if(localStorage.getItem('refreshToken') === null)
		{
			switch(fileName)
			{
				case "signup.php": $(this).addClass('hidden'); break;
			};
		}
		else
		{
			switch(fileName)
			{
				case "login.php": $(this).addClass('hidden'); break;
			}
		}
	});
});


$(document).ready(function()
{
	$('#signupform').submit(function(event)
	{
		event.preventDefault();
		inputs = $('#signupform :input');
		postData = {};
		inputs.each(function()
		{
			if(this.name)
				postData[this.name] = $(this).val();
		});

		if(postData.password !== postData.confirmpassword)
		{
			$('#message').html('<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Error!</strong> Password confirmation failed</div>');
			return;
		}

		delete postData.confirmpassword;

		$.ajax(
		{
			method: "POST",
			url: CONFIG.createAccount,
			data: JSON.stringify(postData),
			content: "application/json",
			dataType: "json"
		})
		.done(function(data)
		{
			$('#message').html('<div class="alert alert-success"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Success!</strong> The account was successfully created</div>');
			$('#signupform').trigger("reset");
		})
		.fail(function(jqXHR)
		{
			if(jqXHR.status == 409)
			{
				$('#message').html('<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Conflict Occured!</strong> Cannot create account due to conflicting username or password</div>');
			}
			else
			{
				$('#message').html('<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Error Occurred!</strong> The account cannot be created at this time</div>');
			}
		});
	});
});

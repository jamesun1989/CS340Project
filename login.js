$(document).ready(function()
{
    if(localStorage.getItem("loginRedirect") === null || localStorage.getItem("refreshToken") === null)
    {
        localStorage.setItem("loginRedirect", "main.php");
    }

    $('#loginform').submit(function(event)
    {
        event.preventDefault();
        inputs = $('#loginform :input');
        postData= {};
        inputs.each(function()
        {
            if(this.name)
                postData[this.name] = $(this).val();
        });

        $.ajax(
        {
            method: "POST",
            url: CONFIG.refreshToken,
            data: JSON.stringify(postData),
            content: "application/json",
            dataType: "json"
        })
        .done(function(data)
        {
            localStorage.setItem("refreshToken", data.refreshToken);
            localStorage.removeItem("authToken");
            var loginRedirect = localStorage.getItem("loginRedirect");
            window.location.replace(loginRedirect);
        })
        .fail(function(jqXHR)
        {
        	if(jqXHR.status == 401)
			{
				$('#message').html('<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Unauthorized!</strong> Make sure you typed your username and password correctly</div>');
			}
			else
			{
				$('#message').html('<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Error Occurred!</strong> We cannot log you in at this time</div>');
			}
        });
    });
});

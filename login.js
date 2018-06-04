$(document).ready(function()
{

    if(localStorage.getItem("loginRedirect") === null){
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
            var loginRedirect = localStorage.getItem("loginRedirect");
            window.location.replace(loginRedirect);
        });
    });
});
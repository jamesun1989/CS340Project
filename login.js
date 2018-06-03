$(document).ready(function()
{

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
                console.log(data);
        });
    });
});
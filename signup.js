$(document).ready(function()
{

    $('#signupform').submit(function(event)
    {
        event.preventDefault();
        inputs = $('#signupform :input');
        postData= {};
        inputs.each(function()
        {
            if(this.name && (this.name != 'confirmpassword'))
                postData[this.name] = $(this).val();
        });

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
            $('#test').html('<div> <span class="label label-success pull-left" data-effect="pop">Success</span> </div>');
        })
        .fail(function(jqXHR)
        {
            $('#test').html('<div> <span class="label label-danger pull-left" data-effect="pop">Danger</span> </div>');
        });
    });
});
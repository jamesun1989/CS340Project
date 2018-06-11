function getUrlParameters()
{
    var sPageURL = decodeURIComponent(window.location.search.substring(1));
    var sURLVariables = sPageURL.split('&');

    var object = {};
    for(var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');

        if(sParameterName[0] !== '' && sParameterName[1] !== undefined)
        {
            object[sParameterName[0]] = sParameterName[1];
        }
    }
    return object;
}

$(document).ready(function()
{
    var data = getUrlParameters();
    $.each(data, function(index, value)
	{
		$('#objectproperties tbody').append('<tr><td>'+index+'</td><td>'+value+'</td></tr>');
	});
});


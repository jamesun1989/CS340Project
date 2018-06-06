$(document).ready(function()
{
	var ajaxProperties =
	{
		method: "GET",
		url: CONFIG.listUserBuilds,
		content: "application/json",
		dataType: "json"
	};

	var doneCallback = function(data)
	{
		var numUnnamedBuilds = 1;
		$.each(data, function()
		{
			let buildLink = 'buildsPage.php?buildID=' + this.buildID;
			console.log(buildLink);

			let name = this.name;
			if(name === null)
				name = 'Unnamed Build ' + numUnnamedBuilds++;

			let shared = (this.shared == '1')? "Yes": "No";

			$('#buildList tbody').append('<tr><td><a href="#">'+name+'</a></td><td>'+shared+'</td><td></td></tr>');
		});
	};

	var request = new AuthorizedAjax("listBuilds.php", ajaxProperties, doneCallback);
	request.start();
});


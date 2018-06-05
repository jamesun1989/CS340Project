$(document).ready(function()
{

	$('#buildList').DataTable(
		{
			'columns':
			[
				{ 'data': 'buildID'},
				{ 'data': 'name'},
				{ 'data': 'shared'},

			],
			'columnDefs':
			[
				{
					"targets": 0,
				}
			],
			"deferRender": true,
			"order": []
		});

	var ajaxProperties =
	{
		method: "GET",
		url: CONFIG.listUserBuilds,
		content: "application/json",
		dataType: "json"
	};

	var doneCallback = function(data)
	{
		console.log(data);
		$('#buildList').DataTable().clear();
		$('#buildList').DataTable().rows.add(data).draw();
        
	};

	var request = new AuthorizedAjax("build_test.php", ajaxProperties, doneCallback);
	


	request.start();
	
});


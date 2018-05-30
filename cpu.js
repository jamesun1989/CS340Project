function dynamicPartLink(td, cellData, rowData, row, col)
{
	link = './tables.html?';

	myIndex = 0;
	$.each(rowData, function(index, value){
		if(myIndex == 0)
			link += `${index}=${value}`;
		else
			link += `&${index}=${value}`;
		myIndex++;
	})

	$(td).html(`<a href='${link}'>${rowData.name}</a>`);
}

$(document).ready(function()
{
	$('#ajaxExample').DataTable(
	{
		'columns':
		[
			{ 'data': 'name'},
			{ 'data': 'cores'},
			{ 'data': 'threads'},
			{ 'data': 'socket'},
			{ 'data': 'clockSpeed'},
			{ 'data': 'manufacturer'}
		],
		'columnDefs':
		[
			{
				"targets": 0,
				"createdCell": dynamicPartLink
			}
		],
		"deferRender": true,
		"order": []
	});

	$.ajax(
	{
		method: "GET",
		url: CONFIG.getCPU,
		dataType: "json"
	})
	.done(function(data)
	{
		$('#ajaxExample').DataTable().clear();
		$('#ajaxExample').DataTable().rows.add(data).draw();
	});
});


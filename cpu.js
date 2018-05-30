var ajaxParams =
{
	manufacturer: '',
	socket: '',
	family: ''
};

$(document).ready(function()
{
	$('#partTable').DataTable(
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
		$('#partTable').DataTable().clear();
		$('#partTable').DataTable().rows.add(data).draw();
		createRadioSelect($('#manufacturerSelect'), 'Manufacturer', 'manufacturer', GetUnique(data, 'manufacturer'), CONFIG.getCPU, ajaxParams);
		createRadioSelect($('#socketSelect'),       'Socket',       'socket',       GetUnique(data, 'socket'),       CONFIG.getCPU, ajaxParams);
		createRadioSelect($('#familySelect'),       'Family',       'family',       GetUnique(data, 'family'),       CONFIG.getCPU, ajaxParams);

		$('#test input').click(function(){ console.log(this.value); });
		$('#test input')[0].oninput = function(){ $('#test span').html(this.value); };
		/*console.log(GetMinMax(data, 'cores'));
		console.log(GetMinMax(data, 'threads'));
		console.log(GetMinMax(data, 'clockSpeed'));*/
	});
});


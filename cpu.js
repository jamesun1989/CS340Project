var ajaxParams =
{
	manufacturer: '',
	socket: '',
	family: '',
	minCores: 0,
	maxCores: 0,
	minThreads: 0,
	maxThreads: 0,
	minClockSpeed: 0.0,
	maxClockSpeed: 0.0
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
		createRangeSlider($('#coresRange'), 'Core Count', 'cores', GetMinMax(data, 'cores'), 1, CONFIG.getCPU, ajaxParams, 'minCores', 'maxCores');
		createRangeSlider($('#threadsRange'), 'Thread Count', 'threads', GetMinMax(data, 'threads'), 1, CONFIG.getCPU, ajaxParams, 'minThreads', 'maxThreads');
		createRangeSlider($('#clockSpeedRange'), 'Clock Speed', 'clockSpeed', GetMinMax(data, 'clockSpeed'), 0.1, CONFIG.getCPU, ajaxParams, 'minClockSpeed', 'maxClockSpeed');
	});
});


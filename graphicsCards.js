var ajaxParams =
{
	manufacturer: '',
	gpuChipset: '',
	memoryType: '',
	minClockSpeed: 0.0,
	maxClockSpeed: 0.0,
	minMemory: 0.0,
	maxMemory: 0.0
};

$(document).ready(function()
{
	$('#partTable').DataTable(
	{
		'columns':
		[
			{ 'data': 'name'},
			{ 'data': 'series'},
			{ 'data': 'manufacturer'},
			{ 'data': 'gpuChipset'},
			{ 'data': 'clockSpeed'},
			{ 'data': 'memorySize'},
			{ 'data': 'memoryType'}
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
		url: CONFIG.getGraphicsCards,
		dataType: "json"
	})
	.done(function(data)
	{
		$('#partTable').DataTable().clear();
		$('#partTable').DataTable().rows.add(data).draw();
		createRadioSelect($('#manufacturerSelect'), 'Manufacturer', 'manufacturer', GetUnique(data, 'manufacturer'), CONFIG.getGraphicsCards, ajaxParams);
		createRadioSelect($('#gpuChipsetSelect'),   'GPU Chipsets', 'gpuChipset',   GetUnique(data, 'gpuChipset'),   CONFIG.getGraphicsCards, ajaxParams);
		createRadioSelect($('#memoryTypeSelect'),   'Memory Type',  'memoryType',   GetUnique(data, 'memoryType'),   CONFIG.getGraphicsCards, ajaxParams);
		createRangeSlider($('#clockSpeedRange'), 'Clock Speed', 'clockSpeed', GetMinMax(data, 'clockSpeed'), 0.1, CONFIG.getGraphicsCards, ajaxParams, 'minClockSpeed', 'maxClockSpeed');
		createRangeSlider($('#memoryRange'), 'Memory Size', 'memorySize', GetMinMax(data, 'memorySize'), 1.0, CONFIG.getGraphicsCards, ajaxParams, 'minMemory', 'maxMemory');
	});
});


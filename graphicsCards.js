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

		var filterHelper = new FilterList(CONFIG.getGraphicsCards, ajaxParams);
		filterHelper.addRadioSelect($('#manufacturerSelect'), 'Manufacturer', 'manufacturer', GetUnique(data, 'manufacturer'));
		filterHelper.addRadioSelect($('#gpuChipsetSelect'),   'GPU Chipsets', 'gpuChipset',   GetUnique(data, 'gpuChipset'));
		filterHelper.addRadioSelect($('#memoryTypeSelect'),   'Memory Type',  'memoryType',   GetUnique(data, 'memoryType'));
		filterHelper.addRangeSlider($('#clockSpeedRange'), 'Clock Speed', 'clockSpeed', GetMinMax(data, 'clockSpeed'), 0.1, 'minClockSpeed', 'maxClockSpeed');
		filterHelper.addRangeSlider($('#memoryRange'), 'Memory Size', 'memorySize', GetMinMax(data, 'memorySize'), 1.0, 'minMemory', 'maxMemory');
	});
});


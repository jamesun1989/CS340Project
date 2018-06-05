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

function formattedClockSpeed(data)
{
	var clockSpeed = Number(data);
	if(clockSpeed < 1000)
		return clockSpeed.toPrecision(3) + 'MHz';
	return (clockSpeed/1000).toPrecision(3) + 'GHz';
}

function formattedMemory(data)
{
	var memorySize = Number(data);
	if(memorySize < 1.0)
		return (memorySize*1000) + 'MB';
	return memorySize + 'GB';
}

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
			{ 'data': 'memorySize'}
		],
		'columnDefs':
		[
			{
				"targets": 0,
				"createdCell": dynamicPartLink
			},
			{
				"targets": 4,
				"render": formattedClockSpeed
			},
			{
				"targets": 5,
				"render": formattedMemory
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
		filterHelper.addFormattedRangeSlider($('#clockSpeedRange'), 'Clock Speed', 'clockSpeed', GetMinMax(data, 'clockSpeed'), 1.0, 'minClockSpeed', 'maxClockSpeed', formattedClockSpeed);
		filterHelper.addFormattedRangeSlider($('#memoryRange'), 'Memory Size', 'memorySize', GetMinMax(data, 'memorySize'), 1.0, 'minMemory', 'maxMemory', formattedMemory);
	});
});


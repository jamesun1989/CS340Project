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

function formattedClockSpeed(data)
{
	var clockSpeed = Number(data);
	if(clockSpeed < 1.0)
		return (clockSpeed*1000) + 'MHz';
	return clockSpeed + 'GHz';
}

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
			},
			{
				"targets": 4,
				"render": formattedClockSpeed
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

		var filterHelper = new FilterList(CONFIG.getCPU, ajaxParams);
		filterHelper.addRadioSelect($('#manufacturerSelect'), 'Manufacturer', 'manufacturer', GetUnique(data, 'manufacturer'), CONFIG.getCPU);
		filterHelper.addRadioSelect($('#socketSelect'),       'Socket',       'socket',       GetUnique(data, 'socket'));
		filterHelper.addRadioSelect($('#familySelect'),       'Family',       'family',       GetUnique(data, 'family'));
		filterHelper.addRangeSlider($('#coresRange'), 'Core Count', 'cores', GetMinMax(data, 'cores'), 1, 'minCores', 'maxCores');
		filterHelper.addRangeSlider($('#threadsRange'), 'Thread Count', 'threads', GetMinMax(data, 'threads'), 1, 'minThreads', 'maxThreads');
		filterHelper.addFormattedRangeSlider($('#clockSpeedRange'), 'Clock Speed', 'clockSpeed', GetMinMax(data, 'clockSpeed'), 0.1, 'minClockSpeed', 'maxClockSpeed', formattedClockSpeed);
	});
});


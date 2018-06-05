var ajaxParams =
{
	manufacturer: '',
	type: '',
	minSpeed: 0.0,
	maxSpeed: 0.0,
	minSticks: 0,
	maxSticks: 0,
	minSize: 0.0,
	maxSize: 0.0
};

function formattedSpeed(data)
{
	return data + 'MHz';
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
			{ 'data': 'manufacturer'},
			{ 'data': 'speed'},
			{ 'data': 'type'},
			{ 'data': 'sticks'},
			{ 'data': 'size'}
		],
		'columnDefs':
		[
			{
				"targets": 0,
				"createdCell": dynamicPartLink
			},
			{
				"targets": 2,
				"render": formattedSpeed
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
		url: CONFIG.getRAM,
		dataType: "json"
	})
	.done(function(data)
	{
		$('#partTable').DataTable().clear();
		$('#partTable').DataTable().rows.add(data).draw();

		var filterHelper = new FilterList(CONFIG.getRAM, ajaxParams);
		filterHelper.addRadioSelect($('#manufacturerSelect'), 'Manufacturer', 'manufacturer', GetUnique(data, 'manufacturer'));
		filterHelper.addRadioSelect($('#typeSelect'),         'Type',         'type',         GetUnique(data, 'type'));
		filterHelper.addFormattedRangeSlider($('#speedRange'), 'Speed', 'speed', GetMinMax(data, 'speed'), 1.0, 'minSpeed', 'maxSpeed', formattedSpeed);
		filterHelper.addRangeSlider($('#sticksRange'), 'Stick Count', 'sticks', GetMinMax(data, 'sticks'), 1, 'minSticks', 'maxSticks');
		filterHelper.addFormattedRangeSlider($('#sizeRange'), 'Size', 'size', GetMinMax(data, 'size'), 0.1, 'minSize', 'maxSize', formattedMemory);
	});
});


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
		filterHelper.addRangeSlider($('#speedRange'), 'Speed', 'speed', GetMinMax(data, 'speed'), 1.0, 'minSpeed', 'maxSpeed');
		filterHelper.addRangeSlider($('#sticksRange'), 'Stick Count', 'sticks', GetMinMax(data, 'sticks'), 1, 'minSticks', 'maxSticks');
		filterHelper.addRangeSlider($('#sizeRange'), 'Size', 'size', GetMinMax(data, 'size'), 0.1, 'minSize', 'maxSize');
	});
});


var ajaxParams =
{
	manufacturer: '',
	isAir: 1,
	isLiquid: 1,
	minHeight: 0,
	maxHeight: 0
};

$(document).ready(function()
{
	$('#partTable').DataTable(
	{
		'columns':
		[
			{ 'data': 'name'},
			{ 'data': 'model'},
			{ 'data': 'manufacturer'},
			{ 'data': 'height'},
			{ 'data': 'liquid'}
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
		url: CONFIG.getCPUCoolers,
		dataType: "json"
	})
	.done(function(data)
	{
		$('#partTable').DataTable().clear();
		$('#partTable').DataTable().rows.add(data).draw();
		createRadioSelect($('#manufacturerSelect'), 'Manufacturer',  'manufacturer', GetUnique(data, 'manufacturer'), CONFIG.getCPUCoolers, ajaxParams);
		createRadioSelect($('#isAirSelect'),        'Air Cooled',    'isAir',        [0, 1],                          CONFIG.getCPUCoolers, ajaxParams);
		createRadioSelect($('#isLiquidSelect'),     'Liquid Cooled', 'isLiquid',     [0, 1],                          CONFIG.getCPUCoolers, ajaxParams);
		createRangeSlider($('#heightRange'), 'Height', 'height', GetMinMax(data, 'height'), 1, CONFIG.getCPUCoolers, ajaxParams, 'minHeight', 'maxHeight');
	});
});


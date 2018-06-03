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

		var filterHelper = new FilterList(CONFIG.getCPUCoolers, ajaxParams);
		filterHelper.addRadioSelect($('#manufacturerSelect'), 'Manufacturer',  'manufacturer', GetUnique(data, 'manufacturer'));
		filterHelper.addRadioSelect($('#isAirSelect'),        'Air Cooled',    'isAir',        [0, 1]);
		filterHelper.addRadioSelect($('#isLiquidSelect'),     'Liquid Cooled', 'isLiquid',     [0, 1]);
		filterHelper.addRangeSlider($('#heightRange'), 'Height', 'height', GetMinMax(data, 'height'), 1, 'minHeight', 'maxHeight');
	});
});


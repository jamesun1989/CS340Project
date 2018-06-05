var ajaxParams =
{
	manufacturer: '',
	isAir: 1,
	isLiquid: 1,
	minHeight: 0,
	maxHeight: 0
};

function formattedHeight(data)
{
	var height = Number(data);
	return height + 'mm';
}

function formattedBool(data)
{
	if(data == '1')
		return 'Yes';
	else if(data == '0')
		return 'No';
	return 'Err';
}

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
			},
			{
				"targets": 3,
				"render": formattedHeight
			},
			{
				"targets": 4,
				"render": formattedBool
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
		filterHelper.addRadioSelectWithDisplay($('#isAirSelect'), 'Air Cooled', 'isAir', [0], ['No']);
		filterHelper.addRadioSelectWithDisplay($('#isLiquidSelect'), 'Liquid Cooled', 'isLiquid', [0], ['No']);
		filterHelper.addFormattedRangeSlider($('#heightRange'), 'Height', 'height', GetMinMax(data, 'height'), 1, 'minHeight', 'maxHeight', formattedHeight);
	});
});


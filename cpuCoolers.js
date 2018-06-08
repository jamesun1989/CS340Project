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
			{ 'data': 'liquid'},
			{ 'data': null},
		],
		'columnDefs':
		[
			{
				"targets": 0,
				"createdCell": dynamicPartLink(['height', 'liquid'], [formattedHeight, formattedBool])
			},
			{
				"targets": 3,
				"render": formattedHeight
			},
			{
				"targets": 4,
				"render": formattedBool
			},
			{
				"targets": 5,
				"visible": localStorage.getItem('cpuCoolers.php') !== null && localStorage.getItem('authToken'),
				"searchable": false,
				"orderable": false,
				"createdCell": addToBuildCell("cpuCoolers.php", CONFIG.addBuildCPUCooler)
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
		filterHelper.addSelect($('#manufacturerSelect'), 'Manufacturer',  'manufacturer', GetUnique(data, 'manufacturer'));
		filterHelper.addSelectWithDisplay($('#isAirSelect'), 'Air Cooled', 'isAir', [0], ['No']);
		filterHelper.addSelectWithDisplay($('#isLiquidSelect'), 'Liquid Cooled', 'isLiquid', [0], ['No']);
		filterHelper.addFormattedRangeSlider($('#heightRange'), 'Height', 'height', GetMinMax(data, 'height'), 1, 'minHeight', 'maxHeight', formattedHeight);
	});
});


var ajaxParams =
{
	manufacturer: '',
	type: '',
	minCpuClearance: 0,
	maxCpuClearance: 0,
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
			{ 'data': 'type'}
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
		url: CONFIG.getComputerCases,
		dataType: "json"
	})
	.done(function(data)
	{
		$('#partTable').DataTable().clear();
		$('#partTable').DataTable().rows.add(data).draw();

		var filterHelper = new FilterList(CONFIG.getComputerCases, ajaxParams);
		filterHelper.addRadioSelect($('#manufacturerSelect'), 'Manufacturer', 'manufacturer', GetUnique(data, 'manufacturer'));
		filterHelper.addRadioSelect($('#typeSelect'),         'Type',         'type',         GetUnique(data, 'type'));
		filterHelper.addRangeSlider($('#cpuCoolerClearanceRange'), 'CPU Cooler Clearance', 'cpuCoolerClearance', GetMinMax(data, 'cpuCoolerClearance'), 1, 'minCpuClearance', 'maxCpuClearance');
	});
});


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
		createRadioSelect($('#manufacturerSelect'), 'Manufacturer', 'manufacturer', GetUnique(data, 'manufacturer'), CONFIG.getComputerCases, ajaxParams);
		createRadioSelect($('#typeSelect'),         'Type',         'type',         GetUnique(data, 'type'),         CONFIG.getComputerCases, ajaxParams);
		createRangeSlider($('#cpuCoolerClearanceRange'), 'CPU Cooler Clearance', 'cpuCoolerClearance', GetMinMax(data, 'cpuCoolerClearance'), 1, CONFIG.getComputerCases, ajaxParams, 'minCpuClearance', 'maxCpuClearance');
	});
});


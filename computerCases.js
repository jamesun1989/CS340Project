var ajaxParams =
{
	manufacturer: '',
	type: '',
	minCpuClearance: 0,
	maxCpuClearance: 0,
};

function formattedHeight(data)
{
	var height = Number(data);
	return height + 'mm';
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
			{ 'data': 'type'}
		],
		'columnDefs':
		[
			{
				"targets": 0,
				"createdCell": dynamicPartLink(['cpuCoolerClearance'], [formattedHeight])
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
		filterHelper.addSelect($('#manufacturerSelect'), 'Manufacturer', 'manufacturer', GetUnique(data, 'manufacturer'));
		filterHelper.addSelect($('#typeSelect'),         'Type',         'type',         GetUnique(data, 'type'));
		filterHelper.addFormattedRangeSlider($('#cpuCoolerClearanceRange'), 'CPU Cooler Clearance', 'cpuCoolerClearance', GetMinMax(data, 'cpuCoolerClearance'), 1, 'minCpuClearance', 'maxCpuClearance', formattedHeight);
	});
});


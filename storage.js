var ajaxParams =
{
	manufacturer: '',
	formFactor: '',
	isSSD: 1,
	isHDD: 1,
	minSize: 0,
	maxSize: 0,
};

$(document).ready(function()
{
	$('#partTable').DataTable(
	{
		'columns':
		[
			{ 'data': 'name'},
			{ 'data': 'manufacturer'},
			{ 'data': 'series'},
			{ 'data': 'size'},
			{ 'data': 'formFactor'},
			{ 'data': 'ssd'}
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
		url: CONFIG.getStorage,
		dataType: "json"
	})
	.done(function(data)
	{
		$('#partTable').DataTable().clear();
		$('#partTable').DataTable().rows.add(data).draw();

		var filterHelper = new FilterList(CONFIG.getStorage, ajaxParams);
		filterHelper.addRadioSelect($('#manufacturerSelect'), 'Manufacturer', 'manufacturer', GetUnique(data, 'manufacturer'));
		filterHelper.addRadioSelect($('#formFactorSelect'),   'Form Factor',  'formFactor',   GetUnique(data, 'formFactor'));
		filterHelper.addRadioSelect($('#ssdSelect'),          'SSD',          'isSSD',        [0, 1]);
		filterHelper.addRadioSelect($('#hddSelect'),          'HDD',          'isHDD',        [0, 1]);
		filterHelper.addRangeSlider($('#sizeRange'), 'Size', 'size', GetMinMax(data, 'size'), 1, 'minSize', 'maxSize');
	});
});


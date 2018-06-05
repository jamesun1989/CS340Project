var ajaxParams =
{
	manufacturer: '',
	formFactor: '',
	isSSD: 1,
	isHDD: 1,
	minSize: 0,
	maxSize: 0,
};

function formattedSize(data)
{
	var size = Number(data);
	if(size >= 1000)
		return (size/1000).toFixed(0) + 'TB';
	return size + 'GB';
}

function formattedBool(data)
{
	if(data == '1')
		return 'Yes';
	else if(data == '0')
		return 'No';
	return 'Err';
}

function formattedRPM(data)
{
	if(data === null)
		return "Not Applicable";
	return data;
}

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
				"createdCell": dynamicPartLink(['size', 'ssd', 'hdd', 'RPM'], [formattedSize, formattedBool, formattedBool, formattedRPM])
			},
			{
				"targets": 3,
				"render": formattedSize
			},
			{
				"targets": 5,
				"render": formattedBool
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
		filterHelper.addRadioSelectWithDisplay($('#ssdSelect'), 'SSD', 'isSSD', [0], ['No']);
		filterHelper.addRadioSelectWithDisplay($('#hddSelect'), 'HDD', 'isHDD', [0], ['No']);
		filterHelper.addFormattedRangeSlider($('#sizeRange'), 'Size', 'size', GetMinMax(data, 'size'), 1, 'minSize', 'maxSize', formattedSize);
	});
});


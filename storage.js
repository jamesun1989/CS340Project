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
			{ 'data': 'ssd'},
			{ 'data': null}
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
			},
			{
				"targets": 6,
				"visible": localStorage.getItem('storage.php') !== null && localStorage.getItem('authToken'),
				"searchable": false,
				"orderable": false,
				"createdCell": function(td, cellData, rowData, row, col)
				{
					$(td).html('<button class="btn btn-info btn-sm">Add</button>').click(function()
					{
						var postData =
						{
							buildID: localStorage.getItem('storage.php'),
							partID: rowData.partID
						};

						var ajaxProperties =
						{
							method: "POST",
							url: CONFIG.addBuildStorage,
							data: JSON.stringify(postData),
							dataType: "json"
						};

						var doneCallback = function()
						{
							window.location.replace("build_test.php");
						}

						var failCallback = function(jqXHR)
						{
							bootbox.alert("Sorry we are unable to add the part at this time");
						};

						var request = new AuthorizedAjax("storage.php", ajaxProperties, doneCallback, failCallback);
						request.start();
					});
				}
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
		filterHelper.addSelect($('#manufacturerSelect'), 'Manufacturer', 'manufacturer', GetUnique(data, 'manufacturer'));
		filterHelper.addSelect($('#formFactorSelect'),   'Form Factor',  'formFactor',   GetUnique(data, 'formFactor'));
		filterHelper.addSelectWithDisplay($('#ssdSelect'), 'SSD', 'isSSD', [0], ['No']);
		filterHelper.addSelectWithDisplay($('#hddSelect'), 'HDD', 'isHDD', [0], ['No']);
		filterHelper.addFormattedRangeSlider($('#sizeRange'), 'Size', 'size', GetMinMax(data, 'size'), 1, 'minSize', 'maxSize', formattedSize);
	});
});


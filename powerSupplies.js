var ajaxParams =
{
	manufacturer: '',
	eightyPlus: '',
	modular: '',
	minWattage: 0,
	maxWattage: 0,
};

function formattedEightyPlus(data)
{
	if(data !== null)
		return '80+ '+data;
	return data;
}

function formattedWattage(data)
{
	return data + 'W';
}

$(document).ready(function()
{
	$('#partTable').DataTable(
	{
		'columns':
		[
			{ 'data': 'name'},
			{ 'data': 'series'},
			{ 'data': 'manufacturer'},
			{ 'data': 'eightyPlus'},
			{ 'data': 'wattage'},
			{ 'data': 'modular'},
			{ 'data': null}
		],
		'columnDefs':
		[
			{
				"targets": 0,
				"createdCell": dynamicPartLink(['eightyPlus', 'wattage'], [formattedEightyPlus, formattedWattage])
			},
			{
				"targets": 3,
				"render": formattedEightyPlus
			},
			{
				"targets": 4,
				"render": formattedWattage
			},
			{
				"targets": 6,
				"visible": localStorage.getItem('powerSupplies.php') !== null && localStorage.getItem('authToken'),
				"searchable": false,
				"orderable": false,
				"createdCell": addToBuildCell("powerSupplies.php", CONFIG.addBuildPowerSupply)
			}
		],
		"deferRender": true,
		"order": []
	});

	$.ajax(
	{
		method: "GET",
		url: CONFIG.getPowerSupplies,
		dataType: "json"
	})
	.done(function(data)
	{
		efficiencyList = GetUnique(data, 'eightyPlus');
		efficiencyDisplayList = [];
		$.each(efficiencyList, function(index, value)
		{
			var item = (value !== null)? '80+ ' + value: value;
			efficiencyDisplayList.push(item);
		});

		$('#partTable').DataTable().clear();
		$('#partTable').DataTable().rows.add(data).draw();

		var filterHelper = new FilterList(CONFIG.getPowerSupplies, ajaxParams);
		filterHelper.addSelect($('#manufacturerSelect'), 'Manufacturer', 'manufacturer', GetUnique(data, 'manufacturer'));
		filterHelper.addSelectWithDisplay($('#eightyPlusSelect'), 'Efficiency', 'eightyPlus', efficiencyList, efficiencyDisplayList);
		filterHelper.addSelect($('#modularSelect'),      'Modular',      'modular',      GetUnique(data, 'modular'));
		filterHelper.addFormattedRangeSlider($('#wattageRange'), 'Wattage', 'wattage', GetMinMax(data, 'wattage'), 1, 'minWattage', 'maxWattage', formattedWattage);
	});
});


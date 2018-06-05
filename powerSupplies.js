var ajaxParams =
{
	manufacturer: '',
	eightyPlus: '',
	modular: '',
	minWattage: 0,
	maxWattage: 0,
};

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
			{ 'data': 'modular'}
		],
		'columnDefs':
		[
			{
				"targets": 0,
				"createdCell": dynamicPartLink
			},
			{
				"targets": 3,
				"render": function(data, type, row, meta)
				{
					if(data !== null)
						return '80+ '+data;
					return data;
				}
			},
			{
				"targets": 4,
				"render": formattedWattage
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
		filterHelper.addRadioSelect($('#manufacturerSelect'), 'Manufacturer', 'manufacturer', GetUnique(data, 'manufacturer'));
		filterHelper.addRadioSelectWithDisplay($('#eightyPlusSelect'), 'Efficiency', 'eightyPlus', efficiencyList, efficiencyDisplayList);
		filterHelper.addRadioSelect($('#modularSelect'),      'Modular',      'modular',      GetUnique(data, 'modular'));
		filterHelper.addFormattedRangeSlider($('#wattageRange'), 'Wattage', 'wattage', GetMinMax(data, 'wattage'), 1, 'minWattage', 'maxWattage', formattedWattage);
	});
});


var ajaxParams =
{
	manufacturer: '',
	socket: '',
	formFactor: '',
	minSlots: 0,
	maxSlots: 0,
	minRAM: 0.0,
	maxRAM: 0.0
};

$(document).ready(function()
{
	$('#partTable').DataTable(
	{
		'columns':
		[
			{ 'data': 'name'},
			{ 'data': 'manufacturer'},
			{ 'data': 'socket'},
			{ 'data': 'formFactor'},
			{ 'data': 'ramSlots'},
			{ 'data': 'maxRam'}
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
		url: CONFIG.getMotherboards,
		dataType: "json"
	})
	.done(function(data)
	{
		$('#partTable').DataTable().clear();
		$('#partTable').DataTable().rows.add(data).draw();

		var filterHelper = new FilterList(CONFIG.getMotherboards, ajaxParams);
		filterHelper.addRadioSelect($('#manufacturerSelect'), 'Manufacturer', 'manufacturer', GetUnique(data, 'manufacturer'));
		filterHelper.addRadioSelect($('#socketSelect'),       'Socket',       'socket',       GetUnique(data, 'socket'));
		filterHelper.addRadioSelect($('#formFactorSelect'),   'Form Factor',  'formFactor',   GetUnique(data, 'formFactor'));
		filterHelper.addRangeSlider($('#ramSlotsRange'), 'RAM Slots', 'ramSlots', GetMinMax(data, 'ramSlots'), 1, 'minSlots', 'maxSlots');
		filterHelper.addRangeSlider($('#maxRamRange'), 'Max RAM', 'maxRam', GetMinMax(data, 'maxRam'), 0.1, 'minRAM', 'maxRAM');
	});
});


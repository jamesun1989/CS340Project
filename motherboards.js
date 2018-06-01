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
		createRadioSelect($('#manufacturerSelect'), 'Manufacturer', 'manufacturer', GetUnique(data, 'manufacturer'), CONFIG.getMotherboards, ajaxParams);
		createRadioSelect($('#socketSelect'),       'Socket',       'socket',       GetUnique(data, 'socket'),       CONFIG.getMotherboards, ajaxParams);
		createRadioSelect($('#formFactorSelect'),   'Form Factor',  'formFactor',   GetUnique(data, 'formFactor'),   CONFIG.getMotherboards, ajaxParams);
		createRangeSlider($('#ramSlotsRange'), 'RAM Slots', 'ramSlots', GetMinMax(data, 'ramSlots'), 1, CONFIG.getMotherboards, ajaxParams, 'minSlots', 'maxSlots');
		createRangeSlider($('#maxRamRange'), 'Max RAM', 'maxRam', GetMinMax(data, 'maxRam'), 0.1, CONFIG.getMotherboards, ajaxParams, 'minRAM', 'maxRAM');
	});
});


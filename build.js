function getAddPage(tableID)
{
	switch(tableID)
	{
		case "Case":         return "computerCases.php";
		case "CPU":          return "cpu.php";
		case "CPUCooler":    return "cpuCoolers.php";
		case "GraphicsCard": return "graphicsCards.php";
		case "Motherboard":  return "motherboards.php";
		case "PowerSupply":  return "powerSupplies.php";
		case "RAM":          return "ram.php";
		case "Storage":      return "storage.php";
		default:
			console.log("Could not find page for that part");
			return null;
	}
}

function getRemoveEndpoint(tableID)
{
	switch(tableID)
	{
		case "Case":         return CONFIG.deleteBuildCase;
		case "CPU":          return CONFIG.deleteBuildCPU;
		case "CPUCooler":    return CONFIG.deleteBuildCPUCooler;
		case "GraphicsCard": return CONFIG.deleteBuildGraphicsCard;
		case "Motherboard":  return CONFIG.deleteBuildMotherboard;
		case "PowerSupply":  return CONFIG.deleteBuildPowerSupply;
		case "RAM":          return CONFIG.deleteBuildRAM;
		case "Storage":      return CONFIG.deleteBuildStorage;
		default:
			console.log("Could not find the endpoint for that part");
			return null;
	}
}

function optionalAddButton(table, buildID, counter)
{
	if(table.prop("dataset").max > counter)
	{
		let tableID = table.prop('id');
		let componentName = table.children('thead').children('tr').children('th').first().text();
		let row = $('<tr><td colspan="2"></td></tr>');

		let addButton = $('<button class="btn btn-primary center-block">Add '+ componentName +'</button>').click(function()
		{
			let addFile = getAddPage(tableID);

			localStorage.setItem(addFile, buildID);
			window.location.replace(addFile);
		});
		row.append($('<td></td>').append(addButton));
		table.children("tbody").append(row);
	}
}

function deletePart(table, id, buildID, row)
{
	return function()
	{
		let removeEndPoint = getRemoveEndpoint(table.prop("id"));

		var box = bootbox.dialog(
		{
			title: "Delete Part",
			size: "large",
			backdrop: true,
			onEscape: true,
			message: '<p>Are you sure you want to delete this part?</p><br><div id ="modalError"></div>',
			buttons:
			{
				cancel:
				{
					label: "Cancel",
					className: "btn-default"
				},
				confirm:
				{
					label: 'Delete',
					className: 'btn-danger',
					callback: function()
					{
						var postData =
						{
							id: id
						};

						var ajaxProperties =
						{
							method: "POST",
							url: removeEndPoint,
							data: JSON.stringify(postData),
							dataType: "json"
						};

						var doneCallback = function()
						{
							//remove that row
							row.remove();

							//if less we now need a add button
							if(table.children('tbody').children('tr').last().children('td').last().text().indexOf("Add") == -1)
							{
								let length  = table.children('tbody').children('tr').length;
								optionalAddButton(table, buildID, length);
							}

							box.modal('hide');
						}

						var failCallback = function(jqXHR)
						{
							$('#modalError').html('<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Error!</strong> We cannot create a build at this time </div>');
						};

						var request = new AuthorizedAjax("build.php?buildID="+buildID, ajaxProperties, doneCallback, failCallback);
						request.start();

						return false;
					}
				}
			}
		});
	}
}

var buildData = {};
$(document).ready(function()
{
	let buildID = decodeURIComponent(window.location.search.substring(1)).split('=')[1];
	let asyncData =
	[
		{ endPoint: CONFIG.getBuildCase,         tableID: "Case" },
		{ endPoint: CONFIG.getBuildCPU,          tableID: "CPU" },
		{ endPoint: CONFIG.getBuildCPUCooler,    tableID: "CPUCooler" },
		{ endPoint: CONFIG.getBuildGraphicsCard, tableID: "GraphicsCard" },
		{ endPoint: CONFIG.getBuildMotherboard,  tableID: "Motherboard" },
		{ endPoint: CONFIG.getBuildPowerSupply,  tableID: "PowerSupply" },
		{ endPoint: CONFIG.getBuildRAM,          tableID: "RAM" },
		{ endPoint: CONFIG.getBuildStorage,      tableID: "Storage" },
	];

	let waiters = [];
	$.each(asyncData, function(index)
	{
		waiters.push(new $.Deferred());
		waiters[index].done = jQuery.noop;

		var ajaxProperties =
		{
			method: "GET",
			url: this.endPoint + "?buildID=" + buildID,
			content: "application/json",
			dataType: "json"
		};

		let tableID = this.tableID;
		buildData[tableID] = [];

		var doneCallback = function(data)
		{
			let counter = 0;
			let table = $('#'+tableID);
			$.each(data, function()
			{
				counter++;
				let id = this.id;
				let data = this.data;
				let row = $('<tr><td>'+ data.name + '</td><td>'+data.partID+'</td></tr>');

				buildData[tableID].push(data);

				var delete_button = $('<button class="btn btn-danger center-block">Delete</button>').click(deletePart(table, id, buildID, row));
				row.append($('<td></td>').append(delete_button));

				table.children("tbody").append(row);
			});

			optionalAddButton(table, buildID, counter);
			waiters[index].resolve();
		}

		var request = new AuthorizedAjax("build.php?buildID="+buildID, ajaxProperties, doneCallback);
		request.start();
	});

	$.when.apply($, waiters).then(function(data)
	{
		console.log(buildData);
		$.ajax({
			method: "POST",
			url: CONFIG.buildCheck,
			data: JSON.stringify(buildData),
			content: "application/json",
			dataType: "json",
			headers: {"X-HTTP-Method-Override": "GET"}
		})
		.done(function(data)
		{
			$.each(data, function()
			{
				$('#buildCheck').append(this);
			});
		});
	});
});

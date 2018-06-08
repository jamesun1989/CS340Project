function optionalAddButton(partType, buildID, counter)
{
	if($("#" + partType).prop("dataset").max > counter)
	{
		let componentName = $('#' + partType + ' th:first').text();
		let row = $('<tr><td colspan="2"></td></tr>');
		let addButton = $('<button class="btn btn-primary center-block">Add '+ componentName +'</button>').click(function()
		{
			let addFile;
			switch(componentName)
			{
				case "Case":         addFile = "computerCases.php"; break;
				case "CPU":          addFile = "cpu.php"; break;
				case "CPU Cooler":   addFile = "cpuCoolers.php"; break;
				case "GPU":          addFile = "graphicsCards.php"; break;
				case "Motherboard":  addFile = "motherboards.php"; break;
				case "Power Supply": addFile = "powerSupplies.php"; break;
				case "RAM":          addFile = "ram.php"; break;
				case "Storage":      addFile = "storage.php"; break;
				default: console.log("Could not find page for that part"); return;
			}

			localStorage.setItem(addFile, buildID);
			window.location.replace(addFile);
		});
		row.append($('<td></td>').append(addButton));
		$("#" + partType + " tbody").append(row);
	}
}

$(document).ready(function()
{
	let buildID = decodeURIComponent(window.location.search.substring(1)).split('=')[1];
	var ajaxProperties =
	{
		method: "GET",
		url: CONFIG.getUserBuild + "?buildID=" + buildID,
		content: "application/json",
		dataType: "json"
	};

	var doneCallback = function(data)
	{
		$.each(data, function()
		{
			var partType = this.partType;
			var counter = 0;
			$.each(this.ids, function()
			{
				counter++;
				var row = $("<tr><td>" + this.partID +  '</td><td></td></tr>');
				var id = this.id;

				var delete_button = $('<button class="btn btn-danger center-block">Delete</button>').click(function()
				{
					let componentName = $('#' + partType + ' th:first').text();
					let removeEndPoint;
					switch(componentName)
					{
						case "Case":         removeEndPoint = CONFIG.deleteBuildCase; break;
						case "CPU":          removeEndPoint = CONFIG.deleteBuildCPU; break;
						case "CPU Cooler":   removeEndPoint = CONFIG.deleteBuildCPUCooler; break;
						case "GPU":          removeEndPoint = CONFIG.deleteBuildGraphicsCard; break;
						case "Motherboard":  removeEndPoint = CONFIG.deleteBuildMotherboard; break;
						case "Power Supply": removeEndPoint = CONFIG.deleteBuildPowerSupply; break;
						case "RAM":          removeEndPoint = CONFIG.deleteBuildRAM; break;
						case "Storage":      removeEndPoint = CONFIG.deleteBuildStorage; break;
						default: console.log("Could not find the endpoint for that part"); return;
					}

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
										if($('#' + partType + ' tbody tr:last td:last').text().indexOf("Add") == -1)
										{
											let length  = $('#' + partType + ' tbody tr').length;
											optionalAddButton(partType, buildID, length);
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
				});
				row.append($('<td></td>').append(delete_button));

				$("#" + partType + " tbody").append(row);
			});

			optionalAddButton(partType, buildID, counter);
		});

		$('table tbody').each(function()
		{
			let rowNum = $(this).children('tr').length;
			if(rowNum == 0)
			{
				let partType = $(this).parent().prop('id');
				optionalAddButton(partType, buildID, 0);
			}
		});
	};

	var request = new AuthorizedAjax("build.php?buildID="+buildID, ajaxProperties, doneCallback);
	request.start();
});


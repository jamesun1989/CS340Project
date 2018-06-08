<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <link rel="icon" href="img/favicon.ico">

  <link rel="stylesheet" type="text/css" href="Bootstrap3/css/bootstrap.min.css">
  <link rel="stylesheet" type="text/css" href="DataTables/datatables.min.css">
  <link rel="stylesheet" type="text/css" href="TechieBootstrap/bootstrap.techie.min.css">

  <script type="text/javascript" src="jQuery/jquery.min.js"></script>
  <script type="text/javascript" src="Bootstrap3/js/bootstrap.min.js"></script>
  <script type="text/javascript" src="DataTables/datatables.min.js"></script>
  <script type="text/javascript" src="Bootbox/bootbox.min.js"></script>
  <script type="text/javascript" src="config.js"></script>
  <script type="text/javascript" src="authorizedAjax.js"></script>
</head>

<body>
<div class="container">
	<?php include '_nav.html'; ?>

<div class="well">
	<p class="lead">Build Parts</p>
</div>

<table data-max="1" id="caseID" class="table table-bordered" data-effect="fade">
	<thead>
		<tr>
			<th colspan="3">Case</th>
		</tr>
		<tr>
			<th width="44%">Part ID</th>
			<th width="44%">Name</th>
			<th>Operations</th>
		</tr>
	</thead>
	<tbody>
	</tbody>
</table>

<table data-max="1" id="cpuID" class="table table-bordered" data-effect="fade">
	<thead>
		<tr>
			<th colspan="3">CPU</th>
		</tr>
		<tr>
			<th width="44%">Part ID</th>
			<th width="44%">Name</th>
			<th>Operations</th>
		</tr>
	</thead>
	<tbody>
	</tbody>
</table>

<table data-max="1" id="cpuCoolerID" class="table table-bordered" data-effect="fade">
	<thead>
		<tr>
			<th colspan="3">CPU Cooler</th>
		</tr>
		<tr>
			<th width="44%">Part ID</th>
			<th width="44%">Name</th>
			<th>Operations</th>
		</tr>
	</thead>
	<tbody>
	</tbody>
</table>

<table data-max="4" id="gpuID" class="table table-bordered" data-effect="fade">
	<thead>
		<tr>
			<th colspan="3">GPU</th>
		</tr>
		<tr>
			<th width="44%">Part ID</th>
			<th width="44%">Name</th>
			<th>Operations</th>
		</tr>
	</thead>
	<tbody>
	</tbody>
</table>

<table data-max="1" id="motherboardID" class="table table-bordered" data-effect="fade">
	<thead>
		<tr>
			<th colspan="3">Motherboard</th>
		</tr>
		<tr>
			<th width="44%">Part ID</th>
			<th width="44%">Name</th>
			<th>Operations</th>
		</tr>
	</thead>
	<tbody>
	</tbody>
</table>

<table data-max="1" id="psuID" class="table table-bordered" data-effect="fade">
	<thead>
		<tr>
			<th colspan="3">Power Supply</th>
		</tr>
		<tr>
			<th width="44%">Part ID</th>
			<th width="44%">Name</th>
			<th>Operations</th>
		</tr>
	</thead>
	<tbody>
	</tbody>
</table>

<table data-max="4" id="ramID" class="table table-bordered" data-effect="fade">
	<thead>
		<tr>
			<th colspan="3">RAM</th>
		</tr>
		<tr>
			<th width="44%">Part ID</th>
			<th width="44%">Name</th>
			<th>Operations</th>
		</tr>
	</thead>
	<tbody>
	</tbody>
</table>

<table data-max="4" id="storageID" class="table table-bordered" data-effect="fade">
	<thead>
		<tr>
			<th colspan="3">Storage</th>
		</tr>
		<tr>
			<th width="44%">PartID</th>
			<th width="44%">Name</th>
			<th>Operations</th>
		</tr>
	</thead>
	<tbody>
	</tbody>
</table>

<script>
function optionalAddButton(partType, counter)
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

			localStorage.setItem(addFile, 4);
			window.location.replace(addFile);
		});
		row.append($('<td></td>').append(addButton));
		$("#" + partType + " tbody").append(row);
	}
}

$(document).ready(function()
{
	var ajaxProperties =
	{
		method: "GET",
		url: CONFIG.getUserBuild + "?buildID=4",
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

					bootbox.confirm(
					{
						message: "This is a confirm with custom button text and color! Do you like it?",
						backdrop: true,
						buttons:
						{
							confirm:
							{
								label: 'Yes',
								className: 'btn-success',
							},
							cancel:
							{
								label: 'No',
								className: 'btn-danger',
							}
						},
						callback: function(result)
						{
							if(result)
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
										optionalAddButton(partType, length);
									}
								}

								var failCallback = function(jqXHR)
								{
									bootbox.alert("Sorry we are unable to remove the part at this time");
								};

								var request = new AuthorizedAjax("build.php", ajaxProperties, doneCallback, failCallback);
								request.start();
							}
						}
					});
				});
				row.append($('<td></td>').append(delete_button));

				$("#" + partType + " tbody").append(row);
			});

			optionalAddButton(partType, counter);
		});
	};

	var request = new AuthorizedAjax("build.php", ajaxProperties, doneCallback);
	request.start();
});
</script>
</body>
</html>

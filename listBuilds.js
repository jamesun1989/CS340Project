function getBuildData()
{
	var ajaxProperties =
	{
		method: "GET",
		url: CONFIG.listUserBuilds,
		content: "application/json",
		dataType: "json"
	};

	var doneCallback = function(data)
	{
		var numUnnamedBuilds = 1;
		
		$.each(data, function()
		{
			let buildLink = 'build.php?buildID=' + this.buildID;

			let name = this.name;
			let isUnamed = false;
			if(name === null)
				name = 'Unnamed Build ' + numUnnamedBuilds++;

			let shared = (this.shared == '1')? "Yes": "No";

			var row = $('<tr><td><a href="'+buildLink+'">'+name+'</a></td><td>'+shared+'</td></tr>');
			var update = $('<button class="btn btn-primary">Update</button>').click(updateBuild(this.buildID, row));

			row.append($('<td></td>').append(update));
			var delete_button = $('<button class="btn btn-danger">Delete</button>').click(deleteBuild(this.buildID, row));
			row.append($('<td></td>').append(delete_button));

			$('#buildList tbody').append(row);
		});
	};

	var request = new AuthorizedAjax("listBuilds.php", ajaxProperties, doneCallback);
	request.start();
}

function updateBuild(buildID, row)
{
	return function()
	{
		let sharedText = row.children("td:eq(1)").text();
		let shareOption;
		let oldShared;
		if(sharedText == 'Yes')
		{
			shareOption = '<option value="1" selected>Yes</option><option value="0">No</option>';
			oldShared = "1";
		}
		else
		{
			shareOption = '<option value="1">Yes</option><option value="0" selected>No</option>';
			oldShared = "0";
		}

		let oldName = row.children("td:first").children("a").text();

		let message = '<div class="row">' +
		              	'<div class="col-sm-3 col-lg-3">' +
		              		'<label for="shareable">Shareable</label>' +
		              		'<select class="form-control" name="shareable">'+shareOption+'</select>' +
		              	'</div>' +
		              '</div>' +
		              '<br>' +
		              '<label for="updateBuildName">Build Name</label>' +
		              '<input class="form-control" type="text" name="updateBuildName" value="'+oldName+'">' +
		              '<br>' +
		              '<div id="modalError"></div>';

		var box = bootbox.dialog(
		{
			title: "Update Build",
			size: "large",
			backdrop: true,
			onEscape: true,
			message: message,
			buttons:
			{
				cancel:
				{
					label: "Cancel",
					className: "btn-default"
				},
				confirm:
				{
					label: "Update",
					className: "btn-primary",
					callback: function()
					{
						let newShared = $('select[name="shareable"]').prop('value');
						let newName = $('input[name="updateBuildName"]').prop('value');
						if(newName == oldName)
							newName = null;

						if(newShared == oldShared && newName === null)
							return true;

						var postData =
						{
							buildID: buildID,
							buildName: newName,
							shared: newShared,
						};

						var ajaxProperties =
						{
							method: "POST",
							url: CONFIG.updateBuild,
							data: JSON.stringify(postData),
							dataType: "json"
						};

						var doneCallback = function()
						{
							newShared = (newShared == "1")? "Yes": "No";
							if(newName == null)
								newName = oldName;

							row.children("td:first").children("a").text(newName);
							row.children("td:eq(1)").text(newShared);
							box.modal('hide');
						}

						var failCallback = function()
						{
							$('#modalError').html('<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Error!</strong> We cannot update this build at this time </div>');
						}

						var request = new AuthorizedAjax("listBuilds.php", ajaxProperties, doneCallback, failCallback);
						request.start();

						return false;
					}
				}
			}
		});
	}
}

function deleteBuild(buildID, row)
{
	return function()
	{
		var box = bootbox.dialog(
		{
			title: "Delete Build",
			size: "large",
			backdrop: true,
			onEscape: true,
			message: '<p>Are you sure want to delete this build?</p><br><div id="modalError"></div>',
			buttons:
			{
				cancel:
				{
					label: "Cancel",
					className: "btn-default"
				},
				confirm:
				{
					label: "Delete",
					className: "btn-danger",
					callback: function()
					{
						var postData =
						{
							buildID: buildID
						};

						var ajaxProperties =
						{
							method: "POST",
							url: CONFIG.deleteBuild,
							data: JSON.stringify(postData),
							dataType: "json"
						};

						var doneCallback = function()
						{
							row.remove();
							box.modal('hide');
						}

						var failCallback = function()
						{
							$('#modalError').html('<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Error!</strong> We cannot delete this build at this time </div>');
						}

						var request = new AuthorizedAjax("listBuilds.php", ajaxProperties, doneCallback, failCallback);
						request.start();

						return false;
					}
				}
			}
		});
	}
}

function addBuild()
{
	var box = bootbox.dialog(
	{
		title: "Create Build",
		size: "large",
		backdrop: true,
		onEscape: true,
		message: '<p>Give the build an optional name</p><input class="form-control" type="text" name="newBuildName"><br><div id="modalError"></div>',
		buttons:
		{
			cancel:
			{
				label: "Cancel",
				className: "btn-default"
			},
			confirm:
			{
				label: "Create Build",
				className: "btn-primary",
				callback: function()
				{
					var input = $('input[name="newBuildName"]');
					var value = input.prop("value");
					if(value == '')
						value = null;

					var postData =
					{
						buildName: value
					};

					var ajaxProperties =
					{
						method: "POST",
						url: CONFIG.createBuild,
						data: JSON.stringify(postData),
						dataType: "json"
					};

					var doneCallback = function()
					{
						$('#buildList tbody tr').remove();
						getBuildData();
						box.modal('hide');
					}

					var failCallback = function()
					{
						$('#modalError').html('<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Error!</strong> We cannot create a build at this time </div>');
					}

					var request = new AuthorizedAjax("listBuilds.php", ajaxProperties, doneCallback, failCallback);
					request.start();

					return false;
				}
			}
		}
	});
}

$(document).ready(function()
{
	$('#createBuildButton').click(addBuild);
	getBuildData();
});


function addBuild(){
	bootbox.alert({
		message: "Adding build.",
		callback: function () {
			console.log('Adding build.');
		}
	});
}
$(document).ready(function()
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
			if(name === null)
				name = 'Unnamed Build ' + numUnnamedBuilds++;

			let shared = (this.shared == '1')? "Yes": "No";

			var row = $('<tr><td><a href="'+buildLink+'">'+name+'</a></td><td>'+shared+'</td></tr>');
			var update = $('<button class="btn btn-primary">Update</button>').click(function(){
				bootbox.alert({
					message: "This is an alert with a callback!",
					callback: function () {
						console.log('This was logged in the callback!');
					}
				});
			});

			row.append($('<td></td>').append(update));
			var delete_button = $('<button class="btn btn-danger">Delete</button>').click(function(){
				bootbox.confirm({
			    message: "This is a confirm with custom button text and color! Do you like it?",
			    buttons: {
			        confirm: {
			            label: 'Yes',
			            className: 'btn-success',
			        },
			        cancel: {
			            label: 'No',
			            className: 'btn-danger',
			        }
			    },
			    callback: function (result) {
			        console.log('This was logged in the callback: ' + result);
			    }
			});
			});
			row.append($('<td></td>').append(delete_button));

			$('#buildList tbody').append(row);
		});
	};

	var request = new AuthorizedAjax("listBuilds.php", ajaxProperties, doneCallback);
	request.start();
});


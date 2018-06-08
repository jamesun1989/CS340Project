function dynamicPartLink(keys, keyFormatters)
{
	return function(td, cellData, rowData, row, col)
	{
		var link = 'partSpecifications.php?';

		Object.keys(rowData).forEach(function(key, index)
		{
			let data;

			let keyPos = $.inArray(key, keys);
			if(keyPos > -1)
				data = keyFormatters[keyPos](rowData[key]);
			else
				data = rowData[key];

			if(data === null)
				data = '';

			var entry = key + '=' + data;

			if(index == 0)
			{
				link += entry;
				return;
			}

			link += '&' + entry;
		});

		$(td).html('<a href="'+link+'">'+rowData.name+'</a>');
	}
}

function GetUnique(inputArray, property)
{
	var outputArray = [];

	$.each(inputArray, function()
	{
		var item = this[property];
		if((jQuery.inArray(item, outputArray)) == -1)
		{
			outputArray.push(item);
		}
	});
	return outputArray;
}

function GetMinMax(inputArray, property)
{
	var minItem = Number(inputArray[0][property]);
	var maxItem = Number(inputArray[0][property]);

	for(var i = 1; i < inputArray.length; i++)
	{
		var item = Number(inputArray[i][property]);
		if(item < minItem)
			minItem = item;
		if(item > maxItem)
			maxItem = item;
	}

	return [minItem, maxItem];
}

function loadAjaxData(endPoint, endPointParams)
{
	var ajaxUrl = endPoint + '?';
	var myIndex = 0;

	$.each(endPointParams, function(index, value)
	{
		if(myIndex == 0)
			ajaxUrl += index + '=' + value;
		else
			ajaxUrl += '&' + index + '=' + value;
		myIndex++;
	});

	$.ajax(
	{
		method: "GET",
		url: ajaxUrl,
		dataType: "json"
	})
	.done(function(data)
	{
		$('#partTable').DataTable().clear();
		$('#partTable').DataTable().rows.add(data).draw();
	});
}

function FilterList(endPoint, endPointParams)
{
	this.endPoint = endPoint;
	this.endPointParams = endPointParams;

	this.addSelect = function(appendTo, title, searchName, list)
	{
		this.addSelectWithDisplay(appendTo, title, searchName, list, list);
	};

	this.addSelectWithDisplay = function(appendTo, title, searchName, list, displayList)
	{
		var output = '<p class="lead">'+title+'</p>' +
		             '<select class="form-control" name="'+searchName+'">' +
		             	'<option value="">ALL</option>';

		$.each(list, function(index, value)
		{
			if(value !== null)
				output += '<option value="'+value+'">'+displayList[index]+'</option>';
		});

		output += '</select>';
		appendTo.append(output);

		$('select[name="'+searchName+'"]').change(function()
		{
			endPointParams[searchName] = this.value;

			loadAjaxData(endPoint, endPointParams);
		});
	};

	this.addRangeSlider = function(appendTo, title, searchName, values, step, endPointName1, endPointName2)
	{
		this.addFormattedRangeSlider(appendTo, title, searchName, values, step, endPointName1, endPointName2, null);
	};

	this.addFormattedRangeSlider = function(appendTo, title, searchName, values, step, endPointName1, endPointName2, formatter)
	{
		endPointParams[endPointName1] = values[0];
		endPointParams[endPointName2] = values[1];

		var output = '<p class="lead">'+title+'</p>' +
		             '<div class="range">' +
		             	'<input name="'+searchName+'" class="slider" type="text" data-slider-value="[0,0]">' +
		             '</div>';

		appendTo.append(output);

		$('input[name="'+searchName+'"]').slider(
		{
			min: values[0],
			max: values[1],
			step: step,
			value: values,
			tooltip: 'show',
	  		tooltip_split: true,
	  		tooltip_position: 'top',
	  		formatter: formatter
		}).on('slideStop', function()
		{
			var currentValues = this.value.split(',');
			endPointParams[endPointName1] = currentValues[0];
			endPointParams[endPointName2] = currentValues[1];

			loadAjaxData(endPoint, endPointParams);
		});
	};
}

function addToBuildCell(pageURL, addEndPoint)
{
	return function(td, cellData, rowData, row, col)
	{
		$(td).html('<button class="btn btn-info btn-sm">Add</button>').click(function()
		{
			var postData =
			{
				buildID: localStorage.getItem(pageURL),
				partID: rowData.partID
			};

			var ajaxProperties =
			{
				method: "POST",
				url: addEndPoint,
				data: JSON.stringify(postData),
				dataType: "json"
			};

			var doneCallback = function()
			{
				localStorage.removeItem(pageURL);
				window.location.replace("build.php");
			}

			var failCallback = function(jqXHR)
			{
				bootbox.alert("Sorry we are unable to add the part at this time");
			};

			var request = new AuthorizedAjax(pageURL, ajaxProperties, doneCallback, failCallback);
			request.start();
		});
	}
}


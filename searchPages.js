function dynamicPartLink(td, cellData, rowData, row, col)
{
	var link = 'partsDetail.php?';
	var myIndex = 0;

	$.each(rowData, function(index, value)
	{
		if(myIndex == 0)
			link += `${index}=${value}`;
		else
			link += `&${index}=${value}`;
		myIndex++;
	});

	$(td).html(`<a href='${link}'>${rowData.name}</a>`);
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
	var ajaxUrl = `${endPoint}?`;
	var myIndex = 0;

	$.each(endPointParams, function(index, value)
	{
		if(myIndex == 0)
			ajaxUrl += `${index}=${value}`;
		else
			ajaxUrl += `&${index}=${value}`;
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

function createRadioSelect(appendTo, title, searchName, list, endPoint, endPointParams)
{
	var output = `<p class="lead">${title}</p><div class="radio"><label><input type="radio" name=${searchName} value="ALL" checked="">ALL</label></div>`;
	$.each(list, function()
	{
		output += `<div class="radio"><label class="radioSelecter"><input type="radio" name=${searchName} value="${this}">${this}</label></div>`;
	});
	appendTo.append(output);

	$(`input[name="${searchName}"]`).click(function()
	{
		if(this.value == 'ALL')
			endPointParams[searchName] = '';
		else
			endPointParams[searchName] = this.value;

		loadAjaxData(endPoint, endPointParams);
	});
}


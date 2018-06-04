function AuthorizedAjax(loginRedirectUrl, ajaxProperties, doneCallback)
{
	this.loginRedirectUrl = loginRedirectUrl;
	this.ajaxProperties = ajaxProperties;
	this.doneCallback = doneCallback;
}

AuthorizedAjax.prototype.start = function()
{
	if(localStorage.getItem("refreshToken") === null)
	{
		window.location.replace("login.php");
	}

	if(localStorage.getItem("authToken") === null)
	{
		return this.GetAuthToken();
	}
	
	this.GetData();
};

AuthorizedAjax.prototype.GetAuthToken = function()
{
	var that = this;
	var authData =
	{
		refreshToken: localStorage.getItem("refreshToken")
	};

	$.ajax(
	{
		method: "POST",
		url: CONFIG.authToken,
		data: JSON.stringify(authData),
		content: "application/json",
		dataType: "json"
	})
	.done(function(data)
	{
		localStorage.setItem("authToken", data.authToken);
		return that.GetData();
	})
	.fail(function(jqXHR)
	{
		if(jqXHR.status == 401 || jqXHR.status == 403)
		{
			localStorage.setItem("loginRedirect", that.loginRedirectUrl);
			window.location.replace("login.php");
		}
	});
};

AuthorizedAjax.prototype.GetData = function()
{
	var that = this;
	if(!this.ajaxProperties.url.includes('?'))
		this.ajaxProperties.url += '?authToken=' + localStorage.getItem("authToken");
	else
		this.ajaxProperties.url += '&authToken=' + localStorage.getItem("authToken");

	$.ajax(that.ajaxProperties)
	.done(that.doneCallback)
	.fail(function(jqXHR)
	{
		if(jqXHR.status == 401 || jqXHR.status == 403)
		{
			return that.GetAuthToken();
		}
	});
};


var config =
{
	appid : "oauth254117aa08b79a5.99870256",
	apiurl: "https://devapi.cloudwalkers.be/1/",
	authurl: "https://devapi.cloudwalkers.be/oauth2/",
	
	setloginwindow : function ()
	{
		$("iframe").get(0).src = config.authurl + "authorize?response_type=token&state=xyz&client_id=" + config.appid + "&redirect_uri=" + origin() + "/auth.html";
	},
	
	hello : function ()
	{
		window.location = "/";
	},
	
	hasToken : function ()
	{
		// Authentication
		var token = window.localStorage.getItem('token');
		
		if(token && token.length > 9) config.hello();
		else	
		{
			if(token) window.localStorage.removeItem('token');
			
			config.setloginwindow();
			window.addEventListener("message", config.receiveToken, false);	
		}
	},
	
	receiveToken :function (event)
	{
		if (event.origin !== origin())
		return;
		
		if (event.data && event.data.length > 9)
		{
			window.localStorage.setItem('token', event.data);
			config.hello();
		}
		else config.setloginwindow();
	}
}

var origin = function ()
{
	return (window.location.origin)? window.location.origin : window.location.protocol + "//" + window.location.hostname;
}
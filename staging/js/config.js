define({
	
	appid : "oauth253df6850dec638.12776363",
	apiurl: "http://devapi.cloudwalkers.be/1/",
	lapiurl: "http://devapi.cloudwalkers.be/1.1/",
	authurl: "http://devapi.cloudwalkers.be/oauth2/",
	
	/*
	Dev Engine 1.1
	appid : "oauth254a82f767f0dd8.01845977",
	apiurl: "http://devapi.cloudwalkers.be/1/",
	lapiurl: "http://devapi.cloudwalkers.be/1.1/",
	authurl: "http://devapi.cloudwalkers.be/oauth2/",
	*/
	
	setloginwindow : function ()
	{
		$("iframe").get(0).src = this.authurl + "authorize?response_type=token&state=xyz&client_id=" + this.appid + "&redirect_uri=" + origin() + "/auth.html";
	},
	
	hello : function ()
	{
		window.location = "/";
	},
	
	hasToken : function ()
	{
		// Authentication
		var token = window.localStorage.getItem('token');
		
		if(token && token.length > 9) this.hello();
		else	
		{
			if(token) window.localStorage.removeItem('token');
					
			this.setloginwindow ();
			window.addEventListener("message", this.receiveToken.bind(this), false);	
		}
	},
	
	receiveToken :function (event)
	{
		if (event.origin !== origin())
		return;
		
		if (event.data && event.data.length > 9)
		{
			window.localStorage.setItem('token', event.data);
			this.hello();
		}
		else this.setloginwindow();
	}
});
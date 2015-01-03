<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Cloudwalkers Team</title>
		
		<link rel="shortcut icon" href="https://devplatform.cloudwalkers.be/favicon.ico"/>
		
		<!-- Bootstrap -->
		<link href="/docs/css/bootstrap.min.css" rel="stylesheet">
		<link href="/docs/css/bootstrap-theme.min.css" rel="stylesheet">
		<link href="https://cdn.jsdelivr.net/fontawesome/4.0.3/css/font-awesome.min.css" rel="stylesheet">
		
		
		<link href="/docs/css/theme.css" rel="stylesheet">
		
		<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
		<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
		<![endif]-->
	</head>
	<body >

	<div class="container">

		<h1>Source code</h1>

		<p>Our source code is stored on GitHub.</p>

		<h2>Authentication</h2>
		<p>It is preferred to use SSH authentication on GitHub.</p>
		<p>Go to <a href="https://github.com/settings/ssh">https://github.com/settings/ssh</a> and link your private key to your account.</p>

		<p>(More information: <a href="https://help.github.com/articles/generating-ssh-keys">generate ssh keys</a> and <a href="https://help.github.com/categories/56/articles">general ssh troubleshooting</a>.)</p>

		<h2>Old structure</h2>
		<ul>
			<li><strong>Engine</strong> (api, workers, everything ...)<br /><a href="git@github.com:Cloudwalkers/engine.git">git@github.com:Cloudwalkers/engine.git</a></li>
			<li><strong>Platform</strong> (html5 frontend, php proxy with server side oauth1 client)<br /><a href="git@github.com:Cloudwalkers/platform.git">git@github.com:Cloudwalkers/platform.git</a></li>
		</ul>

		<h2>New structure</h2>
		<p>In the new structure, the API and engine are split up.</p>
		<ul>
			<li><strong>API</strong> (authentication, router, ...) <br /><a href="git@github.com:Cloudwalkers/api.git">git@github.com:Cloudwalkers/api.git</a></li>
			<li><strong>Engine</strong> (workers, blm) <br /><a href="git@github.com:Cloudwalkers/engine.git">git@github.com:Cloudwalkers/engine.git</a></li>
			<li><strong>Platform</strong> (html5 frontend with client side oauth2 client) <br /><a href="git@github.com:Cloudwalkers/platform.git">git@github.com:Cloudwalkers/platform.git</a></li>
		</ul>

		<h2>Branches</h2>
		<p>There are 2 main branches that trigger server deployment:</p>
		<ul>
			<li>
				The <strong>master</strong> branch is the version of the code that runs on <a href="https://devapi.cloudwalkers.be/">https://devapi.cloudwalkers.be/</a> and <a href="https://devplatform.cloudwalkers.be/">https://devplatform.cloudwalkers.be/</a>. Every time a commit is made, the commit is pushed to these servers.
			</li>

			<li>
				The <strong>staging</strong> branch(es) are the versions that will be used for testing. The goal is to have up to 4 staging branches. These will all run on their own domain name.
			</li>

			<li>
				The <strong>stable</strong> branch contains the production version of the code. Pushes to this branch will be uploaded to <a href="https://api.cloudwalkers.be/">https://api.cloudwalkers.be/</a> and <a href="https://platform.cloudwalkers.be/">https://platform.cloudwalkers.be/</a>. Every time a commit is made, the commit is pushed to these servers. <br /><strong>This code is in production! Please do not push to this branch unless you know what you are doing.</strong>
			</li>
		</ul>

		<h2>Configuration files</h2>
		<p>Each version has its own config file which is not stored in Git.</p>
		<ul>
			<li>
				In <strong>engine</strong>, the configuration is stored in php/config/constants/mutable-local.php. If this file is not defined, mutable.php will be used as a fallback. In case mutable-local.php misses some parameters, <strong>defaults.php</strong> kicks in and fills in the missing settings.
			</li>

			<li>
				In <strong>platform</strong>, the configuration is stored in php/config/db-local.php. The same story as above applies: if db-local.php is not defined, db.php will be used.
			</li>
		</ul>
		<p>All "local" configuration files are also stored in a repository. This repository (cloudwalkers/config.git) ONLY contains mutable-local.php and db-local.php for development, staging and production. When a new server is added to our deployment system, it is therefor important to also add the server to this project.</p>

		<h1>Server deployment</h1>
		<p>We are using a service called <a href="https://bmgroup.dploy.io/">dploy.io</a> to push code automatically to our servers.</p>
<p>Credentials:</p>
<pre>
Username: bmgroup
Email: thijs@bmgroup.be
Password: --request from thijs--
</pre>

		<h1>Setting up a new server</h1>
		<h2>Checklist for Engine/workers</h2>
		<ol class="checklist">

			<li>Install apache, php5 and all required extensions. (to be defined)</li>
			<li>Create a user that will be used to deploy the code. (Can be FTP or SSH)</li>
			<li>In <a href="https://bmgroup.dploy.io/">dploy.io</a>, go to the <a href="https://bmgroup.dploy.io/4777-Engine">Engine repository</a>, select which environment the new server should run (<a href="https://bmgroup.dploy.io/4777-Engine/environments/5054-development/edit">Development</a>, <a href="https://bmgroup.dploy.io/4777-Engine/environments/5492-staging/edit">Staging</a> or <a href="https://bmgroup.dploy.io/4777-Engine/environments/5494-Production/edit">Production</a>) and click "Servers & Settings"</li>
			<li>In the "Servers Configuration" pane, there is a button "Add Server". Click it, fill out credentials, install path, etc. <strong>Ideally, use SFTP as protocol and public key authentication.</strong> (Click "Learn about public key authentication" to learn more about this.)</li>
			<li>Now deploy the source code by clicking "Deploy" on the overview page. You will need to review the deployment. Your new server will be the only one with thousands and thousands of commits. Start the process.</li>
			<li>Time for configuration. Go to the <a href="https://bmgroup.dploy.io/5135-Config">Config</a> repository and select the corresponding environment. Follow the same instructions as above to add the server to config deploy list as well.</li>
			<li>Deploy the config files in the same way as you've deployed the source code.</li>

		</ol>

		<h3>For worker machines</h3>
		<p>(I still need to figure out the best way to configure GearmanManager, so please complete this in when you do this.)</p>
		<ol>
			<li>For a worker server, you're almost done. First, make sure you have GearmanManager installed. Follow the install instructions at <a href="https://github.com/brianlmoon/GearmanManager">GitHub</a></li>
			<li>Configure GearmanManager so that it connects to
				<ul>
					<li><strong>gearman.cloudwalkers.be</strong> (for stable)</li>
					<li><strong>staging-gearman.cloudwalkers.be</strong> (for staging)</li>
					<li><strong>dev-gearman.cloudwalkers.be</strong> (for development)</li>
				</ul>
			</li>

			<li>Configure gearman so that it uses the config file /gearmanmanager.ini</li>
			<li>Start gearman manager</li>
		</ol>

		<h3>For APIs</h3>
		<p>To be continued.</p>
		<ul>
			<li>
				Make sure gearman.cloudwalkers.be points to a gearmand server that is running somewhere.
			</li>

			<li>
				Install the cronjobs (and make sure the output is emailed to an accessable account).
			</li>

			<li>
				Make sure that you stop and disable all cronjobs on the old server.
			</li>
		</ul>

		<h3>For Platform</h3>
		<p>To be continued.</p>
		
		<h3>Gearman</h3>
		<p>Instructions on how to install gearman: <a href="http://www.usamurai.com/2013/05/01/install-gearman-from-source-in-centos/">http://www.usamurai.com/2013/05/01/install-gearman-from-source-in-centos/</a></p>

	</div>

	<!-- Bootstrap core JavaScript
	================================================== -->
	<!-- Placed at the end of the document so the pages load faster -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	</body>
</html>
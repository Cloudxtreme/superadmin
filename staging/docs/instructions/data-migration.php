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

	<h1>Migration</h1>
	<p>In some cases it might be required to convert old data structures into new data structures. In those cases, following precautions must be taken in mind:</p>
	<p>There are some situations where data migration can be handled in MySQL itself, but for most cases it's better to write a small php script that handles the migration process. This also allows to preview your changes before you execute them.</p>

	<h2>Precaution</h2>
	<p>Before you start on a data migration script, always take following precautions in mind:</p>
	<ol>
		<li>First create a backup of your local database. This will allow you to run the same migration script a couple of times, in case you make a mistake.</li>
		<li>First start by writing a read-only migration script and store it in scripts/migrations/*.php. Load the records you want to change and output what you are going to change in them.</li>
		<li>If your read only preview shows the correct changes, write mysql queries to execute these changes. <strong>DO NOT EXECUTE THE QUERIES YET!</strong></li>
		<li>Print the queries (with <samp>Logger::getInstance ()->log ($query);</samp> to your command line / webpage view.</li>
		<li>Run the script, check if the data is correct.</li>
		<li>Add a $_GET parameter check to allow setting the script in "write mode". Execute the migration script <strong>on your local device</strong>! Check if the data is correct. If the data is not correct, restore your database and go to step 3.</li>
		<li>Disable the write/update queries again. Push to master branch. Ask a colleague to run the script and verify the results.</li>
		<li>If the results look okay, ask a colleague to run the script in write mode. Verify results together.</li>
		<li>Everything okay? Great. Execute the script on the development server.</li>
		<li>Still everything okay? Even more great! Make sure the head developers know they have to execute the migration script on next release.</li>
	</ol>

	<h2>Example migration script</h2>
	<pre><?php
		$dirname = dirname (dirname (dirname (__FILE__))) . '/scripts/migrations/example.phps';
		echo htmlentities (file_get_contents ($dirname));
	?></pre>



</div>

<!-- Bootstrap core JavaScript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="js/bootstrap.min.js"></script>
</body>
</html>
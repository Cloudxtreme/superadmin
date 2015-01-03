<?php

/**
 *	Paths
 */
$kenpath = '/webroot/cloudwalkers/little-ken';
$npmpath = '/usr/local/bin';


/**
 *	Don't forget to check the explicit paths in passthru() here
 *	and in the package.json in little-ken
 *
 *	@return string
 */
echo passthru ('cd ' . $kenpath . '; ' . $npmpath . '/npm run-script mochalight', $status);


// Something wrong? Check the status
// echo $status . "..";
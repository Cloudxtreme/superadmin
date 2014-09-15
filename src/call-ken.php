<?php
/**
 *	Don't forget to check the explicit paths in passthru() here
 *	and in the package.json in little-ken
 *
 *	@return string
 */
echo passthru ('cd /webroot/cloudwalkers/little-ken; /usr/local/bin/npm run-script mochalight', $status);

// Something wrong? Check the status
// echo $status . "..";
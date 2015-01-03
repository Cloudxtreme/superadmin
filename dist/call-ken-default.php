<?php
/**
 *	Don't forget to check the explicit paths in passthru() here
 *	and in the package.json in little-ken
 *
 *	@return string
 */
echo passthru ('cd /path/to/little-ken; /which/path/to/npm run-script mochacreamy|mochalight', $status);

// Something wrong? Check the status
// echo $status . "..";
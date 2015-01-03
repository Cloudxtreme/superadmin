<?php
$scandir = scandir ('.');

echo '<h1>Instructions</h1>';
echo '<ul>';
foreach ($scandir as $v)
{
	if (substr ($v, 0, 1) == '.')
		continue;

	if ($v == 'index.php')
		continue;

	echo '<li><a href="' . $v . '">' . $v . '</a></li>';
}
echo '</ul>';
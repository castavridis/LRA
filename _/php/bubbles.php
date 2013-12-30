<?php
	header('Content-Type: application/json');

	$link = mysqli_connect('localhost', 'root', 'root', 'LRA');
	if (mysqli_connect_errno()) {
	 	echo "Failed to connect to MySQL: " . mysqli_connect_error();
	 }

	$sql = "SELECT ID, X, Y, LANDAREA \n"
			. "FROM bubbles";
	$result = mysqli_query($link, $sql );

	$data = array();
	while($row = mysqli_fetch_array($result)) {
		$data[] = array(
			'id' => $row[0],
			'x' => $row[1],
			'y' => $row[2],
			'landarea' => $row[3]
		);
	}

	print json_encode($data);
?>
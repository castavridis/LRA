<?php
	header('Content-Type: application/json');

	$link = mysqli_connect('localhost', 'root', 'root', 'LRA');
	if (mysqli_connect_errno()) {
	 	echo "Failed to connect to MySQL: " . mysqli_connect_error();
	 }

	$sql = "SELECT ID, WKT, HANDLE, PARCELID \n"
			. "FROM parcel_shapes";
	$result = mysqli_query($link, $sql );

	$data = array();
	while($row = mysqli_fetch_array($result)) {
		$data[] = array(
			'id' => $row[0],
			'polygon' => $row[1],
			'handle' => $row[2],
			'parcel_id' => $row[3]
		);
	}

	print json_encode($data);
?>
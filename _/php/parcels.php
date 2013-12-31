<?php
	header('Content-Type: application/json');

	$link = mysqli_connect('localhost', 'root', 'root', 'LRA');
	if (mysqli_connect_errno()) {
	 	echo "Failed to connect to MySQL: " . mysqli_connect_error();
	 }


	//Check if handle_id isset
	if (isset($_GET['handle_id'])) {
		//Select data from parcels with handle_id
		$handle_id = $_GET['handle_id'];
		$sql =	"SELECT ADDRESS\n"
			. "FROM parcels\n"
			. "WHERE (HANDLE = " . $handle_id . ")";
		$result = mysqli_query($link, $sql);

		$data = array();
		while ($row = mysqli_fetch_array($result)) {
			$data[] = array(
				'address' => $row[0],
				'handle_id' => $handle_id
			);
		}
	}  else {
		//If not set, get all parcel shapes and join with parcel:
		$sql = "SELECT parcel_shapes.ID, parcel_shapes.WKT, parcel_shapes.HANDLE, parcel_shapes.PARCELID, parcels.USE_TYPE\n"
			. "FROM parcel_shapes\n"
			. "INNER JOIN parcels\n"
			. "ON parcels.HANDLE = parcel_shapes.HANDLE";
		$result = mysqli_query($link, $sql );

		$data = array();
		while($row = mysqli_fetch_array($result)) {
			$data[] = array(
				'id' => $row[0],
				'polygon' => $row[1],
				'handle' => $row[2],
				'parcel_id' => $row[3],
				'use_type' => $row[4]
			);
		}
	}

	print json_encode($data);
	mysql_close($link);
?>
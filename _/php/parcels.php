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
				'address' => $row[0]
			);
		}
	}  else {
		//If not set, get all parcel shapes:
		$sql = "SELECT ID, WKT, HANDLE, PARCELID\n"
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
	}

	print json_encode($data);
	mysql_close($link);
?>
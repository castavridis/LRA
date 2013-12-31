/**
  	BASIC FUNCTIONALITY
	-----------------------------------
	- Make map with custom CRS
	- Load CSV data for land plot polygons
	- Load CSV data for land circles
	- Load CSV marker data on hover
	- Color code CSV data based on use
 */

/* CONSTANTS ***************************/
var TILE_JSON = "http://a.tiles.mapbox.com/v1/castavridis.ghee5le5.json"; //TMS Tile system.
var 	map, 
	totalArea = 0;

$(document).ready(function(){
	//NOTE: Need custom CRS?

	//Instantiate map
	map = L.mapbox.map('map-view',TILE_JSON, {
		minZoom:12,
		maxZoom:17,
		maxBounds:[[38.5322,-90.4188],[38.7425,-90.0728]]
	});

	//Add parcel features
	getParcels();

	//Add bubble features
	getBubbles();

	//Apply percentage calculated events
	map.on('zoomend', markersInView);
	map.on('drag', markersInView);
	map.on('moveend', markersInView);

	// disable zoom handlers
	map.touchZoom.disable();
	map.doubleClickZoom.disable();
	map.scrollWheelZoom.disable();

	// disable tap handler, if present.
	if (map.tap) map.tap.disable();

	$('.dev').on('click', function(){
		$('#objectives-view').toggle();
	});

});

function markersInView(){
	var viewableArea = 0;

	$.get('_/php/parcels.php', function(data){
		//Get map bounds
		var bounds = map.getBounds();

		for (var i = data.length - 1; i >= 0; i--) {
			var parcel = data[i],
			polygon = parcel['polygon'];

			//Parse polygon string
			polygon = polygon.replace("POLYGON ((","").replace("))","");
			var polyArr = polygon.split(',');
			var coordArr = [];

			for (var j = 0; j < polyArr.length; j++) {
				var coordinates = polyArr[j].replace("(", "").replace(")", "").split(" ");
				var x = coordinates[1];
				var y = coordinates[0];

				coordArr.push(L.latLng(x, y));	
			}

			//Check make bound to test
			var bound = L.polyline(coordArr, {}).getBounds();

			//If is viewable, get area
			if (bounds.contains(bound)){
				for (var k = 0; k < coordArr.length - 1; k++) {
					//NOTE: Use better checking like bounds.contains()
					x = coordArr[k].lat;
					y = coordArr[k].lng;

					//If x is out of bounds, adjust x
					if (x > bounds._northEast.lat) { 
						x = bounds._northEast.lat;
					} else if(x < bounds._southWest.lat) {
						x = bounds._southWest.lat;
					}
					//If y is out of bounds, adjust y
					if (y > bounds._northEast.lng) {
						y = bounds._northEast.lng;
					} else if (y > bounds._southWest.lng) {
						y = bound._southWest.lng;
					}
				}

				viewableArea += polygonArea(coordArr);
			}
		}

		percentInView(viewableArea);
	});
}

function percentInView(viewableArea) {
	document.getElementById('percent').innerHTML = Math.min(100, Math.round(((viewableArea/totalArea + 0.01) * 100) * 100)/100);
}

function getBubbles() {
	$.get('_/php/bubbles.php', function(data){
		//Add feature group to map.
		var featureGroup = L.featureGroup().addTo(map);
		
		var circle_options = {
			stroke: false,
			fillColor: '#F90', 
			fillOpacity: 0.125
		  };

		for (var i = data.length - 1; i >= 0; i--) {
			var bubble = data[i],
				id = bubble['id'],
				x = bubble['x'],
				y = bubble['y'],
				a = 100;//bubble['landarea']/100;

			L.circle([y, x], a, circle_options).addTo(featureGroup);
		};
	});
}

function getParcels() {
	$.get('_/php/parcels.php', function(data){
		
		//Add feature group to map.
		var featureGroup = L.featureGroup().addTo(map);
		var poly_options = {
			stroke: false,
			fillColor: '#F0F', 
			fillOpacity: 0.5,
			smoothFactor:0,
			showArea:true
		  };

		for (var i = data.length - 1; i >= 0; i--) {
			var parcel = data[i],
				id = parcel['id'],
				polygon = parcel['polygon'],
				handle = parcel['handle'],
				parcel_id= parcel['parcel_id'];

			//Parse polygon string
			polygon = polygon.replace("POLYGON ((","").replace("))","");
			var polyArr = polygon.split(',');
			var coordArr = [];

			for (var j = 0; j < polyArr.length; j++) {
				var coordinates = polyArr[j].replace("(", "").replace(")", "").split(" ");
				var x = coordinates[1];
				var y = coordinates[0];
				coordArr.push(L.latLng(x, y));	
			}

			//Set id as className
			poly_options["className"] = "poly_" + handle;

			//Add to total area
			totalArea += polygonArea(coordArr);
			L.polygon(coordArr, poly_options).addTo(featureGroup).on('mouseover', function(){
				var handle = this.options.className.replace("poly_", "");
				$.get('_/php/parcels.php?handle_id='+handle, function(data) {
					console.log(data[0]['address']);
				});
			});
		}

		markersInView();
	});
}

/*
	Based on: http://www.mathopenref.com/coordpolygonarea2.html
 */
function polygonArea(points) {
	var 	area = 0,
		j = points.length - 1;

	for (var i = 0; i<points.length; i++) {
		var 	currPoint = points[i],
			lastPoint = points[j];

		area = area + (Math.abs(currPoint.lat) + Math.abs(lastPoint.lat)) * (Math.abs(currPoint.lng) + Math.abs(lastPoint.lng));
		j = i;
	}

	return area/2;
}
/**
  	BASIC FUNCTIONALITY
	-----------------------------------
	- Make map with custom CRS
	- Load CSV data for land plot polygons
	- Load CSV data for land circles
	- Load CSV marker data on hover
	- Color code CSV data based on use
 */

// var tileJSON = $.get('http://api.tiles.mapbox.com/v1/castavridis.ghee5le5');

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

	//Add bubble features
	getBubbles();

	//Add parcel features
	getParcels();
});

var viewableArea;
function percentInView(){
	viewableArea = 0;

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

				//TODO: If x is out of bounds, adjust x
				//TODO: If y is out of bounds, adjust y
				
				coordArr.push(L.latLng(x, y));	
			}

			//Check if bound is in view
			var bound = L.polyline(coordArr, {}).getBounds();

			//If is viewable, get area
			if (bounds.contains(bound)){
				viewableArea += polygonArea(coordArr);
			}
		};
	});

	return viewableArea/totalArea * 100;
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
			fillColor: '#09F', 
			fillOpacity: 0.25,
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

			//Add to total area
			totalArea += polygonArea(coordArr);

			L.polygon(coordArr, poly_options).addTo(featureGroup);
		};
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
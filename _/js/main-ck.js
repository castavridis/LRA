/**
  	BASIC FUNCTIONALITY
	-----------------------------------
	- Make map with custom CRS
	- Load CSV data for land plot polygons
	- Load CSV data for land circles
	- Load CSV marker data on hover
	- Color code CSV data based on use
 */// var tileJSON = $.get('http://api.tiles.mapbox.com/v1/castavridis.ghee5le5');
/* CONSTANTS ***************************/var TILE_JSON="http://a.tiles.mapbox.com/v1/castavridis.ghee5le5.json",map=L.mapbox.map("map-view",TILE_JSON,{minZoom:12,maxZoom:17,maxBounds:[[38.5322,-90.4188],[38.7425,-90.0728]]});$.get("_/php/bubbles.php",function(e){var t=L.featureGroup().addTo(map),n={stroke:!1,fillColor:"#000",fillOpacity:.25};for(var r=e.length-1;r>=0;r--){var i=e[r],s=i.id,o=i.x,u=i.y,a=75;L.circle([u,o],a,n).addTo(t)}});
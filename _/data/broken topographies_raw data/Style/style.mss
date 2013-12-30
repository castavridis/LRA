#parcel {
  line-color:#ffffff;
  line-width:0.0;
  polygon-opacity:0;
  polygon-fill:#ffffff;
  [zoom = 17] {line-width:1}
  [zoom = 18] {line-width:1}
  [zoom >= 19] {line-width:1.25}
  [zoom = 17] {polygon-opacity:0.55;}
  [zoom = 18] {polygon-opacity:0.60;}
  [zoom = 19] {polygon-opacity:0.65;}
  [zoom >= 20] {polygon-opacity:0.85;}
  [zoom >= 20] {
  text-name:"[ADDRESS]";
  text-face-name:"Helvetica Bold";
  text-allow-overlap:false;
  text-fill:#ffffff;
  text-character-spacing:0.2;
  text-wrap-width:1;  
  text-size:10;
// This is the parcel version of the data
}}

#parcel {
  [USAGE = 'vacant lot'] {polygon-fill:#40e9e7;} 
  [USAGE = 'residential'] {polygon-fill:#fd794d;}

  }

#bubble {
  marker-width:6;
  marker-fill:#ffffff;
  marker-line-color:#ffffff;
  marker-line-opacity:0.1;  
  marker-allow-overlap:true;
  marker-opacity:0.05;
  [zoom <= 12] { marker-opacity:0.01;}  
  [zoom = 13] { marker-opacity:0.04;}  
  [zoom = 14] { marker-opacity:0.06;}
  [zoom = 15] { marker-opacity:0.12;}
  [zoom = 16] { marker-opacity:0.14;}
  [zoom >= 17] { marker-opacity:0;}
  [LOT_SQFT <= 2300] {marker-width:4;}  
  [LOT_SQFT >= 3600] {marker-width:8;}
  [LOT_SQFT >= 4000] {marker-width:16;}  
  [LOT_SQFT >= 4700] {marker-width:24;}
  [LOT_SQFT >= 5700] {marker-width:32;}
  [LOT_SQFT >= 7000] {marker-width:40;}
  [LOT_SQFT >= 12000] {marker-width:48;}
  //This is the artsy bubble version
}

#bubble {
  [USAGE = 'vacant lot'] {marker-fill:#40e9e7;} 
  [USAGE = 'residential'] {marker-fill:#fd794d;}
}

#bubble {
  [Y <=38.63900] [zoom >= 12] { marker-opacity:0.03;}
  [Y <=38.63900] [zoom >= 13] { marker-opacity:0.06;}
  [Y <=38.63900] [zoom >= 14] { marker-opacity:0.08;}
  [Y <=38.63900] [zoom >= 15] { marker-opacity:0.14;} 
  [Y <=38.63900] [zoom >= 16] { marker-opacity:0.16;}
  [Y <=38.63900] [zoom >= 17] { marker-opacity:0.0;}
  //So South City is visible
}

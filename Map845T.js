define(["https://api.tiles.mapbox.com/mapbox-gl-js/v1.2.0/mapbox-gl.js", "jquery", "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v2.2.0/mapbox-gl-geocoder.min.js","https://api.tiles.mapbox.com/mapbox.js/plugins/turf/v3.0.11/turf.min.js","https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.0.9/mapbox-gl-draw.js", "https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.2.1.min.js", "https://code.jquery.com/ui/1.12.1/jquery-ui.min.js","text! https://cdn.jsdelivr.net/gh/Xdev9/Geospatial/Mapbox_12.css"], function(mapboxgl, jQuery, MapboxGeocoder, turf, MapboxDraw, slider1, slider2, Info) {
    "use strict";
    var map = '',
        bounds = '',
        geojsonFeature = {};
     var earth = 'none';	
     var radar = 'none';
     var MyStyle = 'light-v9'
     var property = 'visible';
     var lightning = 'none';
     var hurricane = 'none';
     var hazardous = 'none';
     var earth_h = 'none';
     var tornadoes = 'none';
     var claims = 'none';
     var claim_info = '';
	 var earthquake_h = 'none';	
	 var total_paid = 0;
     var wildfire_p = 'none';
     var corona = 'none';
     var year_built = ' ' ;
	 var street = ' ';
	 var Num_of_Employees = 0;
	 var Sqft = 0;

    function BasicControl() {};

    BasicControl.prototype.initialize = function(oControlHost, fnDoneInitializing, oDataStore) {

      
    

	document.getElementById("v41_ValueComboBox").addEventListener("change", myFunction2);

    function myFunction2() {

	 var visibility = map.getLayoutProperty('points', 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty('points', 'visibility', 'none');
			//document.getElementById("v42_ValueComboBox").style.backgroundColor = '#9BA3A5';

        } else {

            map.setLayoutProperty('points', 'visibility', 'visible');
			//document.getElementById("v42_ValueComboBox").style.backgroundColor = '#EFE013';
        }
    //map.setLayoutProperty('points', 'visibility', 'visible');

	}
	

    document.getElementById("v141_ValueComboBox").addEventListener("change", myFunction11);

    function myFunction11() {

	 var visibility = map.getLayoutProperty('corona_all','visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty('corona_all', 'visibility', 'none');
			

        } else {

            map.setLayoutProperty('corona_all', 'visibility', 'visible');
			
        }

	}

		jQuery("head link[rel='stylesheet']").last().after("<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v1.2.0/mapbox-gl.css' rel='stylesheet' />");
		jQuery("head link[rel='stylesheet']").last().after("<link href='https://code.jquery.com/ui/1.10.2/themes/smoothness/jquery-ui.css' />");
	    jQuery("body").after("<link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v2.2.0/mapbox-gl-geocoder.css' type='text/css' />");
        jQuery("body").prepend("<link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.0.9/mapbox-gl-draw.css' type='text/css'/>");
        jQuery("tbody").after("<link rel='stylesheet' href='https://cdn.jsdelivr.net/gh/Xdev9/Geospatial/Mapbox_13.css' rel='stylesheet' />");
		jQuery("head link[rel='stylesheet']").last().after("<link href='https://cdn.jsdelivr.net/gh/Xdev9/Geospatial/Mapbox_13.css' type='text/css' />");		

        //jQuery("td style").prepend("<div id='map'></div><div class='calculation-box'><p>Draw a polygon using the draw tools.</p><div id='calculated-area'></div></div>");
	    var mapContainer = oControlHost.container.id;

        //*** Step 2a make some minor adjustments to default map */
        mapboxgl.accessToken = 'pk.eyJ1IjoiZnhoYXdrIiwiYSI6ImNqaDZqYmVsajFwb3kycWs0dzM5aDFxbXgifQ.DcqavEFQJWPJ8eUAGLbK_A'; //Make sure to add Map Token Key
        map = new mapboxgl.Map({
            container: mapContainer,
            style: 'mapbox://styles/mapbox/light-v9',
            center: [-.165748, 51.507], //Center Map
            zoom: 5, //Change Default Zoom
            interactive: true //Set Interactive to true
        });

        //Set up the Bounds variable
        bounds = new mapboxgl.LngLatBounds();

        //Tell Cognos that we are done initializing 
        fnDoneInitializing();

    };

    BasicControl.prototype.draw = function(oControlHost) {

        console.log('3. Draw ******************')

        var oPage = oControlHost.page;
		jQuery( 'body .mapboxgl-control-container').append('<div id=' + 'console' + '>' +  '<div>' + '<div class=' + 'session' + ' ' +  'id=' + 'sliderbar' + ' ' + '>' + ' ' + '<p>' + '<font color=' + "yellow" + '>' + 'Historical - Year: ' + '<label id=' + 'active-Year' + '>' + '2013' + '</label>' + '</font>' +
	    '<input id=' + 'slider' + ' ' + 'class=' +'row' + ' ' + 'type=' + 'range' + ' ' + 'min=' + '2013' + ' ' + 'max='+ '2019' + ' ' +  'step=' + '1' + ' ' + 'value=' + '2013'  + '/>' + '</p>' + '</div>');
		jQuery('body .mapboxgl-control-container').append('<div class=' + 'calculation-box' + '>' + '<p>' + 'Create boundaries with the draw tool to select markers' + '</p>' + '<div id=' + 'calculated-area' + '>' + '</div>');

var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson';
map.on('load', function ()  {

    map.addSource('earthquakes',{
	 	type: 'geojson',
		data: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'
		});
   map.addLayer({
 "id": "Earthquakes-last 30days",
 "type": "circle",
 "source": "earthquakes",
 "layout": {
                "visibility": earth
            },
 "paint": {
 "circle-color": "#f00", 
 "circle-radius": {
 "property": "mag",
 "base": 1.8,
 "stops": [
 [{zoom: 0, value: 2}, 2],
 [{zoom: 0, value: 8}, 15],
 [{zoom: 11, value: 2}, 20],
 [{zoom: 11, value: 8}, 900],
 [{zoom: 20, value: 2}, 40],
 [{zoom: 20, value: 8}, 2250]
 ],

 }, "circle-opacity": 0.7
 }
 });
});

 map.on('click', function(e) {   

  var features = map.queryRenderedFeatures(e.point, {
    layers: ['Earthquakes-last 30days'] // replace this with the name of the layer
  });

  if (!features.length) {
    return;
  }

 var feature = features[0];
 var Day = new Date(feature.properties.time);
 var Day1 = Day.toUTCString();

  var popup = new mapboxgl.Popup({ offset: [0, -15] })
    .setLngLat(feature.geometry.coordinates)
    .setHTML('<h3>' + feature.properties.place + '</h3><p>' + 'Magnitude: ' + feature.properties.mag + '<br>' + 'Date: ' + Day1 + '<br>' + 'source: http://earthquake.usgs.gov/earthquakes' + '</p>')
    .setLngLat(feature.geometry.coordinates)
    .addTo(map);

});
// Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'Earthquakes-last 30days', function () {
        map.getCanvas().style.cursor = 'pointer';
    });	  	    

  // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'Earthquakes-last 30days', function () {
        map.getCanvas().style.cursor = '';
    });

map.on('load', function() {
    var frameCount = 1;
    for (var i = 0; i < frameCount; i++) {
    var revi= frameCount-i;
    var t = new Date();
    var d = t.getTime();
    var newD=d-60*1000*revi*30;
    var datetext = new Date(newD);
    var newDiso=datetext.toISOString();
    var timeBlock = newDiso;
    map.addLayer({
        'id': 'Radar-Today',
        'type': 'raster',
        'source': {
        'type': 'raster',
        'tiles': [
'https://nowcoast.noaa.gov/arcgis/services/nowcoast/radar_meteo_imagery_nexrad_time/MapServer/WmsServer?service=WMS&request=GetMap&version=1.3.0&layers=1&styles=&format=image/png&transparent=true&height=256&width=256&crs=EPSG:3857&bbox={bbox-epsg-3857}&time='+timeBlock
],
        'tileSize': 256
         },
		 'layout': {'visibility': radar},
        'paint': { 'raster-opacity': 1,
            'raster-opacity-transition': {
            duration: 0
         }}
     });
}

}); 

            map.on("load", function() {
            map.addSource("points", {
                "type": "geojson",
                "data": geojsonFeature
            });


            map.addLayer({
                "id": "points",
                "type": "symbol",
                "source": "points",
                "layout": {
                "visibility": claims,
                "text-field": [
                    "to-string",
                    [
                        "get",
                        "name"
                    ]
                ],
                "text-size": 14,
                "icon-image": "town-hall-15",
                "text-anchor": "top-left",
                "icon-size": 1
            },
        "paint": {
                "text-color": "rgb(255,255,255)"
                
            }
            
		});


        });       


 // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'points', function () {
        map.getCanvas().style.cursor = 'pointer';
    });	  	   

  // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'points', function () {
    map.getCanvas().style.cursor = '';
    });     



      map.on('load', function() {
        map.addLayer({
            "id": "Hurricane-Today",
            "type": "raster",
            "minzoom": 0,
            "maxzoom": 22,
            "source": {
                "type": "raster",
                "tiles": ['https://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/wwa_meteocean_tropicalcyclones_trackintensityfcsts_time/MapServer/export?dpi=96&transparent=true&format=png32&layers=show%3A0&bbox={bbox-epsg-3857}&bboxSR=EPSG:3857&imageSR=EPSG:3857&size=256,256&f=image'],
				          // https://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/wwa_meteocean_tropicalcyclones_trackintensityfcsts_time/MapServer/export?dpi=96&transparent=true&format=png8&bbox=-19257827.773674857%2C-287473.82805563323%2C-8679055.928092321%2C8087387.216363874&bboxSR=102100&imageSR=102100&size=768%2C608&f=image
                "tileSize": 256

            },  'layout': {'visibility': hurricane},
        });
    });	    

    map.on('load', function() {
     var frameCount = 1;
     for (var i = 0; i < frameCount; i++) {
     var revi= frameCount-i;
     var t = new Date();
     var d = t.getTime();
     var newD=d-60*1000*revi*30;
     var datetext = new Date(newD);
     var newDiso=datetext.toISOString();
     var timeBlock = newDiso;
     map.addLayer({
        'id': 'Lightning-Today',
        'type': 'raster',
        'source': {
        'type': 'raster',
        'tiles': [
        'https://nowcoast.noaa.gov/arcgis/services/nowcoast/sat_meteo_emulated_imagery_lightningstrikedensity_goes_time/MapServer/WmsServer?service=WMS&request=GetMap&version=1.3.0&layers=1&styles=&format=image/png&transparent=true&height=256&width=256&crs=EPSG:3857&bbox={bbox-epsg-3857}&time='+timeBlock
],
        'tileSize': 256
         },
		 'layout': {'visibility': lightning},
        'paint': { 'raster-opacity': 1,
            'raster-opacity-transition': {
            duration: 0
         }}
     });
}

}); 

 map.on('load', function() {
        map.addLayer({
            "id": "Hazardous Weather - Today",
            "type": "raster",
            "minzoom": 0,
            "maxzoom": 22,
            "source": {
                "type": "raster",
                "tiles": ['https://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/wwa_meteoceanhydro_longduration_hazards_time/MapServer/export?dpi=96&transparent=true&format=png32&layers=show%3A0&bbox={bbox-epsg-3857}&bboxSR=EPSG:3857&imageSR=EPSG:3857&size=256,256&f=image'],
				          // https://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/wwa_meteocean_tropicalcyclones_trackintensityfcsts_time/MapServer/export?dpi=96&transparent=true&format=png8&bbox=-19257827.773674857%2C-287473.82805563323%2C-8679055.928092321%2C8087387.216363874&bboxSR=102100&imageSR=102100&size=768%2C608&f=image
                "tileSize": 256

            },  'layout': {'visibility': hazardous},
        });

    });	
    
     map.on('load', function() {
        map.addLayer({
            "id": "Wildfire",
            "type": "fill",
            "minzoom": 0,
            "maxzoom": 22,
            "source": {
                "type": "geojson",
                "data": 'https://services3.arcgis.com/T4QMspbfLg3qTGWY/arcgis/rest/services/Public_Wildfire_Perimeters_View/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token='
				        

            },  'layout': {'visibility': wildfire_p},
            'paint': {
            'fill-color': 'rgba(247, 12, 12, 0.4)',
            'fill-outline-color': 'rgba(4, 0, 0, 1)'
}
        });
     
     


    });	 

map.on('click', 'Wildfire', function(e) {
var Day = new Date(e.features[0].properties.CreateDate);
var Day1 =  Day.toUTCString();

new mapboxgl.Popup()
.setLngLat(e.lngLat)
.setHTML('<h3>' + 'IncidentName: ' + e.features[0].properties.IncidentName + '</h3><p>' + 'Date: ' + Day1 + '<br>' + 'Acres Affected: ' + Math.round(e.features[0].properties.GISAcres) +  '</p>')
.addTo(map);
});
 
// Change the cursor to a pointer when the mouse is over the states layer.
map.on('mouseenter', 'Wildfire', function() {
map.getCanvas().style.cursor = 'pointer';
});
 
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'Wildfire', function() {
map.getCanvas().style.cursor = '';
});




	    map.on('load', function () {

    map.addSource('torn-9u8vfn', {
        type: 'vector',
        url: 'mapbox://fxhawk.b7tr8njd'
    });
	map.addLayer({
            "id": "Tornados - Historical",
            "type": "line",
            "source": "torn-9u8vfn",
            "source-layer": "torn-9u8vfn",
            "layout": {
                "visibility": tornadoes},
            "paint": {
                "line-color": "hsl(275, 71%, 60%)",
                "line-opacity": 0.67,
                "line-width": 5
            },

		});
		})
	 map.on('load', function () {

    map.addSource('Earthquake.geojson', {
        type: 'vector',
        url: 'mapbox://fxhawk.cjhhzt5rk00hw2xro80s4lgdy-8ybmv'
    });
	map.addLayer({
        'id': 'Earthquake - Historical',
         "type": "circle",
            "source": "Earthquake.geojson",
            "source-layer": "Earthquake.geojson",
            "layout": {
                "visibility": earthquake_h
            },
            "paint": {
 "circle-color": "#f00", 
 "circle-radius": {
 "property": "mag",
 "base": 1.8,
 "stops": [
 [{zoom: 0, value: 4}, 2],
 [{zoom: 0, value: 8}, 15],
 [{zoom: 11, value: 4}, 20],
 [{zoom: 11, value: 8}, 900],
 [{zoom: 20, value: 4}, 40],
 [{zoom: 20, value: 8}, 2250]
 ],

 }, "circle-opacity": 0.7
 }
 });
});

//Popups
map.on('click', function(e) {


  var features = map.queryRenderedFeatures(e.point, {
    layers: ['Earthquake - Historical'] // replace this with the name of the layer
  });

  if (!features.length) {
    return;
  }

  var feature = features[0];

  var popup = new mapboxgl.Popup({ offset: [0, -15] })
    .setLngLat(feature.geometry.coordinates)
    .setHTML('<h3>' + feature.properties.place + '</h3><p>' + 'Magnitude: ' + feature.properties.mag + '<br>' + 'Year: ' + feature.properties.Year + ' Month: ' + feature.properties.Month + ' Day: ' + feature.properties.Day + '</p>')
    .setLngLat(feature.geometry.coordinates)
    .addTo(map);

});

// Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'Earthquake - Historical', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'Earthquake - Historical', function () {
        map.getCanvas().style.cursor = '';
    });

// Corona*************************************************************************************

     map.on('load', function () {

    map.addSource('cv_data_update3', {
        type: 'vector',
        url: 'mapbox://fxhawk.ck7nlvxx8015e2kjy97ysy4w6-96r9e'
    });
	map.addLayer({
        'id': 'corona_all',
         "type": "circle",
            "source": "cv_data_update3",
            "source-layer": "cv_data_update3",
            "layout": {
                "visibility": corona
            },
            "paint": {
 "circle-color": "#f00", 
 "circle-radius": {
 "property": "Confirmed",
 "base": 1.1,
 "stops": [
 [{zoom: 0, value: 1}, 2],
 [{zoom: 0, value: 5000}, 4],
 [{zoom: 11, value: 1}, 20],
 [{zoom: 11, value: 5000}, 225],
 [{zoom: 20, value: 1}, 40],
 [{zoom: 20, value: 5000}, 500]
 ],

 }, "circle-opacity": 0.7
 },
     
			
 //"filter": ["==", "Date",'3/11/20'],
			
 });
		 
});

map.on('click', function(e) {


  var features = map.queryRenderedFeatures(e.point, {
    layers: ['corona_all'] // replace this with the name of the layer
  });

  if (!features.length) {
    return;
  }

  var feature = features[0];

  var popup = new mapboxgl.Popup({ offset: [0, -15] })
    .setLngLat(feature.geometry.coordinates)
    .setHTML('<h3>' + feature.properties.Region + '   ' +  feature.properties.State + '</h3><p>' + 'Date: ' + feature.properties.Date + '<br>' + 'Confirmed: ' + feature.properties.Confirmed + '<br>' + ' Recovered: ' + feature.properties.Recovered + '<br>' + ' Deaths: ' + feature.properties.Deaths + '</p>')
    .setLngLat(feature.geometry.coordinates)
    .addTo(map);

});

// Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'corona_all', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'corona_all', function () {
        map.getCanvas().style.cursor = '';
    });

// Corona*****************************************************************************************


		map.on('load', function () {
    map.addSource('Property_Data', {
        type: 'vector',
        url: 'mapbox://fxhawk.ck7nkd6gr0dsx2nrm0r9yzvtg-2ttsl'
    });
	map.addLayer({
        'id': 'Locations_5',
        'type': 'symbol',
        'source': 'Property_Data',
		'source-layer': 'Property_Data',
		 "layout": {
                "visibility": property,
                "text-field": [
                    "to-string",
                    [
                        "get",
                        "Office"
                    ]
                ],
                "text-size": 12,
			    "icon-image": "town-hall-15",
                "text-anchor": "top-left",
                "icon-size": 1
            },
        "paint": {
                "text-color": "rgb(234, 236, 24)"
                //"icon-opacity": 0.8
            }
            
		});
})

		map.on('click', function(e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['Locations_5'] // replace this with the name of the layer
  });

  if (!features.length) {
    return;
  }

  var feature = features[0];
  var url = 'http://www.ventivtech.com'
  var popup = new mapboxgl.Popup({ offset: [0, -15] })
    .setLngLat(feature.geometry.coordinates)
    .setHTML('<h3>' + feature.properties.Office + '</h3>'  + 'Street: ' +  feature.properties.Street + '<br>' + 'Property Value: ' + feature.properties.Property_Value + '<br>' + 'Sqft:  ' + feature.properties.Sqft   + '<br>' + 'Number of Employees: ' + feature.properties.Num_of_Employees +  '</p>')
    .setLngLat(feature.geometry.coordinates)

    .addTo(map);
});
// Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'Locations_5', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'Locations_5', function () {
        map.getCanvas().style.cursor = '';
    });

	    document.getElementById('slider').addEventListener('input', function(e) {
  var Year = parseInt(e.target.value);
  // update the map

   map.setFilter('Earthquake - Historical', ['==', ['number', ['get','Year']], Year]);
   map.setFilter('Tornados - Historical', ['==', ['number', ['get','yr']], Year]);



  // update text in the UI
  document.getElementById('active-Year').innerText = Year ;
});


	// Add geolocate control to the map.
	var nav = new mapboxgl.GeolocateControl();
	map.addControl(nav, 'bottom-right'); 

	map.addControl(new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
        }));    

        //Zoom and Fit map to points
        geojsonFeature.features.forEach(function(feature) {
            bounds.extend(feature.geometry.coordinates);
        });

        map.fitBounds(bounds, {
            padding: 60

        });

		
    BasicControl.prototype.setData = function(oControlHost, oDataStore) {
        console.log('2 Set Data')
            //Default GeoJSON
        geojsonFeature = {
            "type": "FeatureCollection",
            "features": []
        }

        var iRowCount = oDataStore.rowCount;

        for (var iRow = 0; iRow < iRowCount; iRow++) {

            var feature = {}
            feature['type'] = 'Feature'
            feature['geometry'] = {
                'type': 'Point',
                'coordinates': [parseFloat(oDataStore.getCellValue(iRow, 1)), parseFloat(oDataStore.getCellValue(iRow, 2))],
            }
            feature['properties'] = { 'name': oDataStore.getCellValue(iRow, 0), 'contract_vol': oDataStore.getCellValue(iRow, 18), 'program_type': oDataStore.getCellValue(iRow, 15), 'building_type': oDataStore.getCellValue(iRow, 17),  'street': oDataStore.getCellValue(iRow, 16)  }
	            earth = oDataStore.getCellValue(iRow, 3) 
                radar = oDataStore.getCellValue(iRow, 4)
	            MyStyle = oDataStore.getCellValue(iRow, 5)
                property = oDataStore.getCellValue(iRow, 6)
		        lightning = oDataStore.getCellValue(iRow, 7)
		        hurricane = oDataStore.getCellValue(iRow, 8)
		        hazardous = oDataStore.getCellValue(iRow, 9)
		        earthquake_h = oDataStore.getCellValue(iRow, 10)
		        tornadoes = oDataStore.getCellValue(iRow, 11)
                claims = oDataStore.getCellValue(iRow, 12)
		        corona = oDataStore.getCellValue(iRow, 13)
				wildfire_p = oDataStore.getCellValue(iRow, 14)
			    street = oDataStore.getCellValue(iRow, 16)
			       



            geojsonFeature['features'].push(feature)
            map.setStyle('mapbox://styles/mapbox/' + MyStyle); 
			}

		console.log('test2')
map.on('click', function(e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['points'] // replace this with the name of the layer
  });

  if (!features.length) {
    return;
  }

  var feature = features[0];
  var url = 'http://www.ventivtech.com'
  var popup = new mapboxgl.Popup({ offset: [0, -15] })
    .setLngLat(feature.geometry.coordinates)
    .setHTML('<h3>' + feature.properties.name + '</h3>'  + 'Street: ' +  feature.properties.street + '<br>' + 'Program Type: ' + feature.properties.program_type + '<br>' + 'Building Type:  ' + feature.properties.building_type   + '<br>' + 'Contract Volume ' + feature.properties.contract_vol +  '</p>')
    .setLngLat(feature.geometry.coordinates)

    .addTo(map);
});
// Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'points', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'points', function () {
        map.getCanvas().style.cursor = '';
    });
;




    };


    return BasicControl;
});

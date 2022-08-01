var featureData = document.getElementById('data-display');

//Map init
var map = new ol.Map({
    layers: [
        new ol.layer.Tile({
            source: new ol.source.XYZ({
                attributions:
                    'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
                    'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
                url:
                    'https://server.arcgisonline.com/ArcGIS/rest/services/' +
                    'World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
            })
        })
    ],
    target: 'map',
    controls: ol.control.defaults({
        attributionOptions: {
            collapsible: false
        }
    }),
    view: new ol.View({
        center: ol.proj.fromLonLat([0, 51.35847]),
        zoom: 9

    })
});

//CREATE TILE WMS LAYER
// create WMS source 
var wmsSource = new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/tiger/wms",
    params: {
        LAYERS: "tiger:tiger_roads",
    },
    serverType: "geoserver",
});

//create WMS layer

var wmsLayer = new ol.layer.Tile({
    source: wmsSource,
})

//add layer to the map

map.addLayer(wmsLayer);

//CREATE IMAGE WMS LAYERS
//CERATE VECTOR LAYER FROM GEOJSON

var vectorSource = new ol.source.Vector({
    url: "data/low-carbon-technologies.geojson",
    format: new ol.format.GeoJSON(),
});

var vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    style: new ol.style.Style({
        image: new ol.style.Circle({
            fill: new ol.style.Fill({
                color: 'rgba(152,200,55,0.8)',
            }),
            stroke: new ol.style.Stroke({
                color: '#3366AA',
                width: 1.25
            }),
            radius: 5
        }),
    })
});
map.addLayer(vectorLayer);


//map.on click

map.on('click', function (e) {
    map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
        console.log(feature["N"])
        var category = feature["N"]["primary"]
        featureData.innerHTML = 'Pramary point is:'+ category;
    })
})
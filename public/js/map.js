mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/outdoors-v12',   ////light->light-v11, dark-> dark-v11, satellite-> satellite-streets-v12
    center: listing.geometry.coordinates, // starting position [lng, lat]
    zoom: 9, // starting zoom
});


const marker = new mapboxgl.Marker({
    color: "green",
})
    .setLngLat(listing.geometry.coordinates)   //Listing.geometry.coordinates
    .setPopup(new mapboxgl.Popup().setHTML(`<h4>${listing.title}</h4><p>Exact Location will be provided after booking!</p>`))
    .addTo(map);

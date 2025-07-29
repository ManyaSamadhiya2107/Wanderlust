mapboxgl.accessToken=mapToken;

const map=new mapboxgl.Map({
    container:"map",//container ID
    //choose from Mapbox's core styles or make your own style with Mapbox studio
    style:"mapbox://styles/mapbox/streets-v12",//style URL
    center: listing.geometry.coordinates,//starting position [lng.lat]
    zoom: 10,//starting zoom


});

const marker=new mapboxgl.Marker({color:"red"})
.setLngLat(listing.geometry.coordinates)//Listing.geometry.coordinates
.setPopup(new mapboxgl.Popup({offset: 25}))
.setHTML(`<h4>${listing.location}</h4><p>Exact location provided after booking</p>`)
.addTo(map);
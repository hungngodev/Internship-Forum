mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    
    center: internship.geometry.coordinates, // starting position [lng, lat]
    zoom: 10 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());


new mapboxgl.Marker()
    .setLngLat(internship.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 50 })
            .setHTML(
                `<h3>${internship.title}</h3><p>${internship.location}</p>`
            )
    )
    .addTo(map)


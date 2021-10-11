mapboxgl.accessToken = 'pk.eyJ1IjoiaGFycmlvciIsImEiOiJja3VtYnU5em8wOTQwMm9vYWFpb3U0aW5zIn0.dBuw82dbHFCF_tHU7vqYyA';
const map = new mapboxgl.Map({
    container: 'map',
    center: [2.33635, 48.86095],
    zoom: 15.75, // starting zoom

    style: 'mapbox://styles/harrior/ckumbzmhu8uv918k6eum2gfbw'
});

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker({color: '#171717'})
    .setLngLat([2.3364, 48.86091])
    .addTo(map);

new mapboxgl.Marker({color: '#757575'})
    .setLngLat([2.3333, 48.8602])
    .addTo(map);

new mapboxgl.Marker({color: '#757575'})
    .setLngLat([2.3397, 48.8607])
    .addTo(map);
new mapboxgl.Marker({color: '#757575'})
    .setLngLat([2.3330, 48.8619])
    .addTo(map);
new mapboxgl.Marker({color: '#757575'})
    .setLngLat([2.3365, 48.8625])
    .addTo(map);
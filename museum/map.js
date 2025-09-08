const map = L.map('map');

const blackIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-black.png'
});

const greyIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png'
});

map.setView([48.86091, 2.3364], 17);

L.tileLayer('https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://www.carto.com/">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

L.marker([48.86091, 2.3364], { icon: blackIcon }).addTo(map);
L.marker([48.8602, 2.3333], { icon: greyIcon }).addTo(map);
L.marker([48.8607, 2.3397], { icon: greyIcon }).addTo(map);
L.marker([48.8619, 2.3330], { icon: greyIcon }).addTo(map);
L.marker([48.8625, 2.3365], { icon: greyIcon }).addTo(map);
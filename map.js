var scaleFactor = 50
let tiles = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

// Display the map
let map = new L.Map("map", {
    center: [1.347833, 103.809357], // Center Coordinates 
    zoom: 11, // Zoom Limit
    maxBounds: L.latLngBounds(L.latLng(1.1, 103.5), L.latLng(1.5, 104.3))
})
    .addLayer(tiles); // Add the tiles

// Retrieve the data
fetch("https://api.data.gov.sg/v1/environment/psi")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        westLocData = data.region_metadata[0].label_location
        eastLocData = data.region_metadata[2].label_location
        centralLocData = data.region_metadata[3].label_location
        southLocData = data.region_metadata[4].label_location
        northLocData = data.region_metadata[5].label_location

        psiData = data.items[0].readings.psi_twenty_four_hourly;
        updatedTimestamp = data.items[0].update_timestamp;

        // Bind Markers 
        L.circle([westLocData.latitude, westLocData.longitude], psiData.west * scaleFactor).addTo(map)
            .bindPopup("PSI Reading of : " + String(psiData.west));

        L.circle([eastLocData.latitude, eastLocData.longitude], psiData.east * scaleFactor).addTo(map)
            .bindPopup("PSI Reading of : " + String(psiData.east));

        L.circle([centralLocData.latitude, centralLocData.longitude], psiData.central * scaleFactor).addTo(map)
            .bindPopup("PSI Reading of : " + String(psiData.central));

        L.circle([southLocData.latitude, southLocData.longitude], psiData.south * scaleFactor).addTo(map)
            .bindPopup("PSI Reading of : " + String(psiData.south));

        L.circle([northLocData.latitude, northLocData.longitude], psiData.north * scaleFactor).addTo(map)
            .bindPopup("PSI Reading of : " + String(psiData.north));

        // Format datetime
        var formattedDateTime = moment(updatedTimestamp).format('Do MMMM YYYY, h:mm:ss a')

        // Add the updated timing
        document.getElementById("updatedtimestamp").innerHTML = formattedDateTime;
    })
var campus = {
    innovation: { name: "IN", lat: 38.961058, lng: -94.515897, html: document.createElement("table") },
    worldHeadquarters: { name: "WH", lat: 39.150170, lng: -94.545806, html: document.createElement("table") },
    continuous: { name: "CO", lat: 39.114839, lng: -94.814708, html: document.createElement("table") },
    lee: { name: "LE", lat: 38.932148, lng: -94.398410, html: document.createElement("table") },
    realization: { name: "RE", lat: 38.944772, lng: -94.531557, html: document.createElement("table") },
    oaks: { name: "OA", lat: 39.155876, lng: -94.575615, html: document.createElement("table") },
    riverport: { name: "RI", lat: 39.154952, lng: -94.501644, html: document.createElement("table") }
};

var map;
var innovationMarker, worldHeadquartersMarker, continuousMarker, leeMarker, realizationMarker, oaksMarker, riverportMarker

export function initMap() {

    //Center map at Kansas
    var mapProp = {
        center: { lat: 39.09973, lng: -94.57857 },
        zoom: 10,
    };

    //Initialize map
    map = new google.maps.Map(document.getElementById("google-map-card"), mapProp);

    //Set markers to all campuses
    setMarkers()
}

//Function setMarkers sets the markers to the different campuses on the map
function setMarkers() {
    innovationMarker = { marker: new google.maps.Marker({ position: campus.innovation, map: map, label: campus.innovation.name }), infoWindow: new google.maps.InfoWindow({ content: campus.innovation.html }) };
    worldHeadquartersMarker = { marker: new google.maps.Marker({ position: campus.worldHeadquarters, map: map, label: campus.worldHeadquarters.name }), infoWindow: new google.maps.InfoWindow({ content: campus.worldHeadquarters.html }) };
    continuousMarker = { marker: new google.maps.Marker({ position: campus.continuous, map: map, label: campus.continuous.name }), infoWindow: new google.maps.InfoWindow({ content: campus.continuous.html }) };
    leeMarker = {marker: new google.maps.Marker({ position: campus.lee, map: map, label: campus.lee.name}),infoWindow: new google.maps.InfoWindow({ content: campus.lee.html})};
    realizationMarker = {marker:new google.maps.Marker({ position: campus.realization, map: map, label: campus.realization.name}), infoWindow: new google.maps.InfoWindow({content: campus.realization.html})};
    oaksMarker = {marker: new google.maps.Marker({ position: campus.oaks, map: map, label: campus.oaks.name }), infoWindow: new google.maps.InfoWindow({content: campus.oaks.html})};
    riverportMarker = {marker:new google.maps.Marker({ position: campus.riverport, map: map, label: campus.riverport.name }), infoWindow: new google.maps.InfoWindow({content: campus.riverport.html})};
}

export function addChildToInfoWindow(data) {
    var campus = getCampus(data.campus)
    var marker = getMarker(data.campus)
    if (campus.html.rows.length === 0) {
        campus.html.id = `${campus.name}-table`
        campus.html.className = "table"
        let header = campus.html.createTHead()
        let row = header.insertRow();
        let cell0 = row.insertCell(0);
        let cell1 = row.insertCell(1);
        let cell2 = row.insertCell(2);
        let cell3 = row.insertCell(3);
        let cell4 = row.insertCell(4);
        cell0.innerHTML = `<b>Name</b>`;
        cell1.innerHTML = `<b>Email Address</b>`;
        cell2.innerHTML = `<b>Phone Number</b>`;
        cell3.innerHTML = `<b>Campus</b>`;
        cell4.innerHTML = `<b>Home Address</b<`;

        marker.infoWindow = new google.maps.InfoWindow({ content: campus.html })
    }

    var row = campus.html.insertRow();
    let cell0 = row.insertCell(0);
    let cell1 = row.insertCell(1);
    let cell2 = row.insertCell(2);
    let cell3 = row.insertCell(3);
    let cell4 = row.insertCell(4);
    cell0.innerHTML = `${data.name}`;
    cell1.innerHTML = `${data.email}`;
    cell2.innerHTML = `${data.number}`;
    cell3.innerHTML = `${data.campus}`;
    cell4.innerHTML = `${data.homeAddress}`;

    marker.marker.addListener('click', function () {
        marker.infoWindow.open(map, marker.marker);
    });

}

function getCampus(dbcampus){
    switch (dbcampus) {
        case "Innovations":
            return campus.innovation
        case "Lee's Summit":
            return campus.lee
        case "World Headquarters":
            campus.worldHeadquarters
        case "Continuous":
            return campus.continuous
        case "Realization":
            return campus.realization
        case "Oaks":
            return campus.oaks

        case "Riverport":
            return campus.riverport
    }
}

function getMarker(dbcampus){
    switch (dbcampus) {
        case "Innovations":
            return innovationMarker
        case "Lee's Summit":
            return leeMarker
        case "World Headquarters":
            return worldHeadquartersMarker
        case "Continuous":
            return continuousMarker
        case "Realization":
            return realizationMarker
        case "Oaks":
            return oaksMarker

        case "Riverport":
            return riverportMarker
    }
}
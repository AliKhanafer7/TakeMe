var map = require('./maps.js')
var firebase = require('./firebase.js')


function initMap(){
  map.initMap();
}

function initFirebase(){
  firebase.initFirebase();
}

function writeToDb(){
  firebase.writeToDb();
}

window.initMap = initMap;
window.writeToDb = writeToDb;
window.initFirebase = initFirebase;
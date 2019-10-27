var map = require('./maps.js')
var firebase = require('./firebase.js')

$(document).ready(function(){
  map.initMap();
  firebase.initFirebase();
})


function writeToDb(){
  firebase.writeToDb();
}

window.writeToDb = writeToDb;
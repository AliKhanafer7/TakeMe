import firebase from "firebase/app";
import "firebase/database"
var map = require('./maps')

const firebaseConfig = {
    apiKey: "AIzaSyA2Ulli3JYlBOG24VrGk8_gbCfvtc8OPo0",
    authDomain: "takeme-1563377456913.firebaseapp.com",
    databaseURL: "https://takeme-1563377456913.firebaseio.com",
    projectId: "takeme-1563377456913",
    storageBucket: "",
    messagingSenderId: "488958697041",
    appId: "1:488958697041:web:099c988b8f471769ade270",
    measurementId: "G-3PPD2DJ4JF"
}

var db;

export function initFirebase() {
    db = firebase.initializeApp(firebaseConfig);

    var ref = db.database().ref('users')

    //Watch for any new child added to the db
    ref.on("child_added", function (snapshot, prevChildkey) {
        var data = snapshot.val()
        map.addChildToInfoWindow(data)
    })
}

export function writeToDb() {
    try {
        if (validate()) {
            db.database().ref('users/').push({
                name: document.getElementById('form-name').value,
                email: document.getElementById('form-email').value,
                number: document.getElementById('form-number').value,
                campus: document.getElementById('form-campus').value,
                homeAddress: document.getElementById('form-address').value
            });

            var modalTitle = document.getElementById("modal-title")
            modalTitle.textContent = "Success!";
            modalTitle.style = "color: green";

            var modalBody = document.getElementById("modal-body")
            modalBody.textContent = "Successfully added you to the list of drivers under: " + document.getElementById('form-campus').value
        } else {
            var modalTitle = document.getElementById("modal-title")
            modalTitle.textContent = "Failed";
            modalTitle.style = "color: red";

            var modalBody = document.getElementById("modal-body")
            modalBody.textContent = "Something went wrong when trying to add you to the list of drivers. Please make sure you've entered properly formatted information based on the examples given"
        }
    } catch (err) {
        console.log(err)
    }
}

function validate() {
    var valid = true
    if (!validName()) {
        document.getElementById("form-name").style.borderColor = "red";
        valid = false;
    }

    if (!validEmail()) {
        document.getElementById("form-email").style.borderColor = "red";
        valid = false;
    }

    if (!validPhoneNumber()) {
        document.getElementById("form-number").style.borderColor = "red";
        valid = false;
    }

    return valid;
}

function validName() {
    return /^[A-Za-z\s]+$/.test(document.getElementById('form-name').value);
}

function validEmail() {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById('form-email').value)
}

function validPhoneNumber() {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(document.getElementById('form-number').value)
}
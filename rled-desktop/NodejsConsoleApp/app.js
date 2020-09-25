'use strict';
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";
// Add the Firebase services that you want to use
import "firebase/database";
import "firebase/messaging";

var firebaseConfig = {
    apiKey: "AIzaSyB_gDmqAukIVh_5mPlPsLjCQDqFtkX8yW8",
    authDomain: "rled-53fbc.firebaseapp.com",
    databaseURL: "https://rled-53fbc.firebaseio.com",
    projectId: "rled-53fbc",
    storageBucket: "rled-53fbc.appspot.com",
    messagingSenderId: "444857151839",
    appId: "1:444857151839:web:9c44ba6f2f43eeb52746ea"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var database = firebase.database();

function changeColor(color) {
    var colorOff = '#000000\n'
    var colorValue = '#000000\n'

    switch (color) {
        case 'red':
            colorValue = '#FF0000\n';
            ledState = 'red';
            break;
        case 'green':
            colorValue = '#00FF00\n';
            ledState = 'green';
            break;
        case 'blue':
            colorValue = '#0000FF\n';
            ledState = 'blue';
            break;
        default:
            colorValue = '#000000\n';
            ledState = 'off';
    }

    port.write(colorValue, function (err) {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log('Changed color to: ', colorValue);
    })
}

function flash(seconds) {
    // Switch state every 333ms ...
    var interval = setInterval(function () {
        if (ledState != 'off') {
            changeColor('off');
        } else {
            changeColor(COLOR);
        }
    }, 333);
    // ...for X seconds
    setTimeout(clearInterval, seconds * 1000, interval);
}

function testFunction() {
    changeColor();
}

var ledState = '';
const COLOR = 'red';
const SerialPort = require('serialport')
const port = new SerialPort('COM3', function (err) {
    if (err) {
        return console.log('Error: ', err.message);
    }
})

// Start at Green
changeColor('green');

// Flash for 5 seconds
flash(5);

// Turn it off
changeColor();
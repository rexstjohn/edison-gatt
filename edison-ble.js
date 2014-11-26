/**
* Welcome to my open source Intel Edison BLE attribute server. It comes with several helpful utilities
* which can help keep Edison's BLE services up and running.
*/
var bleno = require('bleno'),
commander = require('commander'),
promptly = require('promptly');

// Services
EdisonCustomService = require('./edison-custom-service'),
EdisonBLEManager = require('./ble-manager');

// 
var customService = new EdisonCustomService();

//
bleno.on('stateChange', function(state) {
    console.log('on -> stateChange: ' + state);
    
    // Be careful with this one.
    if(state === 'unsupported'){
        promptly.choose('Do you want to (a) unblock BLE or (b) configure this Edison for BLE development? ', ['a', 'b'], function (err, value){
            console.log('You Answered:', value);
            if(value === 'a'){
                EdisonBLEManager.restartBLE();
            } else if (value === 'b') {
                EdisonBLEManager.setupBLE();
            } 
        });
    }
    
    // Start advertising (duh).
    if (state === 'poweredOn') {
        bleno.startAdvertising('EdisonConfiguration', [customService.uuid]);
    } 
    
    // Allow users to start BLE if advertising is turned off.
    if(state === 'poweredOff') {
        promptly.choose('Turn on BLE? (y/n)', ['y', 'n'], function (err, value) {
            console.log('You Answered:', value);
            if(value === 'y'){
                EdisonBLEManager.restartBLE();
            } else {
                bleno.stopAdvertising();
            }
        });
    } 
});

// Catch Advertising Start
bleno.on('advertisingStart', function(error) {
    console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));

    if (!error) {
        bleno.setServices([customService]);
    }
});

// Catch Advertising Stop
bleno.on('advertisingStop', function(error) {
    console.log('on -> advertisingStop: ' + (error ? 'error ' + error : 'success'));
    
    promptly.choose('Restart Advertising? (y/n)', ['y', 'n'], function (err, value) {
        console.log('You Answered:', value);
        if(value === 'y'){
            bleno.startAdvertising('EdisonConfiguration', [customService.uuid]);
        } 
    });
});
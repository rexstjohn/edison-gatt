var bleno = require('bleno');
var commander = require('commander');
var promptly = require('promptly');

// Services
EdisonBatteryService = require('./edison-battery-level-service');
EdisonDeviceInformationService = require('./edison-device-information-service');
EdisonCustomService = require('./edison-custom-service');
EdisonBLEManager = require('./ble-manager');

// 
var batteryService = new EdisonBatteryService();
var deviceInfoService = new EdisonDeviceInformationService();
var customService = new EdisonCustomService();

//
bleno.on('stateChange', function(state) {
    console.log('on -> stateChange: ' + state);
    
    if(state === 'unsupported'){
        promptly.choose('Do you want to...? ', ['unblock BLE', 'install and setup this Edison for BLE development'], function (err, value){
            console.log('Answer:', value);
            if(value === 0){
                EdisonBLEManager.unblockBLE();
            } else {
                EdisonBLEManager.setupBLE();
            }
        });
    }
    
    if (state === 'poweredOn') {
        bleno.startAdvertising('EdisonConfiguration', [customService.uuid]);
    } 
    
    if(state === 'poweredOff') {
        promptly.choose('Turn on BLE?', ['y', 'n'], function (err, value) {
            if(value === 'y'){
                EdisonBLEManager.restartBLE();
            } 
            return;
        });
    } else {
       // bleno.stopAdvertising();
    }
});

//
bleno.on('advertisingStart', function(error) {
    console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));

    if (!error) {
        bleno.setServices([customService]);
    }
});
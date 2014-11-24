var bleno = require('bleno');

// Services
EdisonBatteryService = require('./edison-battery-level-service');
EdisonDeviceInformationService = require('./edison-device-information-service');
EdisonCustomService = require('./edison-custom-service');

// 
var batteryService = new EdisonBatteryService();
var deviceInfoService = new EdisonDeviceInformationService();
var customService = new EdisonCustomService();

//
bleno.on('stateChange', function(state) {
    console.log('on -> stateChange: ' + state);
    
    if(state === 'unsupported'){
        console.log('If you rebooted you may need to unblock Bluetooth: rfkill unblock bluetooth');
    }
    
    if (state === 'poweredOn') {
        bleno.startAdvertising('EdisonConfiguration', [customService.uuid]);
    } else {
        bleno.stopAdvertising();
    }
});

//
bleno.on('advertisingStart', function(error) {
    console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));

    if (!error) {
        bleno.setServices([customService]);
    }
});
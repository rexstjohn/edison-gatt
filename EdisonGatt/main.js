var bleno = require('bleno');

// Services
EdisonBatteryService = require('./edison-battery-level-service');
EdisonDeviceInformationService = require('./edison-device-information-service');


// 
var batteryService = new EdisonBatteryService();
var deviceInfoService = new EdisonDeviceInformationService();

//
bleno.on('stateChange', function(state) {
    console.log('on -> stateChange: ' + state);
    
    if(state === 'unsupported'){
        console.log('If you rebooted you may need to unblock Bluetooth: rfkill unblock bluetooth');
    }
    
    if (state === 'poweredOn') {
        bleno.startAdvertising('EdisonConfiguration', [batteryService.uuid, deviceInfoService.uuid]);
    } else {
        bleno.stopAdvertising();
    }
});

//
bleno.on('advertisingStart', function(error) {
    console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));

    if (!error) {
        bleno.setServices([batteryService, deviceInfoService]);
    }
});
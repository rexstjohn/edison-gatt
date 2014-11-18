/**
* Reference:
* https://developer.bluetooth.org/gatt/characteristics/Pages/CharacteristicViewer.aspx?u=org.bluetooth.characteristic.manufacturer_name_string.xml
*/
var util = require('util'),
  bleno = require('bleno'),
  BlenoPrimaryService = bleno.PrimaryService,
  EdisonDeviceInformationCharacteristic = require('./edison-device-information-characteristic');

// Everything we want to be able to read / write about Edison using our paired mobile app.
function EdisonDeviceInformationService() {
  EdisonDeviceInformationService.super_.call(this, {
      uuid: '2A29',
      characteristics: [
          new EdisonDeviceInformationCharacteristic()
      ]
  });
}

util.inherits(EdisonDeviceInformationService, BlenoPrimaryService);
module.exports = EdisonDeviceInformationService;

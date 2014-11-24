/**
* Reference:
* https://developer.bluetooth.org/gatt/characteristics/Pages/CharacteristicViewer.aspx?u=org.bluetooth.characteristic.manufacturer_name_string.xml
*/
var util = require('util'),
  bleno = require('bleno'),
  BlenoPrimaryService = bleno.PrimaryService,
  EdisonDeviceManufacturerCharacteristic = require('./edison-device-manufacturer-characteristic');

// Everything we want to be able to read / write about Edison using our paired mobile app.
function EdisonDeviceInformationService() {
  EdisonDeviceInformationService.super_.call(this, {
      uuid: '180A',
      characteristics: [
          new EdisonDeviceManufacturerCharacteristic()
      ]
  });
}

util.inherits(EdisonDeviceInformationService, BlenoPrimaryService);
module.exports = EdisonDeviceInformationService;
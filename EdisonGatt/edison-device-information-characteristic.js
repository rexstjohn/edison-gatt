/**
* Expose the device information of the Edison device
*
* Reference: https://developer.bluetooth.org/gatt/services/Pages/ServiceViewer.aspx?u=org.bluetooth.service.device_information.xml
*/

var util = require('util'),
  os = require('os'),
  exec = require('child_process').exec,
  bleno = require('bleno'),
  Descriptor = bleno.Descriptor,
  Characteristic = bleno.Characteristic;

/**
* Reference:
* https://developer.bluetooth.org/gatt/characteristics/Pages/CharacteristicViewer.aspx?u=org.bluetooth.characteristic.manufacturer_name_string.xml
*/
var EdisonDeviceInformationCharacteristic = function() {
  EdisonDeviceInformationCharacteristic.super_.call(this, {
      uuid: '2A29',
      properties: ['read', 'write'],
      descriptors: [
        new Descriptor({
            uuid: '2901',
            value: 'Intel Corporation'
        })
      ]
  });
};

util.inherits(EdisonDeviceInformationCharacteristic, Characteristic);

EdisonDeviceInformationCharacteristic.prototype.onReadRequest = function(offset, callback) {
    callback(this.RESULT_SUCCESS, "Edison_Name");
};

module.exports = EdisonDeviceInformationCharacteristic;

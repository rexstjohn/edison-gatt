/**
* Expose the device manfucaturer information of the Edison device
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
var EdisonDeviceManufacturerCharacteristic = function() {
  EdisonDeviceManufacturerCharacteristic.super_.call(this, {
      // Device Manufacturer
      uuid: '2A29',
      properties: ['read'],
      value: new Buffer('Intel Corporation','utf8'),
      descriptors: [
        new Descriptor({
        uuid: '2901',
        value: 'Device Manufacturer'
      })]
  });
};

util.inherits(EdisonDeviceManufacturerCharacteristic, Characteristic);

module.exports = EdisonDeviceManufacturerCharacteristic;

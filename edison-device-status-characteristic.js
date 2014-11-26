/**
* A general status rading on the Edison
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
var EdisonDeviceStatusCharacteristic = function() {
  EdisonDeviceStatusCharacteristic.super_.call(this, {
      // Device Manufacturer
      uuid: '142bed2a-22d6-42ec-b5e8-2518de05b307',
      properties: ['read'],
      descriptors: [
        new Descriptor({
        uuid: '2901',
        value: 'Device Manufacturer'
      }),
        new Descriptor({
            uuid: '2904',
            value: new Buffer([0x04, 0x01, 0x27, 0xAD, 0x01, 0x00, 0x00])
        })]
  });
};

util.inherits(EdisonDeviceStatusCharacteristic, Characteristic);

EdisonDeviceStatusCharacteristic.prototype.onReadRequest = function(offset, callback) {
 if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG, null);
  } else {
    callback(this.RESULT_SUCCESS, new Buffer('supercool'));
  }
};

module.exports = EdisonDeviceStatusCharacteristic;

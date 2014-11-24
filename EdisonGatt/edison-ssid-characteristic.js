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
var EdisonSSIDCharacteristic = function() {
  EdisonSSIDCharacteristic.super_.call(this, {
      uuid: '03f70ee0-0ef6-4c84-8d23-70af94b8a4f0',
      properties: ['read'],
      descriptors: [
        new Descriptor({
        uuid: '2901',
        value: 'SSID'
      }),
        new Descriptor({
            uuid: '2904',
            value: new Buffer([0x04, 0x01, 0x27, 0xAD, 0x01, 0x00, 0x00])
        })]
  });
};

util.inherits(EdisonSSIDCharacteristic, Characteristic);

EdisonSSIDCharacteristic.prototype.onReadRequest = function(offset, callback) {
 if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG, null);
  } else {
    callback(this.RESULT_SUCCESS, new Buffer('0'));
  }
};

module.exports = EdisonSSIDCharacteristic;

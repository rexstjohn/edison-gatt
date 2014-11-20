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
var EdisonPasswordCharacteristic = function() {
  EdisonSSIDCharacteristic.super_.call(this, {
      uuid: '2A29',
      properties: ['read'],
      descriptors: [
        new Descriptor({
        uuid: '2901',
        value: 'password'
      })]
  });
};

util.inherits(EdisonPasswordCharacteristic, Characteristic);

EdisonPasswordCharacteristic.prototype.onReadRequest = function(offset, callback) {
 if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG, null);
  } else {
    callback(this.RESULT_SUCCESS, new Buffer('0'));
  }
};

module.exports = EdisonPasswordCharacteristic;

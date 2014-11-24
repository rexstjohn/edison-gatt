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
var EdisonWiFiStatusCharacteristic = function() {
  EdisonWiFiStatusCharacteristic.super_.call(this, {
      uuid: 'c8e433e4-f3f0-46b1-b1da-231c77188312',
      properties: ['read'],
      descriptors: [
        new Descriptor({
        uuid: '2901',
        value: 'WiFi Status'
      }),
        new Descriptor({
            uuid: '2904',
            value: new Buffer([0x04, 0x01, 0x27, 0xAD, 0x01, 0x00, 0x00])
        })]
  });
};

util.inherits(EdisonWiFiStatusCharacteristic, Characteristic);

EdisonWiFiStatusCharacteristic.prototype.onReadRequest = function(offset, callback) {
 if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG, null);
  } else {
    callback(this.RESULT_SUCCESS, new Buffer('online'));
  }
};

module.exports = EdisonWiFiStatusCharacteristic;

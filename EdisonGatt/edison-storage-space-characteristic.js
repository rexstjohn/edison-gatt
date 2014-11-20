var util = require('util'),
  os = require('os'),
  exec = require('child_process').exec,
  bleno = require('bleno'),
  Descriptor = bleno.Descriptor,
  Characteristic = bleno.Characteristic;

/**
* Reference:
* https://developer.bluetooth.org/gatt/characteristics/Pages/CharacteristicViewer.aspx?u=org.bluetooth.characteristic.battery_level.xml
* Descriptor info: https://developer.bluetooth.org/gatt/descriptors/Pages/DescriptorsHomePage.aspx
*/
var EdisonStorageSpaceCharacteristic = function() {
  EdisonStorageSpaceCharacteristic.super_.call(this, {
      uuid: '2A19',
      properties: ['read'],
      descriptors: [
        new Descriptor({
            uuid: '2901',
            value: 'Available hard disk space'
        }),
        new Descriptor({
            uuid: '2904',
            value: new Buffer([0x04, 0x01, 0x27, 0xAD, 0x01, 0x00, 0x00 ]) // maybe 12 0xC unsigned 8 bit
        })
      ]
  });
};

util.inherits(EdisonStorageSpaceCharacteristic, Characteristic);

EdisonStorageSpaceCharacteristic.prototype.onReadRequest = function(offset, callback) {
      
    callback(this.RESULT_SUCCESS, new Buffer([98]));
};

module.exports = EdisonStorageSpaceCharacteristic;

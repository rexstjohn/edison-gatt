var util = require('util'),
  bleno = require('bleno'),
  disk = require('diskusage'),
  Descriptor = bleno.Descriptor,
  Characteristic = bleno.Characteristic;

/**
* Reference:
* https://developer.bluetooth.org/gatt/characteristics/Pages/CharacteristicViewer.aspx?u=org.bluetooth.characteristic.battery_level.xml
* Descriptor info: https://developer.bluetooth.org/gatt/descriptors/Pages/DescriptorsHomePage.aspx
*/
var EdisonStorageSpaceCharacteristic = function() {
  EdisonStorageSpaceCharacteristic.super_.call(this, {
      uuid: 'e602af1e-b2f2-46cb-beff-364d5d96eb76',
      properties: ['read'],
      descriptors: [
        new Descriptor({
            uuid: '2901',
            value: 'Available hard disk space'
        }),
        new Descriptor({
            uuid: '2904',
            value: new Buffer(30) 
        })
      ]
  });
};

util.inherits(EdisonStorageSpaceCharacteristic, Characteristic);

EdisonStorageSpaceCharacteristic.prototype.onReadRequest = function(offset, callback) {
    
     // Get the free disk space and stick it in a buffer.
     if (offset) {
        callback(this.RESULT_ATTR_NOT_LONG, null);
      } else {
        disk.check('/', function(err, info) {
            console.log(info.free);
            console.log(info.total);
            callback(this.RESULT_SUCCESS, new Buffer(info.free / 1000));
        });
      }
};

module.exports = EdisonStorageSpaceCharacteristic;

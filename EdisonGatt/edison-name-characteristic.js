/**
* Expose the name of the Edison device
*/

var util = require('util'),
  os = require('os'),
  exec = require('child_process').exec,
  bleno = require('bleno'),
  Descriptor = bleno.Descriptor,
  Characteristic = bleno.Characteristic;

var EdisonNameCharacteristic = function() {
  EdisonNameCharacteristic.super_.call(this, {
      uuid: '2A19',
      properties: ['read', 'write'],
      descriptors: [
        new Descriptor({
            uuid: '2902',
            value: 'The assigned name of this Edison device'
        }),
        new Descriptor({
            uuid: '2905',
            value: new Buffer("Edison_Name") // maybe 12 0xC unsigned 8 bit
        })
      ]
  });
};

util.inherits(EdisonNameCharacteristic, Characteristic);

EdisonNameCharacteristic.prototype.onReadRequest = function(offset, callback) {
    callback(this.RESULT_SUCCESS, new Buffer("Edison_Name"));
};

module.exports = EdisonNameCharacteristic;

/**
* GitHub URL
*/

var util = require('util'),
  os = require('os'),
  exec = require('child_process').exec,
  bleno = require('bleno'),
  Descriptor = bleno.Descriptor,
  Characteristic = bleno.Characteristic;

var EdisonGitHubURLCharacteristic = function() {
  EdisonGitHubURLCharacteristic.super_.call(this, {
      uuid: '01010101010101010166616465524742',
      properties: ['read'],
      descriptors: [
        new Descriptor({
        uuid: '2901',
        value: 'GitHub URL'
      })
      ]
  });
};

util.inherits(EdisonGitHubURLCharacteristic, Characteristic);

EdisonGitHubURLCharacteristic.prototype.onReadRequest = function(offset, callback) {
 if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG, null);
  } else {
    callback(this.RESULT_SUCCESS, new Buffer(0));
  }
};

module.exports = EdisonGitHubURLCharacteristic;

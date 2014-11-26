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
      value: new Buffer('https://github.com/rexstjohn/edison-ble','utf8'),
      descriptors: [
        new Descriptor({
        uuid: '2901',
        value: 'GitHub URL'
      })
      ]
  });
};

util.inherits(EdisonGitHubURLCharacteristic, Characteristic);

module.exports = EdisonGitHubURLCharacteristic;

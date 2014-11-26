/**
* The given name of this Edison
*/
var util = require('util'),
  exec = require('child_process').exec,
  bleno = require('bleno'),
  Descriptor = bleno.Descriptor,
  Characteristic = bleno.Characteristic;

/**
*
*/
var EdisonDeviceNameCharacteristic = function() {

  var edisonName = 'tacos';
    
  EdisonDeviceNameCharacteristic.super_.call(this, {
      uuid: 'f6fd0aa0-c73f-4441-9c98-a362bd0aa973',
      properties: ['read'],
      value: edisonName,
      descriptors: [
        new Descriptor({
        uuid: '2901',
        value: 'Edison Name'
      })]
  });
};

util.inherits(EdisonDeviceNameCharacteristic, Characteristic);
module.exports = EdisonDeviceNameCharacteristic;

/**
* Available disk space in this Edison.
*/
var util = require('util'),
  bleno = require('bleno'),
  exec = require('child_process').exec,
  Descriptor = bleno.Descriptor,
  Characteristic = bleno.Characteristic;

var EdisonStorageSpaceCharacteristic = function() {
  EdisonStorageSpaceCharacteristic.super_.call(this, {
      uuid: 'e602af1e-b2f2-46cb-beff-364d5d96eb76',
      properties: ['read'],
      value: new Buffer('500.0M','utf8'),
      descriptors: [
        new Descriptor({
            uuid: '2901',
            value: 'Available hard disk space'
        })
      ]
  });
};

util.inherits(EdisonStorageSpaceCharacteristic, Characteristic);

EdisonStorageSpaceCharacteristic.prototype.onReadRequest = function(offset, callback) {
    // Fetch free space in M
    exec('df -h | grep /dev/root | awk \'{ print $4; }\'', function (error, stdout, stderr) {
      var data = stdout.toString().replace(/(\r\n|\n|\r)/gm,"");
      console.log("available storage: " + data);
      callback(this.RESULT_SUCCESS, new Buffer(data));
    });
};

module.exports = EdisonStorageSpaceCharacteristic;

/**
* Edion's current SSID name
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
      value: new Buffer('none','utf8'),
      descriptors: [
        new Descriptor({
        uuid: '2901',
        value: 'SSID'
      })]
  });
};

util.inherits(EdisonSSIDCharacteristic, Characteristic);

EdisonSSIDCharacteristic.prototype.onReadRequest = function(offset, callback) {
    // Fetch free space in M
    exec('wpa_cli status | grep -w ssid | tr -d \'ssid=\'', function (error, stdout, stderr) {
      var data = stdout.toString().replace(/(\r\n|\n|\r)/gm,"");
      console.log("SSID Name: " + data);
      callback(this.RESULT_SUCCESS, new Buffer(data));
    });
};


module.exports = EdisonSSIDCharacteristic;

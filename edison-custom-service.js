var util = require('util'),
  bleno = require('bleno'),
  uuid = require('node-uuid'),
  BlenoPrimaryService = bleno.PrimaryService,
  GitHubURLCharacteristics = require('./edison-github-url-characteristic'),
  SSIDCharacteristics = require('./edison-ssid-characteristic'),
  PasswordCharacteristics = require('./edison-password-characteristic'),
  StorageSpaceCharacteristics = require('./edison-storage-space-characteristic'),
  WifiPasswordCharacteristics = require('./edison-wifi-password-characteristic'),
  WifiStatusCharacteristics = require('./edison-wifi-status-characteristic'),
  DeviceStatusCharacteristics = require('./edison-device-status-characteristic'),
  EdisonDeviceNameCharacteristic = require('./edison-name-characteristic');

// Everything we want to be able to read / write about Edison using our paired mobile app.
function EdisonCustomService() {
  EdisonCustomService.super_.call(this, {
      uuid: uuid.v4(),
      characteristics: [
          new EdisonDeviceNameCharacteristic(),
          new GitHubURLCharacteristics(),
          new SSIDCharacteristics(),
          new PasswordCharacteristics(),
          new StorageSpaceCharacteristics(),
          new WifiPasswordCharacteristics(),
          new WifiStatusCharacteristics(),
          new DeviceStatusCharacteristics()
      ]
  });
}

util.inherits(EdisonCustomService, BlenoPrimaryService);
module.exports = EdisonCustomService;

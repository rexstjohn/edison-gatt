var util = require('util'),
  bleno = require('bleno'),
  BlenoPrimaryService = bleno.PrimaryService,
  BatteryLevelCharacteristic = require('./battery-level-characteristic'),
  EdisonNameCharacteristic = require('./edison-name-characteristic');

// Everything we want to be able to read / write about Edison using our paired mobile app.
function EdisonConfigurationService() {
  EdisonConfigurationService.super_.call(this, {
      uuid: '180F',
      characteristics: [
          new BatteryLevelCharacteristic(),
          new EdisonNameCharacteristic()
      ]
  });
}

util.inherits(EdisonConfigurationService, BlenoPrimaryService);
module.exports = EdisonConfigurationService;

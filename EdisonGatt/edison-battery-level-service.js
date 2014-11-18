var util = require('util'),
  bleno = require('bleno'),
  BlenoPrimaryService = bleno.PrimaryService,
  BatteryLevelCharacteristic = require('./battery-level-characteristic');

// Everything we want to be able to read / write about Edison using our paired mobile app.
function EdisonBatteryLevelService() {
  EdisonBatteryLevelService.super_.call(this, {
      uuid: '180F',
      characteristics: [
          new BatteryLevelCharacteristic()
      ]
  });
}

util.inherits(EdisonBatteryLevelService, BlenoPrimaryService);
module.exports = EdisonBatteryLevelService;

var util = require('util'),
  os = require('os'),
  sys = require('sys'),
  exec = require('child_process').exec,
  spawn = require('child_process').spawn;

/**
* Makes BLE functional in the first place
*/
exports.setupBLE = function() {
    console.log('Setting Up BLE');
    var cspr = spawn('sh', ["setupble.sh"], { stdio: 'inherit' });
    cspr.stdout.setEncoding('utf8');
    cspr.stdout.on('data', function(data) {
      var str = data.toString(), lines = str.split(/(\r?\n)/g);
      for (var i=0; i<lines.length; i++) {
          console.log(str[i]);
      }
    });
};

/**
* Simply unblock bluetooth
*/
exports.unblockBLE = function() {
    console.log('Unblocking BLE');
    function puts(error, stdout, stderr) { sys.puts(stdout) }
    exec("rfkill unblock bluetooth", puts);
};

/**
* Run this to keep the BLE session running.
*/
exports.restartBLE = function() { 
    console.log('Restarting BLE');
    var cspr = spawn('sh', ["restartble.sh"], { stdio: 'inherit' });
    cspr.stdout.setEncoding('utf8');
    cspr.stdout.on('data', function(data) {
      var str = data.toString(), lines = str.split(/(\r?\n)/g);
      for (var i=0; i<lines.length; i++) {
          console.log(str[i]);
      }
    });
};

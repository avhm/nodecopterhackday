var arDrone = require('ar-drone');
var client = arDrone.createClient();

client.takeoff();

client
  .after(1000, function() {
    // this.clockwise(1);
  })
  .after(3000, function() {
    
    // this.animate('flipLeft', 15);
  })
  .after(10000, function() {
    this.stop();
    this.land();
  });
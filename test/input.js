var input = require('../input');

input.on('enter', function() {
  console.log('enter!');
});

input.on('quit', function() {
  console.log('quit!');
  process.exit();
});
